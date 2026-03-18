import React, { useEffect, useRef, useState } from "react";

const WORDS = [
  { jp: "つるはし", romaji: ["turuhasi", "tsuruhashi"], image: "pickaxe" },
  { jp: "けん", romaji: ["ken"], image: "sword" },
  { jp: "ダイヤのけん", romaji: ["daiyanoken"], image: "diamond_sword" },
  { jp: "ダイヤ", romaji: ["daiya"], image: "diamond" },
  { jp: "きん", romaji: ["kin"], image: "gold_ingot" },
  { jp: "てつ", romaji: ["tetu", "tetsu"], image: "iron_ingot" },
  { jp: "せきたん", romaji: ["sekitan"], image: "coal" },
  { jp: "たいまつ", romaji: ["taimatu", "taimatsu"], image: "torch" },
  { jp: "りんご", romaji: ["ringo"], image: "apple" },
  { jp: "パン", romaji: ["pan"], image: "bread" },
  { jp: "ベッド", romaji: ["beddo"], image: "bed" },
  { jp: "チェスト", romaji: ["chesuto"], image: "chest" },
  { jp: "ドア", romaji: ["doa"], image: "door" },
  { jp: "おの", romaji: ["ono"], image: "axe" },
  { jp: "シャベル", romaji: ["syaberu", "shaberu"], image: "shovel" },
  { jp: "ぼうし", romaji: ["bousi", "boushi"], image: "helmet" },
  { jp: "よろい", romaji: ["yoroi"], image: "chestplate" },
  { jp: "ブーツ", romaji: ["buutsu"], image: "boots" },
  { jp: "たて", romaji: ["tate"], image: "shield" },
  { jp: "ボート", romaji: ["booto"], image: "boat" },
  { jp: "うま", romaji: ["uma"], image: "horse" },
  { jp: "ひつじ", romaji: ["hituzi", "hitsuji"], image: "sheep" },
  { jp: "ぶた", romaji: ["buta"], image: "pig" },
  { jp: "にわとり", romaji: ["niwatori"], image: "chicken" },
  { jp: "クリーパー", romaji: ["kuri-pa-"], image: "creeper" },
  { jp: "ゾンビ", romaji: ["zonbi"], image: "zombie" },
  { jp: "スケルトン", romaji: ["sukeruton"], image: "skeleton" },
  { jp: "オオカミ", romaji: ["ookami"], image: "wolf" },
  { jp: "いし", romaji: ["isi", "ishi"], image: "stone" },
  { jp: "き", romaji: ["ki"], image: "log" },
];

function svgDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const IMAGE_URLS = {
  pickaxe: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="48" y="44" width="12" height="52" fill="#7c4a1f"/>
    <rect x="22" y="24" width="48" height="12" fill="#46c6da"/>
    <rect x="10" y="36" width="18" height="12" fill="#46c6da"/>
    <rect x="64" y="36" width="20" height="12" fill="#46c6da"/>
    <rect x="22" y="24" width="48" height="4" fill="#b9f6ff" opacity=".7"/>
  </svg>`),
  sword: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="54" y="16" width="20" height="52" fill="#d6dde6"/>
    <rect x="42" y="54" width="44" height="12" fill="#8b5e34"/>
    <rect x="58" y="66" width="12" height="30" fill="#5f3b20"/>
  </svg>`),
  diamond_sword: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="54" y="14" width="20" height="54" fill="#32d5ea"/>
    <rect x="42" y="54" width="44" height="12" fill="#2563eb"/>
    <rect x="58" y="66" width="12" height="30" fill="#5f3b20"/>
    <rect x="54" y="14" width="20" height="6" fill="#b9f6ff" opacity=".7"/>
  </svg>`),
  diamond: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <polygon points="64,18 96,50 64,100 32,50" fill="#32d5ea"/>
    <polygon points="64,18 80,50 64,100 48,50" fill="#7eefff" opacity=".65"/>
  </svg>`),
  gold_ingot: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="26" y="48" width="76" height="24" rx="4" fill="#facc15"/>
    <rect x="30" y="52" width="68" height="6" fill="#fff4a3" opacity=".7"/>
  </svg>`),
  iron_ingot: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="26" y="48" width="76" height="24" rx="4" fill="#cbd5e1"/>
    <rect x="30" y="52" width="68" height="6" fill="#ffffff" opacity=".7"/>
  </svg>`),
  coal: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <polygon points="64,24 96,42 84,88 42,96 24,54" fill="#1f2937"/>
    <polygon points="64,24 78,46 66,86 50,90 38,56" fill="#4b5563" opacity=".5"/>
  </svg>`),
  torch: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="58" y="40" width="12" height="48" fill="#7c4a1f"/>
    <polygon points="64,18 82,42 46,42" fill="#fb923c"/>
    <polygon points="64,24 74,40 54,40" fill="#fde047"/>
  </svg>`),
  apple: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <circle cx="62" cy="66" r="28" fill="#ef4444"/>
    <rect x="60" y="26" width="6" height="16" fill="#7c4a1f"/>
    <ellipse cx="78" cy="30" rx="12" ry="7" fill="#22c55e" transform="rotate(20 78 30)"/>
  </svg>`),
  bread: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="24" y="42" width="80" height="42" rx="18" fill="#c97a21"/>
    <rect x="28" y="48" width="72" height="8" rx="4" fill="#f7c174" opacity=".7"/>
  </svg>`),
  bed: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="24" y="46" width="80" height="26" fill="#ef4444"/>
    <rect x="24" y="36" width="24" height="16" fill="#ffffff"/>
    <rect x="24" y="72" width="8" height="18" fill="#7c4a1f"/>
    <rect x="96" y="72" width="8" height="18" fill="#7c4a1f"/>
  </svg>`),
  chest: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="28" y="34" width="72" height="56" fill="#a16207"/>
    <rect x="28" y="58" width="72" height="10" fill="#7c4a1f"/>
    <rect x="58" y="54" width="12" height="18" fill="#facc15"/>
  </svg>`),
  door: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="38" y="18" width="52" height="88" fill="#a16207"/>
    <circle cx="76" cy="62" r="4" fill="#fde68a"/>
    <rect x="46" y="28" width="12" height="20" fill="#7c4a1f" opacity=".35"/>
  </svg>`),
  axe: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="56" y="30" width="12" height="56" fill="#7c4a1f"/>
    <path d="M44 28h34v26H56c-9 0-16-7-16-16z" fill="#cbd5e1"/>
  </svg>`),
  shovel: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="58" y="22" width="12" height="46" fill="#7c4a1f"/>
    <path d="M50 68q14-18 28 0v22H50z" fill="#cbd5e1"/>
  </svg>`),
  helmet: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <path d="M28 58c6-22 24-34 36-34s30 12 36 34v18H28z" fill="#60a5fa"/>
    <rect x="40" y="76" width="48" height="8" fill="#1d4ed8"/>
  </svg>`),
  chestplate: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <path d="M38 24h52l10 16-12 60H40L28 40z" fill="#60a5fa"/>
  </svg>`),
  boots: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="30" y="54" width="24" height="34" fill="#60a5fa"/>
    <rect x="74" y="54" width="24" height="34" fill="#60a5fa"/>
  </svg>`),
  shield: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <path d="M64 20l30 12v26c0 20-14 38-30 46-16-8-30-26-30-46V32z" fill="#d4a24c"/>
    <rect x="58" y="34" width="12" height="40" fill="#7c4a1f"/>
  </svg>`),
  boat: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <path d="M22 72h84l-14 18H36z" fill="#8b5e34"/>
    <rect x="61" y="36" width="6" height="28" fill="#7c4a1f"/>
  </svg>`),
  stone: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="28" y="28" width="72" height="72" fill="#9ca3af"/>
    <rect x="38" y="42" width="16" height="10" fill="#cbd5e1" opacity=".45"/>
    <rect x="62" y="60" width="14" height="8" fill="#6b7280" opacity=".35"/>
  </svg>`),
  log: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="26" y="38" width="76" height="52" rx="8" fill="#8b5e34"/>
    <circle cx="40" cy="64" r="12" fill="#d6a76c"/>
    <circle cx="40" cy="64" r="6" fill="#b88347"/>
  </svg>`),
  horse: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="30" y="44" width="48" height="28" fill="#8b5e34"/>
    <rect x="70" y="34" width="22" height="22" fill="#8b5e34"/>
    <rect x="40" y="72" width="6" height="20" fill="#5f3b20"/>
    <rect x="66" y="72" width="6" height="20" fill="#5f3b20"/>
  </svg>`),
  sheep: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="26" y="42" width="56" height="34" rx="10" fill="#ffffff"/>
    <rect x="76" y="48" width="18" height="16" fill="#374151"/>
  </svg>`),
  pig: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="26" y="42" width="56" height="34" rx="8" fill="#f9a8d4"/>
    <rect x="74" y="48" width="20" height="16" rx="4" fill="#f472b6"/>
  </svg>`),
  chicken: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <circle cx="58" cy="58" r="24" fill="#ffffff"/>
    <polygon points="78,58 96,52 96,64" fill="#f59e0b"/>
    <polygon points="54,28 62,16 70,28" fill="#ef4444"/>
  </svg>`),
  creeper: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="36" y="22" width="56" height="76" fill="#22c55e"/>
    <rect x="46" y="40" width="8" height="8" fill="#111827"/>
    <rect x="74" y="40" width="8" height="8" fill="#111827"/>
    <rect x="56" y="54" width="16" height="12" fill="#111827"/>
    <rect x="50" y="66" width="8" height="12" fill="#111827"/>
    <rect x="70" y="66" width="8" height="12" fill="#111827"/>
  </svg>`),
  zombie: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="42" y="22" width="40" height="34" fill="#22c55e"/>
    <rect x="38" y="58" width="48" height="30" fill="#38bdf8"/>
  </svg>`),
  skeleton: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <circle cx="64" cy="36" r="16" fill="#e5e7eb"/>
    <rect x="58" y="52" width="12" height="30" fill="#e5e7eb"/>
    <rect x="42" y="58" width="44" height="8" fill="#e5e7eb"/>
  </svg>`),
  wolf: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#f8fafc"/>
    <rect x="28" y="44" width="54" height="28" fill="#d1d5db"/>
    <rect x="74" y="40" width="18" height="18" fill="#d1d5db"/>
    <polygon points="78,38 84,26 90,38" fill="#9ca3af"/>
  </svg>`),
};

