import React, { useState, useEffect, useRef } from "react";

function PinkSheep() {
  const [pos, setPos] = useState({ x: 120, y: 120 });
  const [target, setTarget] = useState({ x: 300, y: 300 });
  const [flipped, setFlipped] = useState(false);
  const [showHi, setShowHi] = useState(false);
  const posRef = useRef(pos);
  posRef.current = pos;

  // Pick a new random target every 2.5s
  useEffect(() => {
    const pick = () =>
      setTarget({
        x: 60 + Math.random() * (window.innerWidth - 120),
        y: 60 + Math.random() * (window.innerHeight - 120),
      });
    pick();
    const id = setInterval(pick, 2500);
    return () => clearInterval(id);
  }, []);

  // Smoothly move toward target
  useEffect(() => {
    const id = setInterval(() => {
      setPos((prev) => {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) return prev;
        const speed = 2;
        setFlipped(dx < 0);
        return { x: prev.x + (dx / dist) * speed, y: prev.y + (dy / dist) * speed };
      });
    }, 16);
    return () => clearInterval(id);
  }, [target]);

  const handleClick = () => {
    setShowHi(true);
    setTimeout(() => setShowHi(false), 1800);
  };

  return (
    <div
      onClick={handleClick}
      style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, cursor: "pointer", userSelect: "none", transform: "translate(-50%, -50%)" }}
    >
      {showHi && (
        <div style={{
          position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
          marginBottom: 6, background: "white", border: "2px solid #f9a8d4",
          borderRadius: 12, padding: "4px 14px", fontWeight: 700, color: "#ec4899",
          whiteSpace: "nowrap", boxShadow: "0 2px 10px rgba(0,0,0,0.12)", fontSize: 15,
        }}>
          Hi! BAAAH
          <div style={{
            position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0, borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent", borderTop: "8px solid #f9a8d4",
          }} />
        </div>
      )}
      <svg
        width="64" height="52" viewBox="0 0 64 52"
        style={{ transform: flipped ? "scaleX(-1)" : "none", display: "block", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
      >
        {/* Wool */}
        <circle cx="20" cy="26" r="9" fill="#fce7f3" />
        <circle cx="29" cy="19" r="11" fill="#fce7f3" />
        <circle cx="40" cy="20" r="10" fill="#fce7f3" />
        <circle cx="46" cy="29" r="9" fill="#fce7f3" />
        <circle cx="17" cy="33" r="8" fill="#fce7f3" />
        <circle cx="34" cy="32" r="9" fill="#fce7f3" />
        {/* Head */}
        <ellipse cx="54" cy="27" rx="10" ry="9" fill="#f472b6" />
        {/* Eye */}
        <circle cx="57" cy="25" r="1.8" fill="#1c1917" />
        <circle cx="57.6" cy="24.4" r="0.6" fill="white" />
        {/* Ear */}
        <ellipse cx="47" cy="19" rx="4" ry="3" fill="#f9a8d4" transform="rotate(-20 47 19)" />
        {/* Legs */}
        <rect x="18" y="40" width="5" height="10" rx="2.5" fill="#f472b6" />
        <rect x="26" y="41" width="5" height="10" rx="2.5" fill="#f472b6" />
        <rect x="35" y="41" width="5" height="10" rx="2.5" fill="#f472b6" />
        <rect x="43" y="40" width="5" height="10" rx="2.5" fill="#f472b6" />
      </svg>
    </div>
  );
}

