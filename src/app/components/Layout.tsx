import { Outlet, Link } from "react-router";
import React from "react";
import fork from "@/assets/fork.svg";

export function Layout() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
            <img
                src={fork}
                alt="Stickafork logo"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-3xl font-bold text-stone-900 group-hover:text-pink-600 transition-colors">
                Stickafork.init
              </h1>
            </Link>
            <nav>
              <Link 
                to="/" 
                className="text-stone-700 hover:text-pink-600 transition-colors font-medium"
              >
                Home
              </Link>
              {' | '}
              <Link 
                to="/about" 
                className="text-stone-700 hover:text-pink-600 transition-colors font-medium"
              >
                About
              </Link>
              {' | '}
              <Link 
                to="/contact" 
                className="text-stone-700 hover:text-pink-600 transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer className="bg-stone-900 text-stone-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <img
              src={fork}
              alt="Stickafork logo"
              className="w-7 h-7 object-contain"
            />
              <span className="font-bold text-white">Stickafork.init</span>
            </div>
            <p className="text-sm">© 2026 Stickafork.init. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}