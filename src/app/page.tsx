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
  buttonHistory: string;
  inputHistory: string;
};

type EraElementType = "button" | "input";

const eras: Era[] = [
  {
    year: "2000s",
    title: "スキューモーフィズム",
    description: "現実の質感を取り入れたUIデザインが一般的になった時代。",
    theme: {
      bg: "from-sky-300 to-indigo-400",
      accent: "border-sky-100",
    },
    uiStyle: "glossy",
    buttonHistory:
      "2000年代のボタンは立体的な質感が特徴でした。光沢や影を付け、物理的なボタンに近い外観を再現していました。代表例はWindows XPやmacOS Aquaのボタンです。",
    inputHistory:
      "2000年代の入力欄は、凹んで見える枠やグラデーションを使い、物理的なテキストボックスを模したデザインが一般的でした。ユーザーに直感的に“ここに入力できる”と理解させる工夫がされていました。",
  },
  {
    year: "2010s",
    title: "フラットデザイン",
    description: "装飾を省き、シンプルさと可読性を重視したデザインが普及した時代。",
    theme: {
      bg: "from-green-300 to-emerald-500",
      accent: "border-green-100",
    },
    uiStyle: "flat",
    buttonHistory:
      "2010年代のボタンは影や光沢を取り除き、単色背景とテキストだけで表現されました。iOS 7やGoogle Material Designにより、ボタンのデザインはよりシンプルになりました。",
    inputHistory:
      "2010年代の入力欄は境界線や下線だけで示されることが多くなりました。背景は白または薄い色で、余計な装飾を省き、入力可能領域を最小限の情報で表現しました。",
  },
  {
    year: "2020s",
    title: "シンプルとダークモード",
    description: "配色と余白を工夫し、ライトモードとダークモードを切り替えられるUIが普及した時代。",
    theme: {
      bg: "from-indigo-400 to-purple-600",
      accent: "border-pink-300",
    },
    uiStyle: "modern",
    buttonHistory:
      "2020年代のボタンは角丸やフラットな色使いが特徴です。シャドウや装飾は最小限で、配色とサイズでボタンの重要度を示す手法が主流です。多くのアプリでライト／ダーク両方に対応する配色が採用されました。",
    inputHistory:
      "2020年代の入力欄は枠線を薄くしたり、背景と同化させるなど、目立たないデザインが多くなりました。余白やフォントサイズの調整により、入力体験の快適さと読みやすさを重視しています。",
  },
];

function EraButton({ style, onClick }: { style: Era["uiStyle"]; onClick?: () => void }) {
  switch (style) {
    case "glossy":
      return (
        <button
          onClick={onClick}
          className="css-button-shadow-border-sliding--sky cursor-pointer tiny5 px-4 py-2"
        >
          Search
        </button>
      );
    case "flat":
      return (
        <button
          onClick={onClick}
          className="rounded-md px-4 py-2 text-green-600 text-sm bg-white"
        >
          Submit
        </button>
      );
    case "modern":
      return (
        <button
          onClick={onClick}
          className="px-4 py-2 bg-purple-400 text-white font-semibold rounded-full"
        >
          Button
        </button>
      );
  }
}

function EraInput({ style, onClick }: { style: Era["uiStyle"]; onClick?: () => void }) {
  switch (style) {
    case "glossy":
      return (
        <button
          onClick={onClick}
          className="bg-gradient-to-b from-white to-gray-200 px-4 py-2 border border-gray-300 text-gray-400 w-48 rounded-sm text-sm flex w-full whitespace-nowrap tiny5"
        >
          Search Videos...
        </button>
      );
    case "flat":
      return (
        <button
          onClick={onClick}
          className="px-4 py-2 w-48 text-sm text-gray-900 border-b-2 border-gray-400 bg-white rounded-none shadow-sm flex items-center whitespace-nowrap overflow-hidden text-ellipsis"
        >
          Type here...
        </button>
      );
    case "modern":
      return (
        <button
          onClick={onClick}
          className="px-4 py-2 rounded-md border border-white text-sm whitespace-nowrap w-32 flex"
        >
          Enter text...
        </button>
      );
  }
}

// モーダルコンポーネント
function EraModal({ era, elementType, onClose }: { era: Era; elementType: EraElementType; onClose: () => void }) {
  const historyText = elementType === "button" ? era.buttonHistory : era.inputHistory;
  return (
    <AnimatePresence>
      {era && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-gray-900"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-2">{era.year}</h2>
            <h3 className="text-lg font-semibold mb-4">{era.title}</h3>
            <p className="mb-6 leading-relaxed">{historyText}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-500 duration-200 text-white rounded-lg hover:bg-indigo-600"
            >
              閉じる
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Page() {
  const [index, setIndex] = useState(0);
  const currentEra = eras[index];

  const [backgroundItems, setBackgroundItems] = useState<
    { isButton: boolean; offsetY: number; scale: number; opacity: number }[]
  >([]);

  const [selectedEra, setSelectedEra] = useState<{ era: Era; elementType: EraElementType } | null>(null);

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
              <EraButton
                style={currentEra.uiStyle}
                onClick={() => setSelectedEra({ era: currentEra, elementType: "button" })}
              />
            ) : (
              <EraInput
                style={currentEra.uiStyle}
                onClick={() => setSelectedEra({ era: currentEra, elementType: "input" })}
              />
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

      {/* モーダル */}
      {selectedEra && (
        <EraModal
          era={selectedEra.era}
          elementType={selectedEra.elementType}
          onClose={() => setSelectedEra(null)}
        />
      )}
    </main>
  );
}
