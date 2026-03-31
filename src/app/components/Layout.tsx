import { Outlet, Link, NavLink } from "react-router";
import React from "react";
import { ForkLogo } from "./ForkLogo";

export function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      <header className="bg-white border-b border-stone-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-pink-600 transition-colors">
                Stickafork<span className="text-pink-500">.init</span>
              </span>
            </Link>

            {/* Nav links */}
            <nav className="flex items-center gap-0.5 sm:gap-1">
              {[
                { to: "/", label: "Home", end: true },
                { to: "/reviews", label: "Reviews" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-pink-50 text-pink-600"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-stone-900 text-stone-400 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2 text-stone-300">
              <ForkLogo size={18} />
              <span className="font-bold text-white text-sm tracking-tight">
                Stickafork<span className="text-pink-400">.init</span>
              </span>
            </div>
            <p className="text-xs text-stone-500">© 2026 Stickafork.init. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}