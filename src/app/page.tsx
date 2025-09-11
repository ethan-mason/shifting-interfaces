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
      bg: "from-emerald-400 to-teal-500",
      accent: "border-emerald-200",
    },
    uiStyle: "retro",
  },
  {
    year: "2000s",
    title: "Web 2.0",
    description:
      "スキューモーフィズムやリッチUIが流行し、インターネットが華やかなデザインで彩られた。",
    theme: {
      bg: "from-sky-300 to-indigo-400",
      accent: "border-sky-100",
    },
    uiStyle: "glossy",
  },
  {
    year: "2020s",
    title: "フラット & ダークモード",
    description:
      "シンプルでミニマルなデザイン。アクセシビリティ重視のダークモードも一般化した。",
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

  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <main
      className={`relative h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center transition-colors duration-700 bg-gradient-to-br ${currentEra.theme.bg}`}
    >
      {/* 背景UI（横方向に無限スクロール、中央3/4範囲でランダム配置） */}
      <motion.div
        key={currentEra.year + "-bg-layer1"}
        initial={{ x: "100%" }}
        animate={{ x: "-200%" }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute inset-0 flex gap-40 opacity-10"
      >
  {[...Array(50)].map((_, i) => {
    const isButton = Math.random() > 0.5;
    const offsetY = Math.random() * screenHeight;
    const scale = 0.5 + Math.random(); // 0.5x ~ 1.5x
    const opacity = 0.3 + Math.random() * 0.7;
    return (
      <div
        key={i}
        style={{
          transform: `translateY(${offsetY}px) scale(${scale})`,
          opacity,
        }}
      >
        {isButton ? (
          <EraButton style={currentEra.uiStyle} era={currentEra} />
        ) : (
          <EraInput style={currentEra.uiStyle} era={currentEra} />
        )}
      </div>
    );
  })}
</motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentEra.year}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="z-10 flex flex-col items-center text-center max-w-xl px-6"
        >
          <h2 className="text-3xl font-semibold">{currentEra.year}</h2>
          <p className="text-xl font-medium mt-1">{currentEra.title}</p>
          <p className="text-gray-100 text-sm mt-4">{currentEra.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 flex gap-8 z-20">
        {eras.map((era, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.08 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-colors duration-500 ${
              index === i ? era.theme.accent : "border-gray-400"
            } bg-gray-800/50 backdrop-blur`}
          >
            <span className="text-sm font-bold">{era.year}</span>
          </motion.button>
        ))}
      </div>
    </main>
  );
}
