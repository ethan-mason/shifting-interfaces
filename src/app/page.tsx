"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Era = {
  year: string;
  title: string;
  description: string;
  theme: {
    bg: string;
    accent: string;
  };
  uiStyle: "glossy" | "flat" | "modern";
};

const eras: Era[] = [
  {
    year: "2000s",
    title: "スキューモーフィズム",
    description:
      "ボタンやアイコンに光沢や影をつけ、現実の質感を画面上に再現するデザインが広がった。Windows XPやmacOS Aquaの見た目が代表的で、インターネットやアプリにリアルさが求められた時代。",
    theme: {
      bg: "from-sky-300 to-indigo-400",
      accent: "border-sky-100",
    },
    uiStyle: "glossy",
  },
  {
    year: "2010s",
    title: "フラットデザイン",
    description:
      "影や装飾を取り除き、シンプルでフラットなデザインが主流になった。iOS 7やGoogleのMaterial Designが代表例で、文字や色の情報量を整理し、見やすさや軽快さが重視された。",
    theme: {
      bg: "from-green-300 to-emerald-500",
      accent: "border-green-100",
    },
    uiStyle: "flat",
  },
  {
    year: "2020s",
    title: "シンプルとダークモード",
    description:
      "フラットデザインをベースに、余白や配色を工夫した落ち着いた画面が増えた。さらに多くのOSやアプリにダークモードが導入され、昼夜や環境に合わせて画面を切り替えることが一般的になった。",
    theme: {
      bg: "from-indigo-400 to-purple-600",
      accent: "border-pink-300",
    },
    uiStyle: "modern",
  },
];

function EraButton({ style }: { style: Era["uiStyle"] }) {
  switch (style) {
    case "glossy":
      return (
        <button
          className="css-button-shadow-border-sliding--sky cursor-pointer tiny5 px-4 py-2">
          Search
        </button>
      );
    case "flat":
      return (
        <button className="border border-gray-300 rounded-md px-4 py-2 text-green-600 text-sm bg-gradient-to-b from-white to-gray-200">
          Submit
        </button>
      );
    case "modern":
      return (
        <button className="px-4 py-2 bg-purple-400 text-white font-semibold rounded-full">
          Button
        </button>
      );
  }
}

// 年代別擬似入力欄（背景用）
function EraInput({ style }: { style: Era["uiStyle"] }) {
  switch (style) {
    case "glossy": // 2000s: デフォルト
      return (
        <button className="bg-gradient-to-b from-white to-gray-200 px-4 py-2 border border-gray-300 text-gray-400 w-48 rounded-sm text-sm flex w-full whitespace-nowrap tiny5 ">
          Search Videos...
        </button>
      );
    case "flat": // 2010s: ケバめ（背景白→グレーのグラデ）
      return (
        <button className="px-4 py-2 w-48 text-sm text-gray-900 border-b-2 border-gray-400 bg-white rounded-none shadow-sm flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
          Type here...
        </button>
      );
    case "modern": // 2020s: シンプル
      return (
        <button className="px-4 py-2 rounded-md border border-white text-sm whitespace-nowrap w-32 flex">
          Enter text...
        </button>
      );
  }
}


export default function Page() {
  const [index, setIndex] = useState(0);
  const currentEra = eras[index];

  const [backgroundItems, setBackgroundItems] = useState<
    { isButton: boolean; offsetY: number; scale: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const screenHeight = window.innerHeight;
    const items = [...Array(70)].map(() => ({
      isButton: Math.random() > 0.5,
      offsetY: Math.random() * screenHeight,
      scale: 0.9 + Math.random() * 0.5,
      opacity: 0.45,
    }));
    setBackgroundItems(items);
  }, [index]);

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center transition-colors duration-600 bg-gradient-to-br ${currentEra.theme.bg}`}
    >
      {/* 背景UI */}
      <motion.div
        key={currentEra.year + "-bg-layer1"}
        initial={{ x: "100%" }}
        animate={{ x: "-200%" }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        className="absolute inset-0 flex gap-32"
      >
        {backgroundItems.map((item, i) => (
          <div
            key={i}
            style={{
              transform: `translateY(${item.offsetY}px) scale(${item.scale})`,
              opacity: item.opacity,
            }}
          >
            {item.isButton ? (
              <EraButton style={currentEra.uiStyle} />
            ) : (
              <EraInput style={currentEra.uiStyle} />
            )}
          </div>
        ))}
      </motion.div>

      {/* 中央コンテンツ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEra.year}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="z-10 flex flex-col items-center text-center max-w-xl px-6"
        >
          <h2 className="text-3xl font-semibold">{currentEra.year}</h2>
          <p className="text-2xl mt-1 zen-maru-gothic">{currentEra.title}</p>
          <p className="text-gray-100 mt-4 zen-maru-gothic">
            {currentEra.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 下部の年代ボタン */}
      <div className="absolute bottom-12 flex gap-8 z-20">
        {eras.map((era, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.08 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-colors duration-600 ${
              index === i ? era.theme.accent : "border-gray-400"
            } bg-gray-800/50 backdrop-blur`}
          >
            <span className="text-sm font-semibold">{era.year}</span>
          </motion.button>
        ))}
      </div>
    </main>
  );
}
