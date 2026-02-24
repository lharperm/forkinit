import React from "react";


export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          About Stickafork.init
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
          A personal journey through the world's most remarkable dining experiences
        </p>
      </div>

      {/* Author Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
           
            <div className="p-8 md:w-2/3">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Meet Rachel</h2>
              <p className="text-stone-700 mb-4">
                Hi, I'm Rachel Arnold, the voice behind Stickafork.init. My love affair with food began 
                in my grandmother's kitchen in Shanghai, where I learned that the best meals are those 
                made with passion and shared with love.
              </p>
              <p className="text-stone-700 mb-4">
                Over the past decade, I've traveled to over 50 countries, eating my way through 
                bustling street markets, cozy neighborhood bistros, and some of the world's most 
                celebrated restaurants. From the three-Michelin-starred elegance of Osteria Francescana 
                to the humble perfection of a Bangkok street cart, I believe every meal tells a story.
              </p>
              <p className="text-stone-700">
                Through Stickafork.init, I share these stories with you—honest, detailed reviews that 
                help you decide where to spend your time and money for truly memorable dining experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-pink-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-stone-700 mb-4 text-center">
            At Stickafork.init, we believe that exceptional dining experiences come in all shapes, 
            sizes, and price points. Our mission is to guide you to the meals that matter—whether 
            it's a once-in-a-lifetime tasting menu or the best bowl of noodles you've ever had.
          </p>
          <p className="text-lg text-stone-700 text-center">
            We don't just rate restaurants; we tell their stories, capture their essence, and help 
            you understand what makes each one special.
          </p>
        </div>
      </div>

      {/* Review Process Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center">How We Review</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Atmosphere</h3>
            <p className="text-stone-700">
              We evaluate ambiance, service, and the overall dining environment. Does it match 
              the cuisine? Is the experience cohesive?
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Food Quality</h3>
            <p className="text-stone-700">
              The heart of every review. We assess flavors, technique, ingredient quality, and 
              creativity. Is the food memorable?
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Value</h3>
            <p className="text-stone-700">
              Is the experience worth the price? We consider quality, portion size, and overall 
              satisfaction relative to cost.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center">Our Values</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-pink-600 pl-6 py-2">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Honest & Independent</h3>
            <p className="text-stone-700">
              All reviews are based on anonymous visits. We pay for our meals and never accept 
              compensation for favorable reviews.
            </p>
          </div>

          <div className="border-l-4 border-pink-600 pl-6 py-2">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Inclusive & Diverse</h3>
            <p className="text-stone-700">
              Great food knows no boundaries. We celebrate cuisine from all cultures and price 
              points, from street food to fine dining.
            </p>
          </div>

          <div className="border-l-4 border-pink-600 pl-6 py-2">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Detailed & Helpful</h3>
            <p className="text-stone-700">
              Every review includes practical information—what to order, when to go, what to 
              expect—so you can make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}