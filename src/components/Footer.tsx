import React from "react";
import { useTheme } from "../context/ThemeContext.tsx";

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={`w-full py-12 md:py-20 border-t font-sans font-normal text-xs tracking-wider transition-colors duration-500 ${
      theme === "dark" 
        ? "bg-charcoal-950 text-sand-300/50 border-white/5" 
        : "bg-white text-charcoal-900/70 border-charcoal-950/5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 md:mb-24">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo/WhatsApp Image 2026-06-27 at 17.03.05.jpeg" 
                alt="Decorle Logo" 
                className="h-9 w-9 rounded-full object-cover border border-charcoal-950/10 dark:border-white/10" 
              />
              <h4 className={`font-display text-lg font-bold tracking-[0.2em] uppercase ${
                theme === "dark" ? "text-sand-100" : "text-charcoal-950"
              }`}>
                Decorle
              </h4>
            </div>
            <p className={`max-w-sm leading-relaxed ${
              theme === "dark" ? "text-sand-300/40" : "text-charcoal-900/80"
            }`}>
              Turnkey architectural interior design, painting, surface artworks, and custom modular home fittings.
              Crafted in India, engineered for timeless elegance.
            </p>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className={`font-bold tracking-[0.15em] uppercase mb-2 ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              Navigation
            </span>
            <a
              href="#philosophy"
              onClick={(e) => handleScrollTo(e, "#philosophy")}
              className={`transition-colors py-1 w-max font-medium ${
                theme === "dark" ? "hover:text-sand-100" : "hover:text-charcoal-950"
              }`}
            >
              Philosophy
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className={`transition-colors py-1 w-max font-medium ${
                theme === "dark" ? "hover:text-sand-100" : "hover:text-charcoal-950"
              }`}
            >
              Services
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className={`transition-colors py-1 w-max font-medium ${
                theme === "dark" ? "hover:text-sand-100" : "hover:text-charcoal-950"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Location details */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className={`font-bold tracking-[0.15em] uppercase mb-2 ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              Inquiries
            </span>
            <p className={`leading-relaxed font-medium ${
              theme === "dark" ? "text-sand-300/70" : "text-charcoal-900"
            }`}>
              decorle.in@gmail.com <br />
              +91 9605389002
            </p>
            <p className={`font-medium ${
              theme === "dark" ? "text-sand-300/50" : "text-charcoal-900/60"
            }`}>
              Kerala, India.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t ${
          theme === "dark" 
            ? "border-white/5 text-sand-300/30" 
            : "border-charcoal-950/5 text-charcoal-950/40"
        }`}>
          <p>© {currentYear} DECORLE. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/decorle.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                theme === "dark" ? "hover:text-sand-100" : "hover:text-charcoal-950"
              }`}
            >
              Instagram
            </a>
            <span className={theme === "dark" ? "text-sand-300/10" : "text-charcoal-950/10"}>|</span>
            <a
              href="https://wa.me/919605389002"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                theme === "dark" ? "hover:text-sand-100" : "hover:text-charcoal-950"
              }`}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
