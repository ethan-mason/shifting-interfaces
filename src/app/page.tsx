"use client";
import { useState } from "react";
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
    title: "初期GUI",
    description:
      "MacintoshやWindows 1.0が登場し、アイコンとウィンドウの時代が始まった。",
    theme: {
      bg: "from-emerald-800 via-teal-900 to-gray-900",
      accent: "border-emerald-400",
    },
    uiStyle: "retro",
  },
  {
    year: "2000s",
    title: "Web 2.0",
    description:
      "スキューモーフィズムやリッチUIが流行し、インターネットが華やかなデザインで彩られた。",
    theme: {
      bg: "from-cyan-500 via-indigo-600 to-purple-800",
      accent: "border-cyan-300",
    },
    uiStyle: "glossy",
  },
  {
    year: "2020s",
    title: "フラット & ダークモード",
    description:
      "シンプルでミニマルなデザイン。アクセシビリティ重視のダークモードも一般化した。",
    theme: {
      bg: "from-gray-800 via-gray-900 to-black",
      accent: "border-blue-500",
    },
    uiStyle: "flat",
  },
];

// 各年代ごとのUI部品
function EraUI({ style }: { style: Era["uiStyle"] }) {
  switch (style) {
    case "retro":
      return (
        <div className="flex gap-6">
          <button className="px-4 py-2 border-2 border-gray-200 bg-gray-700 text-xs font-mono shadow-inner">
            OK
          </button>
          <input
            className="px-2 py-1 border-2 border-gray-200 bg-gray-800 text-xs font-mono"
            placeholder="C:\\>_"
          />
        </div>
      );
    case "glossy":
      return (
        <div className="flex gap-6">
          <button className="px-6 py-2 rounded-full bg-gradient-to-b from-white to-gray-300 text-gray-800 shadow-lg border">
            Click Me
          </button>
          <input
            className="px-3 py-2 rounded-full shadow-inner bg-white border text-gray-700"
            placeholder="Search..."
          />
        </div>
      );
    case "flat":
      return (
        <div className="flex gap-6">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
            Submit
          </button>
          <input
            className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-200"
            placeholder="Type here..."
          />
        </div>
      );
  }
}

export default function Page() {
  const [index, setIndex] = useState(0);
  const currentEra = eras[index];

  return (
    <main
      className={`relative h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center transition-colors duration-700 bg-gradient-to-br ${currentEra.theme.bg}`}
    >
      {/* 背景UI（無限スクロール風） */}
      <motion.div
        key={currentEra.year + "-bg"}
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 flex gap-20 opacity-20"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-10 px-20">
            <EraUI style={currentEra.uiStyle} />
            <EraUI style={currentEra.uiStyle} />
            <EraUI style={currentEra.uiStyle} />
          </div>
        ))}
      </motion.div>

      {/* メイン表示 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEra.year}
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex flex-col items-center text-center max-w-xl px-6"
        >
          <h2 className="text-3xl font-semibold">{currentEra.year}</h2>
          <p className="text-xl font-medium mt-1">{currentEra.title}</p>
          <p className="text-gray-200 text-sm mt-4">
            {currentEra.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 年代ポータル */}
      <div className="absolute bottom-12 flex gap-8 z-20">
        {eras.map((era, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.2 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-colors duration-500 ${
              index === i ? era.theme.accent : "border-gray-500"
            } bg-gray-800/70 backdrop-blur`}
          >
            <span className="text-sm font-bold">{era.year}</span>
          </motion.button>
        ))}
      </div>
    </main>
  );
}
