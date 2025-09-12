"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  cardFacts: { fact: string; description: string }[];
};

type EraElementType = "button" | "input" | "card";

type BackgroundItem = {
  type: EraElementType;
  offsetY: number;
  scale: number;
  opacity: number;
  fact?: { fact: string; description: string };
};

const eras: Era[] = [
  {
    year: "2000s",
    title: "スキューモーフィズム",
    description:
      "この時代は“本物そっくり”を目指したUIが主流でした。ガラスのような光沢、金属の反射、紙の質感など、現実世界の質感をデジタルに再現することで、初めてパソコンやスマホを触る人でも直感的に操作できるように工夫されていました。代表例として、Windows XPや初期のiPhone、macOS Aquaのデザインがあります。",
    theme: {
      bg: "from-sky-300 to-indigo-400",
      accent: "border-sky-100",
    },
    uiStyle: "glossy",
    buttonHistory:
      "2000年代のボタンは立体的な質感が特徴でした。光沢や影を付け、物理的なボタンに近い外観を再現していました。代表例はWindows XPやmacOS Aquaのボタンです。",
    inputHistory:
      "2000年代の入力欄は、凹んで見える枠やグラデーションを使い、物理的なテキストボックスを模したデザインが一般的でした。ユーザーに直感的に“ここに入力できる”と理解させる工夫がされていました。",
    cardFacts: [
      {
        fact: "Windows XPのUIは“キャンディのようだ”と評されました。",
        description:
          "Windows XPのUIは鮮やかな色と光沢感が特徴で、甘いキャンディのようだと形容されました。これは初心者にも親しみやすい印象を与える狙いがありました。",
      },
      {
        fact: "初代iPhoneはガラスと金属の質感を大切にしたUIでした。",
        description:
          "初代iPhoneのデザインは、画面上のアイコンやボタンが実際の素材感を持つように描かれており、物理的な道具を操作する感覚をデジタルに持ち込んでいました。",
      },
      {
        fact: "AppleのAquaデザインは“水のようなUI”と呼ばれました。",
        description:
          "macOSのAquaデザインは、透明感や光の反射を強調したインターフェースで、水のように澄んだ表現が特徴でした。",
      },
    ],
  },
  {
    year: "2010s",
    title: "フラットデザイン",
    description:
      "スマホが普及した2010年代は、画面をシンプルにして情報を見やすくすることが重視されました。立体的な装飾や影は取り除かれ、色とアイコン、文字の配置で意味を伝えるスタイルが流行しました。AppleのiOS 7やGoogleのMaterial Designが象徴的で、無駄を削ぎ落としたミニマルなUIが広がりました。",
    theme: {
      bg: "from-green-300 to-emerald-500",
      accent: "border-green-100",
    },
    uiStyle: "flat",
    buttonHistory:
      "2010年代のボタンは影や光沢を取り除き、単色背景とテキストだけで表現されました。iOS 7やGoogle Material Designにより、ボタンのデザインはよりシンプルになりました。",
    inputHistory:
      "2010年代の入力欄は境界線や下線だけで示されることが多くなりました。背景は白または薄い色で、余計な装飾を省き、入力可能領域を最小限の情報で表現しました。",
    cardFacts: [
      {
        fact: "iOS 7で突然フラット化され、“デザインが消えた”と驚く声が続出しました。",
        description:
          "2013年のiOS 7では、立体感のあるUIが一気になくなり、平面的なデザインに統一されました。この急激な変化に多くのユーザーが驚きました。",
      },
      {
        fact: "GoogleのMaterial Designは“紙とインク”をデジタルに表現しました。",
        description:
          "Material Designは“紙とインク”の比喩を使い、レイヤーや影のルールを明確にしたデザイン体系です。これにより統一感と操作のわかりやすさが実現しました。",
      },
      {
        fact: "フラットデザインの流行は“情報の見やすさ”が背景にありました。",
        description:
          "スマホ画面の小ささを考慮し、情報を効率的に伝えるために、装飾を排除したシンプルなデザインが支持されました。",
      },
    ],
  },
  {
    year: "2020s",
    title: "シンプルとダークモード",
    description:
      "2020年代になると、ただシンプルなだけでなく“見やすさ”や“快適さ”がより重視されるようになりました。ダークモードやライトモードの切り替えが当たり前になり、夜間でも目に優しい配色が意識されています。さらに余白や文字サイズを工夫し、装飾は最小限に抑えつつ、誰でもストレスなく使えるUIが求められるようになりました。",
    theme: {
      bg: "from-indigo-400 to-purple-600",
      accent: "border-pink-300",
    },
    uiStyle: "modern",
    buttonHistory:
      "2020年代のボタンは角丸やフラットな色使いが特徴です。シャドウや装飾は最小限で、配色とサイズでボタンの重要度を示す手法が主流です。多くのアプリでライト／ダーク両方に対応する配色が採用されました。",
    inputHistory:
      "2020年代の入力欄は枠線を薄くしたり、背景と同化させるなど、目立たないデザインが多くなりました。余白やフォントサイズの調整により、入力体験の快適さと読みやすさを重視しています。",
    cardFacts: [
      {
        fact: "ダークモードはOLED画面で省電力にもなります。",
        description:
          "OLEDディスプレイでは黒い部分のピクセルが消灯するため、ダークモードはバッテリー消費を抑える効果があります。",
      },
      {
        fact: "余白を活かしたUIは“ネオモルフィズム”とも呼ばれます。",
        description:
          "淡い影や立体感を残しつつ、シンプルで柔らかい印象を与えるデザイン手法が2020年代に登場しました。",
      },
      {
        fact: "アクセシビリティがUIの大きなテーマになりました。",
        description:
          "高コントラストモードやフォントサイズ調整など、誰でも快適に使えるようにすることが、デザインの必須条件になっています。",
      },
    ],
  },
];

