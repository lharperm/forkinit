import React from "react";

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

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          About Stickafork.init
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
          Rachel's journey through the world's most remarkable dining experiences.
        </p>
      </div>

      {/* Author Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">

            {/* Author Photo with fork pattern background */}
            <div className="md:w-1/3 relative flex items-center justify-center p-10 overflow-hidden"
              style={{ background: "radial-gradient(circle at 40% 60%, #fce7f3, #fff1f2 70%, #fda4af33)" }}
            >
              {/* Scattered fork icons */}
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

              {/* Photo */}
              <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-white shadow-lg relative z-10">
                <img
                  src="https://qbdaxsqwbrjdrvexvdkj.supabase.co/storage/v1/object/public/assets/headshot.jpeg"
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
                  My journey has taken me from trying local spots in my hometown to some of the most incredible restaurants around the world. What started as a love for a good meal slowly became something harder to put down, the hunt for places that make you feel something, not just full.
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

    

      {/* Review Process Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center">How I Review</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Atmosphere</h3>
            <p className="text-stone-700">
              I evaluate ambiance, service, and the overall dining environment. Does it match
              the cuisine? Is the experience cohesive?
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Food Quality</h3>
            <p className="text-stone-700">
              The heart of every review. I assess flavors, technique, ingredient quality, and
              creativity. Is the food memorable?
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Value</h3>
            <p className="text-stone-700">
              Is the experience worth the price? I consider quality, portion size, and overall
              satisfaction relative to cost.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
