// app/page.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Era = {
  year: string;
  title: string;
  description: string;
  image: string;
  theme: {
    bg: string;
    accent: string;
  };
};

const eras: Era[] = [
  {
    year: "1980s",
    title: "初期GUI",
    description: "MacintoshやWindows 1.0が登場し、アイコンとウィンドウの時代が始まった。",
    image: "/images/1980s.png",
    theme: {
      bg: "from-yellow-800 to-gray-900",
      accent: "border-yellow-400",
    },
  },
  {
    year: "2000s",
    title: "Web 2.0",
    description: "スキューモーフィズムやリッチUIが流行し、インターネットが華やかなデザインで彩られた。",
    image: "/images/2000s.png",
    theme: {
      bg: "from-pink-500 to-purple-900",
      accent: "border-pink-400",
    },
  },
  {
    year: "2020s",
    title: "フラット & ダークモード",
    description: "シンプルでミニマルなデザイン。アクセシビリティ重視のダークモードも一般化した。",
    image: "/images/2020s.png",
    theme: {
      bg: "from-gray-900 to-black",
      accent: "border-blue-500",
    },
  },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const currentEra = eras[index];

  return (
    <main
      className={`relative h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center transition-colors duration-700 bg-gradient-to-br ${currentEra.theme.bg}`}
    >

      {/* メイン表示（年代ごとに変わる） */}
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
          <p className="text-gray-200 text-sm mt-4">{currentEra.description}</p>
        </motion.div>
      </AnimatePresence>

      {/* 年代ポータル */}
      <div className="absolute bottom-12 flex gap-8">
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