// EraButton
function EraButton({ style, onClick }: { style: Era["uiStyle"]; onClick?: () => void }) {
  switch (style) {
    case "glossy":
      return <button onClick={onClick} className="css-button-shadow-border-sliding--sky cursor-pointer tiny5 px-4 py-2">Search</button>;
    case "flat":
      return <button onClick={onClick} className="rounded-md px-4 py-2 text-green-600 text-sm bg-white">Submit</button>;
    case "modern":
      return <button onClick={onClick} className="px-4 py-2 bg-purple-400 text-white font-semibold rounded-full">Button</button>;
  }
}

// EraInput
function EraInput({ style, onClick }: { style: Era["uiStyle"]; onClick?: () => void }) {
  switch (style) {
    case "glossy":
      return <button onClick={onClick} className="bg-gradient-to-b from-white to-gray-200 px-4 py-2 border border-gray-300 text-gray-400 w-52 rounded-sm text-sm flex whitespace-nowrap tiny5">Search Videos...</button>;
    case "flat":
      return <button onClick={onClick} className="px-4 py-2 w-48 text-sm text-gray-400 border-b border-gray-300 bg-white rounded-t-sm shadow-sm flex items-center whitespace-nowrap overflow-hidden text-ellipsis">Type here...</button>;
    case "modern":
      return <button onClick={onClick} className="px-4 py-2 rounded-md border border-white text-sm whitespace-nowrap w-32 flex">Enter text...</button>;
  }
}

// EraCard
function EraCard({ style, fact, onClick }: { style: Era["uiStyle"]; fact: { fact: string; description: string }; onClick?: () => void }) {
  switch (style) {
    case "glossy":
      return <div onClick={onClick} className="zen-maru-gothic bg-gradient-to-b from-white to-gray-200 shadow-lg border border-gray-300 px-3 py-2 w-52 cursor-pointer"><p className="text-gray-900 text-xs font-medium">{fact.fact}</p></div>;
    case "flat":
      return <div onClick={onClick} className="zen-maru-gothic bg-white rounded-sm shadow-md px-4 py-3 w-52 cursor-pointer"><p className="text-gray-900 text-xs font-medium">{fact.fact}</p></div>;
    case "modern":
      return <div onClick={onClick} className="zen-maru-gothic bg-gray-800/50 text-white rounded-lg shadow-md px-4 py-3 w-52 cursor-pointer"><p className="text-xs font-medium">{fact.fact}</p></div>;
  }
}

