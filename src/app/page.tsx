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
  uiStyle: "retro" | "glossy" | "flat";
};

const eras: Era[] = [
  {
    year: "1980s",
    title: "GUIの登場",
    description:
      "それまで文字だけで操作していたパソコンに、アイコンやウィンドウを使った画面表示が導入された。マウスで選んでクリックする操作が加わり、より多くの人が使いやすい環境が広がり始めた。",
    theme: {
      bg: "from-emerald-400 to-teal-500",
      accent: "border-emerald-200",
    },
    uiStyle: "retro",
  },
  {
    year: "2000s",
    title: "スキューモーフィズム",
    description:
      "ボタンやアイコンに光や影をつけて立体的に見せるデザインが広く使われた。画面上の部品を現実の道具に近づけることで、誰でも直感的に操作できるように工夫されていた。Windows XPやmacOSのデザインが代表的。",
    theme: {
      bg: "from-sky-300 to-indigo-400",
      accent: "border-sky-100",
    },
    uiStyle: "glossy",
  },
  {
    year: "2020s",
    title: "フラットデザインとダークモード",
    description:
      "色や装飾をできるだけ少なくし、シンプルで読みやすい画面デザインが主流になった。また、多くのアプリやOSにダークモードが追加され、昼と夜など利用する環境に合わせて表示を切り替えられるようになった。",
    theme: {
      bg: "from-indigo-400 to-purple-600",
      accent: "border-pink-300",
    },
    uiStyle: "flat",
  },
];

function EraButton({ style, era }: { style: Era["uiStyle"]; era?: Era }) {
  switch (style) {
    case "retro":
      return (
        <button className="px-4 py-2 border-2 border-gray-100 bg-emerald-600 text-xs font-mono shadow-inner text-white">
          OK
        </button>
      );
    case "glossy":
      return (
        <button className="px-6 py-2 rounded-full bg-gradient-to-b from-white to-gray-200 text-gray-800 shadow-lg border">
          Click Me
        </button>
      );
    case "flat": {
      const is2020s = era?.year === "2020s";
      return (
        <button
          className={
            is2020s
              ? "px-4 py-2 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white shadow-md border border-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-pink-300/40"
              : "px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white"
          }
        >
          Submit
        </button>
      );
    }
  }
}

function EraInput({ style, era }: { style: Era["uiStyle"]; era?: Era }) {
  switch (style) {
    case "retro":
      return (
        <input
          className="px-2 py-1 border-2 border-gray-100 bg-emerald-700 text-xs font-mono text-white placeholder-gray-200"
          placeholder="C:\\>_"
        />
      );
    case "glossy":
      return (
        <input
          className="px-3 py-2 rounded-full shadow-inner bg-white border text-gray-700"
          placeholder="Search..."
        />
      );
    case "flat": {
      const is2020s = era?.year === "2020s";
      return (
        <input
          className={
            is2020s
              ? "px-3 py-2 rounded-lg bg-purple-100 border border-purple-300 text-gray-800 placeholder-gray-500"
              : "px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800"
          }
          placeholder="Type here..."
        />
      );
    }
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
    const items = [...Array(100)].map(() => ({
      isButton: Math.random() > 0.5,
      offsetY: Math.random() * screenHeight,
      scale: 0.8 + Math.random() * 0.4,
      opacity: 0.3,
    }));
    setBackgroundItems(items);
  }, [index]);

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center transition-colors duration-600 bg-gradient-to-br ${currentEra.theme.bg}`}
    >
      {/* 背景UI（ランダム生成 → useEffectで制御） */}
      <motion.div
        key={currentEra.year + "-bg-layer1"}
        initial={{ x: "100%" }}
        animate={{ x: "-200%" }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute inset-0 flex gap-40"
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
              <EraButton style={currentEra.uiStyle} era={currentEra} />
            ) : (
              <EraInput style={currentEra.uiStyle} era={currentEra} />
            )}
          </div>
        ))}
      </motion.div>

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
          <p className="text-gray-100 mt-4 zen-maru-gothic">{currentEra.description}</p>
        </motion.div>
      </AnimatePresence>

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