const KEY_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "-"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const TOTAL_TIME = 60;
const POINT_PER_CHAR = 10;
const POINT_PER_WORD = 20;
const POINT_PER_STREAK = 2;
const MISS_PENALTY = 8;

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function MinecraftImage({ type, alt }) {
  const src = IMAGE_URLS[type];

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain [image-rendering:pixelated]"
    />
  );
}

function Keyboard({ expectedChars, onType }) {
  return (
    <div className="w-full rounded-[1.4rem] border-4 border-slate-300 bg-white/95 p-3 shadow-xl">
      <div className="mb-2 text-center text-sm md:text-base font-bold text-slate-700">したの キーボードを クリックしても OK！</div>
      <div className="space-y-2">
        {KEY_ROWS.map((row, idx) => (
          <div key={idx} className="flex justify-center gap-2 flex-wrap">
            {row.map((key) => {
              const isNext = expectedChars.includes(key);
              return (
                <button
                  key={key === "-" ? "ー" : key}
                  onClick={() => onType(key)}
                  className={`h-10 w-10 md:h-11 md:w-11 rounded-xl border-2 text-lg md:text-xl font-black uppercase shadow-sm transition active:scale-95 ${
                    isNext
                      ? "border-amber-500 bg-amber-300 text-slate-900"
                      : "border-slate-300 bg-slate-50 text-slate-800"
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-xs md:text-sm font-bold text-slate-600">
        つぎに うてる もじ： <span className="rounded-xl bg-amber-200 px-2 py-1 text-lg md:text-xl text-slate-900">{expectedChars.map((c) => (c === "-" ? "ー" : c)).join(" / ") || "おわり"}</span>
      </div>
    </div>
  );
}

function ResultCard({ score, correctWords, totalTyped, missCount, maxStreak, onRestart }) {
  const reachedGoal = score >= 800;
  let message = "すごい！";
  if (score < 350) message = "よく がんばったね！";
  else if (score < 600) message = "とっても じょうず！";
  else if (score < 800) message = "もうすこしで もくひょう！";
  else if (score < 1000) message = "おめでとう！ もくひょう たっせい！";
  else message = "やったね！ すごい きろく！";

  return (
    <div className={`mx-auto max-w-3xl rounded-[2rem] border-4 p-6 text-center shadow-2xl ${reachedGoal ? "border-yellow-300 bg-[linear-gradient(180deg,#fff7cc_0%,#ffffff_55%,#ecfeff_100%)]" : "border-emerald-300 bg-white"}`}>
      <div className={`text-3xl font-black ${reachedGoal ? "text-amber-500" : "text-emerald-600"}`}>{message}</div>
      {reachedGoal && <div className="mt-3 text-5xl md:text-6xl">🎉🏆✨</div>}
      {reachedGoal && (
        <div className="mt-3 rounded-3xl bg-yellow-100 px-4 py-3 text-lg md:text-xl font-black text-amber-600">
          800てん いじょう クリア！ おめでとう！
        </div>
      )}
      <div className="mt-4 text-xl font-bold text-slate-700">スコア</div>
      <div className="text-6xl font-black text-sky-600">{score}</div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-3xl bg-slate-100 p-3"><div className="text-xs font-bold text-slate-500">できた ことば</div><div className="text-3xl font-black text-slate-800">{correctWords}</div></div>
        <div className="rounded-3xl bg-slate-100 p-3"><div className="text-xs font-bold text-slate-500">うてた もじ</div><div className="text-3xl font-black text-slate-800">{totalTyped}</div></div>
        <div className="rounded-3xl bg-slate-100 p-3"><div className="text-xs font-bold text-slate-500">ミス</div><div className="text-3xl font-black text-rose-500">{missCount}</div></div>
        <div className="rounded-3xl bg-slate-100 p-3"><div className="text-xs font-bold text-slate-500">れんぞく</div><div className="text-3xl font-black text-emerald-600">{maxStreak}</div></div>
      </div>
      {reachedGoal && <div className="mt-4 text-base md:text-lg font-bold text-slate-700">ミスが すくなくて とっても じょうず！</div>}
      <button onClick={onRestart} className="mt-6 rounded-3xl bg-sky-500 px-8 py-4 text-2xl font-black text-white shadow-lg transition hover:scale-[1.02] active:scale-95">もう いっかい</button>
    </div>
  );
}

export default function PrograTypingGame() {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [wordPool, setWordPool] = useState(() => shuffle(WORDS));
  const [index, setIndex] = useState(0);
  const [activeStates, setActiveStates] = useState([{ option: wordPool[0].romaji[0], pos: 0 }]);
  const [shake, setShake] = useState(false);
  const audioRef = useRef({ context: null });

  const current = wordPool[index % wordPool.length];

  useEffect(() => {
    setActiveStates([{ option: current.romaji[0], pos: 0 }]);
  }, [index]);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, timeLeft]);

  const beep = (freq = 520, duration = 0.08) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioRef.current.context) audioRef.current.context = new AudioCtx();
      const ctx = audioRef.current.context;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.value = 0.03;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  };

  const nextWord = () => setIndex((v) => v + 1);

  const handleType = (char) => {
    if (!started || timeLeft <= 0) return;
    const nextStates = [];
    for (const state of activeStates) {
      if (state.option[state.pos] === char) {
        nextStates.push({ option: state.option, pos: state.pos + 1 });
      }
    }
    if (nextStates.length === 0) {
      setShake(true);
      setMissCount((v) => v + 1);
      setStreak(0);
      setScore((s) => Math.max(0, s - MISS_PENALTY));
      beep(220, 0.06);
      setTimeout(() => setShake(false), 180);
      return;
    }
    setActiveStates(nextStates);
    setTotalTyped((v) => v + 1);
    const newStreak = streak + 1;
    setStreak(newStreak);
    setMaxStreak((v) => Math.max(v, newStreak));
    setScore((s) => s + POINT_PER_CHAR + Math.min(POINT_PER_STREAK * newStreak, 20));
    beep(640, 0.05);
    const completed = nextStates.some((s) => s.pos >= s.option.length);
    if (completed) {
      setScore((s) => s + POINT_PER_WORD);
      setCorrectWords((v) => v + 1);
      beep(880, 0.12);
      nextWord();
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (/^[a-z-]$/.test(key)) {
        e.preventDefault();
        handleType(key);
      }
      if ((e.key === "Enter" || e.key === " ") && !started) {
        e.preventDefault();
        setStarted(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const restart = () => {
    const shuffled = shuffle(WORDS);
    setStarted(false);
    setTimeLeft(TOTAL_TIME);
    setScore(0);
    setCorrectWords(0);
    setTotalTyped(0);
    setMissCount(0);
    setStreak(0);
    setMaxStreak(0);
    setWordPool(shuffled);
    setIndex(0);
    setActiveStates([{ option: shuffled[0].romaji[0], pos: 0 }]);
  };

  const progress = (timeLeft / TOTAL_TIME) * 100;
  const bestProgress = activeStates.reduce((best, s) => (s.pos > best.pos ? s : best), activeStates[0] || { option: current.romaji[0], pos: 0 });
  const typedPart = bestProgress.option.slice(0, bestProgress.pos);
  const restPart = bestProgress.option.slice(bestProgress.pos);
  const expectedChars = [...new Set(activeStates.map((s) => s.option[s.pos]).filter(Boolean))];

  return (
    <div className="h-screen overflow-hidden bg-[linear-gradient(180deg,#67e8f9_0%,#93c5fd_45%,#dbeafe_100%)] p-3">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-3">
        <div className="rounded-[1.75rem] border-4 border-sky-400 bg-white/90 p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="min-w-0">
                <div className="text-2xl md:text-3xl font-black text-sky-700 truncate">プロクラ ローマじ タイピング</div>
                <div className="mt-1 text-sm md:text-base font-bold text-slate-700">60びょうで たくさん うとう！ したに キーボードつき！</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="rounded-2xl bg-sky-100 px-3 py-2 text-center"><div className="text-[10px] md:text-xs font-bold text-slate-500">のこり</div><div className="text-2xl md:text-3xl font-black text-sky-600">{timeLeft}</div></div>
              <div className="rounded-2xl bg-amber-100 px-3 py-2 text-center"><div className="text-[10px] md:text-xs font-bold text-slate-500">スコア</div><div className="text-2xl md:text-3xl font-black text-amber-600">{score}</div></div>
              <div className="rounded-2xl bg-emerald-100 px-3 py-2 text-center"><div className="text-[10px] md:text-xs font-bold text-slate-500">ことば</div><div className="text-2xl md:text-3xl font-black text-emerald-600">{correctWords}</div></div>
              <div className="rounded-2xl bg-rose-100 px-3 py-2 text-center"><div className="text-[10px] md:text-xs font-bold text-slate-500">ミス</div><div className="text-2xl md:text-3xl font-black text-rose-500">{missCount}</div></div>
            </div>
          </div>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-fuchsia-500 transition-all" style={{ width: `${progress}%` }} /></div>
        </div>

        {!started ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] border-4 border-sky-300 bg-white p-6 text-center shadow-2xl">
                <div className="text-5xl md:text-6xl">🎮</div>
                <div className="mt-3 text-3xl md:text-4xl font-black text-sky-600">スタート しよう！</div>
                <div className="mt-3 text-lg md:text-xl font-bold leading-relaxed text-slate-700">でてきた ことばを ローマじで うとう！<br />スペースキーでも スタート できるよ！</div>
                <div className="mt-5 rounded-3xl bg-amber-50 p-4 text-left text-base md:text-lg font-bold text-slate-700">
                  <div className="mb-2 rounded-2xl bg-white px-3 py-2 text-sm md:text-base text-slate-700">ミスが すくないと どんどん てんすうが のびるよ！</div>
                  <div className="mb-2 rounded-2xl bg-emerald-100 px-3 py-2 text-sm md:text-base text-emerald-700">もくひょう：800てん！</div>
                  <div>・つぎに うつ もじは きいろで ひかるよ</div>
                  <div>・つ / し / ち は 「tu」「si」「ti」でも OK！</div>
                  <div>・したの キーボードを クリックしても あそべるよ</div>
                </div>
                <button onClick={() => setStarted(true)} className="mt-6 rounded-3xl bg-sky-500 px-10 py-4 text-3xl font-black text-white shadow-lg transition hover:scale-[1.02] active:scale-95">スタート</button>
                <div className="mt-3 text-sm font-bold text-slate-500">Enterキー / Spaceキー でも スタート</div>
              </div>

              <div className="rounded-[2rem] border-4 border-emerald-300 bg-white/95 p-5 shadow-2xl">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-3xl border-4 border-slate-200 bg-slate-50 p-3 shadow-inner">
                    <MinecraftImage type="diamond_sword" alt="ダイヤのけん" />
                  </div>
                  <div className="rounded-3xl border-4 border-slate-200 bg-slate-50 p-3 shadow-inner">
                    <MinecraftImage type="creeper" alt="クリーパー" />
                  </div>
                  <div className="rounded-3xl border-4 border-slate-200 bg-slate-50 p-3 shadow-inner">
                    <MinecraftImage type="apple" alt="りんご" />
                  </div>
                  <div className="rounded-3xl border-4 border-slate-200 bg-slate-50 p-3 shadow-inner">
                    <MinecraftImage type="pickaxe" alt="つるはし" />
                  </div>
                </div>
                <div className="mt-4 rounded-3xl bg-emerald-50 p-4 text-center">
                  <div className="text-xl md:text-2xl font-black text-emerald-600">マイクラの ことばが いっぱい！</div>
                  <div className="mt-2 text-sm md:text-base font-bold text-slate-600">けん・チェスト・クリーパー などを ローマじで うって あそぼう！</div>
                </div>
              </div>
            </div>
          </div>
        ) : timeLeft === 0 ? (
          <div className="flex flex-1 items-center justify-center"><ResultCard score={score} correctWords={correctWords} totalTyped={totalTyped} missCount={missCount} maxStreak={maxStreak} onRestart={restart} /></div>
        ) : (
          <div className={`grid min-h-0 flex-1 grid-rows-[1fr_auto] gap-3 ${shake ? "translate-x-1" : ""}`}>
            <div className="rounded-[1.75rem] border-4 border-slate-300 bg-white p-4 shadow-2xl">
              <div className="grid h-full grid-cols-[160px_1fr] gap-4 items-center md:grid-cols-[210px_1fr]">
                <div className="mx-auto h-36 w-36 md:h-48 md:w-48 rounded-[1.75rem] border-4 border-slate-200 bg-slate-50 p-3 shadow-inner">
                  <MinecraftImage type={current.image} alt={current.jp} />
                </div>
                <div>
                  <div className="text-sm md:text-base font-black text-slate-500">この ことばを ローマじで うとう！</div>
                  <div className="mt-2 text-3xl md:text-5xl font-black text-slate-800 leading-tight">{current.jp}</div>
                  <div className="mt-4 rounded-3xl bg-slate-100 p-3 md:p-4 text-2xl md:text-4xl font-black tracking-[0.15em] text-slate-800 break-all">
                    <span className="text-emerald-600">{typedPart}</span>
                    <span className="text-slate-400">{restPart}</span>
                  </div>
                  <div className="mt-2 text-sm md:text-lg font-bold text-slate-600">れい： {current.romaji.join(" / ")}</div>
                </div>
              </div>
            </div>
            <Keyboard expectedChars={expectedChars} onType={handleType} />
          </div>
        )}
      </div>
    </div>
  );
}