// EraModal
function EraModal({ era, elementType, fact, onClose }: { era: Era; elementType: EraElementType; fact?: { fact: string; description: string }; onClose: () => void }) {
  let historyText = "";
  let titleText = era.title;

  if (elementType === "button") {
    historyText = era.buttonHistory;
  } else if (elementType === "input") {
    historyText = era.inputHistory;
  } else if (elementType === "card") {
    titleText = fact?.fact || era.title;
    historyText = fact?.description || era.description;
  }

  const imageSrc =
    era.year === "2000s" && elementType === "button"
      ? "/examples/2000_button.png"
      : era.year === "2010s" && elementType === "input"
      ? "/examples/2010_input.png"
      : null;

  return (
    <AnimatePresence>
      {era && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-gray-900" initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 40, opacity: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold mb-2">{era.year}</h2>
            <h3 className="text-lg font-semibold mb-4">{titleText}</h3>
            <p className="mb-6 leading-relaxed whitespace-pre-line">{historyText}</p>
            {imageSrc && <div className="mb-6"><Image src={imageSrc} alt={`${era.year} ${elementType}`} width={100} height={100} className="w-2/3 mx-auto" /></div>}
            <button onClick={onClose} className="px-4 py-2 bg-indigo-500 duration-200 text-white rounded-lg hover:bg-indigo-600">閉じる</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main Page
export default function Page() {
  const [index, setIndex] = useState(0);
  const currentEra = eras[index];
  const [backgroundItems, setBackgroundItems] = useState<BackgroundItem[]>([]);
  const [selectedEra, setSelectedEra] = useState<{ era: Era; elementType: EraElementType; fact?: { fact: string; description: string } } | null>(null);

  useEffect(() => {
    const screenHeight = window.innerHeight;
    const items = [...Array(70)].map(() => {
      const rnd = Math.random();
      let type: EraElementType = "button";
      if (rnd < 0.33) type = "button";
      else if (rnd < 0.66) type = "input";
      else type = "card";
      return {
        type,
        offsetY: Math.random() * screenHeight,
        scale: 0.9 + Math.random() * 0.5,
        opacity: 0.45,
        fact: type === "card" ? currentEra.cardFacts[Math.floor(Math.random() * currentEra.cardFacts.length)] : undefined,
      };
    });
    setBackgroundItems(items);
  }, [index, currentEra]);

  return (
    <main className={`relative min-h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center transition-colors duration-600 bg-gradient-to-br ${currentEra.theme.bg}`}>
      {/* 背景UI */}
      <motion.div key={currentEra.year + "-bg-layer1"} initial={{ x: "100%" }} animate={{ x: "-200%" }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} className="absolute inset-0 flex gap-32">
        {backgroundItems.map((item, i) => (
          <div key={i} style={{ transform: `translateY(${item.offsetY}px) scale(${item.scale})`, opacity: item.opacity }}>
            {item.type === "button" ? (
              <EraButton style={currentEra.uiStyle} onClick={() => setSelectedEra({ era: currentEra, elementType: "button" })} />
            ) : item.type === "input" ? (
              <EraInput style={currentEra.uiStyle} onClick={() => setSelectedEra({ era: currentEra, elementType: "input" })} />
            ) : (
              <EraCard style={currentEra.uiStyle} fact={item.fact!} onClick={() => setSelectedEra({ era: currentEra, elementType: "card", fact: item.fact })} />
            )}
          </div>
        ))}
      </motion.div>

      {/* 中央コンテンツ */}
      <AnimatePresence mode="wait">
        <motion.div key={currentEra.year} initial={{ opacity: 0, y: 80, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -80, scale: 0.95 }} transition={{ duration: 0.6 }} className="z-10 flex flex-col items-center text-center max-w-xl px-6 mb-8">
          <h2 className="text-3xl font-semibold">{currentEra.year}</h2>
          <p className="text-2xl mt-1 zen-maru-gothic">{currentEra.title}</p>
          <p className="text-gray-100 mt-4 zen-maru-gothic">{currentEra.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-32 mb-4 text-center w-full z-20">
        <p className="text-white/60 zen-maru-gothic">UIをクリックして説明を見る</p>
      </div>

      {/* 下部の年代ボタン */}
      <div className="absolute bottom-12 flex gap-8 z-20">
        {eras.map((era, i) => (
          <motion.button key={i} onClick={() => setIndex(i)} whileHover={{ scale: 1.08 }} className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-colors duration-600 ${index === i ? era.theme.accent : "border-gray-400"} bg-gray-800/50 backdrop-blur`}>
            <span className="text-sm font-semibold">{era.year}</span>
          </motion.button>
        ))}
      </div>

      {/* モーダル */}
      {selectedEra && <EraModal era={selectedEra.era} elementType={selectedEra.elementType} fact={selectedEra.fact} onClose={() => setSelectedEra(null)} />}
    </main>
  );
}