// Mini fork SVG for the background pattern
function MiniFork({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="10" y1="4" x2="10" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="4" x2="16" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="4" x2="22" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 13 Q10 18 16 18 Q22 18 22 13" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="16" y1="18" x2="16" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const FORK_POSITIONS = [
  { top: "8%",  left: "10%", rotate: 15,  opacity: 0.18, scale: 1.1 },
  { top: "12%", left: "72%", rotate: -20, opacity: 0.13, scale: 0.9 },
  { top: "28%", left: "88%", rotate: 35,  opacity: 0.16, scale: 1.3 },
  { top: "55%", left: "78%", rotate: -10, opacity: 0.12, scale: 0.8 },
  { top: "72%", left: "15%", rotate: 25,  opacity: 0.15, scale: 1.0 },
  { top: "80%", left: "60%", rotate: -30, opacity: 0.14, scale: 1.2 },
  { top: "42%", left: "5%",  rotate: 10,  opacity: 0.11, scale: 0.85 },
  { top: "90%", left: "35%", rotate: -15, opacity: 0.13, scale: 0.95 },
  { top: "20%", left: "45%", rotate: 45,  opacity: 0.09, scale: 0.75 },
  { top: "62%", left: "50%", rotate: -5,  opacity: 0.10, scale: 1.15 },
];

const QUICK_TAKES = [
  { label: "Favourite cuisine", value: "Anything Fusion", color: "bg-pink-50 text-pink-700 border-pink-200" },
  { label: "Go-to order", value: "Slop Bowls", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { label: "Dream destination", value: "Tokyo", color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200" },
  { label: "Can't live without", value: "A good cheese", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { label: "Most overrated", value: "Truffle on everything", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Hidden gem city", value: "The Hammer. Duhhh.", color: "bg-violet-50 text-violet-700 border-violet-200" },
];

function QuickTakesCarousel() {
  const [index, setIndex] = useState(0);
  const { label, value, color } = QUICK_TAKES[index];

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center">Quick Takes</h2>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => setIndex((i) => (i - 1 + QUICK_TAKES.length) % QUICK_TAKES.length)}
          className="w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-500 hover:text-stone-900 hover:shadow-md transition-all"
          aria-label="Previous"
        >
          ‹
        </button>
        <div className={`rounded-xl border p-8 ${color} min-w-[260px] text-center transition-all`}>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">{label}</p>
          <p className="font-bold text-2xl leading-tight">{value}</p>
        </div>
        <button
          onClick={() => setIndex((i) => (i + 1) % QUICK_TAKES.length)}
          className="w-10 h-10 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-500 hover:text-stone-900 hover:shadow-md transition-all"
          aria-label="Next"
        >
          ›
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {QUICK_TAKES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-pink-400 scale-125" : "bg-stone-300"}`}
            aria-label={`Go to ${QUICK_TAKES[i].label}`}
          />
        ))}
      </div>
    </div>
  );
}


export function About() {
  return (
    <div>
      <PinkSheep />
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-16 sm:py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-pink-500 font-semibold tracking-widest uppercase text-sm mb-4">The person behind Stickafork.init</p>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6">
            Hi, I'm Rachel.
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            I'm a 20 year old aspiring food content creator reviewing restaurants mostly in Toronto and Montreal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Author Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Author Photo with fork pattern background */}
              <div
                className="md:w-1/3 relative flex items-center justify-center p-6 sm:p-10 overflow-hidden"
                style={{ background: "radial-gradient(circle at 40% 60%, #fce7f3, #fff1f2 70%, #fda4af33)" }}
              >
                {FORK_POSITIONS.map((pos, i) => (
                  <span
                    key={i}
                    className="absolute text-pink-400 pointer-events-none"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      opacity: pos.opacity,
                      transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                    }}
                  >
                    <MiniFork />
                  </span>
                ))}
                <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-white shadow-lg relative z-10">
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/assets/headshot.jpeg`}
                    alt="Rachel Arnold"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-8 md:w-2/3">
                <h2 className="text-3xl font-bold text-stone-900 mb-6">Meet Rachel</h2>
                <div className="space-y-4 text-stone-700 leading-relaxed">
                  <p>
                    I'm Rachel Arnold, a twenty year old McGill student and the voice behind Stickafork.init.
                  </p>
                  <p>
                    My journey has taken me from trying local spots in my hometown to some of the most incredible restaurants around the world. What started as a love for a good meal slowly became something harder to put down — the hunt for places that make you feel something, not just full.
                  </p>
                  <p>
                    This blog tries to capture that. The joy of a perfect bite, yes, but also the warmth of a room that gets it right, the server who makes you feel at home, the moment a dish arrives and you just know. A great restaurant is never just the food, it's everything that surrounds it.
                  </p>
                  <p>
                    Stick around to follow my journey and hopefully somewhere along the way, one of my places becomes one of yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pull Quote */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <blockquote className="relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-pink-100 font-serif leading-none select-none">"</span>
            <p className="relative text-2xl md:text-3xl font-medium text-stone-700 italic leading-relaxed">
              Repping kiwi anaphylaxis.
            </p>
          </blockquote>
        </div>

        {/* Quick Takes */}
        <QuickTakesCarousel />

        {/* More About Me Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center">More About Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-pink-400 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Intern @ TasteToronto</h3>
              <p className="text-stone-600">
                I'm lucky to have been able to intern for Taste! Getting the chance to write and create content for one of the city's go-to guides for discovering the best eats.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-rose-400 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Aspiring Lawyer</h3>
              <p className="text-stone-600">
                Currently completing my undergrad at McGill and working towards law school — though I'll always find time for a good dinner.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-fuchsia-400 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Actress</h3>
              <p className="text-stone-600">
                Performing has always been a big part of who I am, having played roles in numerous productions at both McGill and my high school!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
