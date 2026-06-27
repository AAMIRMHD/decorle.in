import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext.tsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Handle transparent to blurred navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Reset active section back to home if at top of page
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll spy active navigation links
  useEffect(() => {
    const sections = ["philosophy", "services", "contact"];
    
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-30% 0px -40% 0px", // Trigger when section is in the active reading area
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Philosophy", href: "#philosophy" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Capsule Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 pt-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 22 }}
          className={`w-full max-w-5xl rounded-full transition-all duration-500 flex items-center justify-between px-6 md:px-8 border ${
            isScrolled
              ? "py-3 bg-white/70 dark:bg-charcoal-950/70 backdrop-blur-xl border-charcoal-950/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              : "py-5 bg-white/30 dark:bg-charcoal-950/30 backdrop-blur-md border-white/20 dark:border-white/10"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleScrollTo(e, "#")}
            className="font-display font-extrabold text-xl tracking-[0.25em] text-charcoal-950 dark:text-sand-100 uppercase transition-all duration-300 hover:scale-105"
          >
            Decorle
          </a>

          {/* Desktop Nav Links with Sliding Hover Pill & Active Underline */}
          <div className="hidden md:flex items-center gap-2 relative">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300 z-10 ${
                  activeSection === link.href 
                    ? "text-charcoal-950 dark:text-sand-100" 
                    : "text-charcoal-900/60 dark:text-sand-100/60 hover:text-charcoal-950 dark:hover:text-sand-100"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Hover sliding pill indicator */}
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="hoverPill"
                    className="absolute inset-0 bg-charcoal-950/5 dark:bg-white/5 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Active link underline indicator */}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-1 left-4 right-4 h-[2px] bg-charcoal-950 dark:bg-sand-400 z-20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-charcoal-950/5 dark:hover:bg-white/5 text-charcoal-950 dark:text-sand-100 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <a
              href="https://wa.me/919605389002"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2 bg-charcoal-950 dark:bg-sand-400 dark:text-charcoal-950 hover:bg-charcoal-900 dark:hover:bg-sand-300 text-sand-100 font-sans text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full group"
            >
              Consult Now
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-charcoal-950 dark:text-sand-100 hover:text-sand-600 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-charcoal-950 dark:text-sand-100 hover:text-sand-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-sand-50 dark:bg-charcoal-950 flex flex-col justify-center px-6 md:px-12 py-24 md:hidden"
          >
            <div className="flex flex-col gap-8 items-start">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`font-display text-4xl tracking-wider transition-colors ${
                    activeSection === link.href 
                      ? "text-sand-500 dark:text-sand-400 font-normal" 
                      : "text-charcoal-950 dark:text-sand-100 font-light hover:text-sand-500 dark:hover:text-sand-400"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 w-full"
              >
                <a
                  href="https://wa.me/919605389002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-charcoal-950 dark:bg-sand-400 text-sand-100 dark:text-charcoal-950 font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-full"
                >
                  Consult Now
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
