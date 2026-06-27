import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext.tsx";

export default function Philosophy() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation for the image
  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Horizontal slide-out animation for the dark cover overlay panel
  const coverWidth = useTransform(scrollYProgress, [0.15, 0.45], ["100%", "0%"]);

  // Staggered text reveals on scroll
  const textOpacity1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const textY1 = useTransform(scrollYProgress, [0.1, 0.3], [60, 0]);

  const textOpacity2 = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const textY2 = useTransform(scrollYProgress, [0.25, 0.45], [60, 0]);

  const textOpacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const textY3 = useTransform(scrollYProgress, [0.4, 0.6], [60, 0]);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className={`relative min-h-screen w-full py-24 md:py-36 flex items-center overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-charcoal-950 text-sand-100" : "bg-sand-100 text-charcoal-950"
      }`}
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left Column: Massive Typography */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          <motion.div
            style={{ opacity: textOpacity1, y: textY1 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className={`w-8 h-[1px] ${theme === "dark" ? "bg-sand-400" : "bg-sand-600"}`} />
            <p className={`font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              Our Philosophy
            </p>
          </motion.div>

          <motion.h2
            style={{ opacity: textOpacity2, y: textY2 }}
            className={`font-display font-semibold text-4xl md:text-6xl tracking-tight leading-[1.1] mb-8 ${
              theme === "dark" ? "text-sand-100" : "text-charcoal-950"
            }`}
          >
            Slowing down to see the poetry in architecture.
          </motion.h2>

          <motion.div
            style={{ opacity: textOpacity3, y: textY3 }}
            className={`flex flex-col gap-6 font-sans font-normal text-base md:text-lg leading-relaxed max-w-xl ${
              theme === "dark" ? "text-sand-300/80" : "text-charcoal-900"
            }`}
          >
            <p>
              We believe a home is a silent mirror of the soul. We reject temporary trends 
              in favor of high-end minimalist sanctuaries that breathe luxury, craftsmanship, 
              and sensory calm.
            </p>
            <p>
              Every material selection, textured plaster stroke, and custom wood joinery is 
              approached with a deep respect for physical touch, alignment, and natural lighting. 
              Decorle is the intersection of architecture, craft, and emotion.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Parallax Image Reveal */}
        <div className={`lg:col-span-5 relative w-full h-[50vh] lg:h-[70vh] overflow-hidden border transition-colors duration-500 ${
          theme === "dark" ? "bg-charcoal-900 border-white/5" : "bg-sand-200 border-charcoal-950/5"
        }`}>
          {/* Parallax Image */}
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <img
              src="/philosophy_interior.png"
              alt="Bespoke Luxury Interior Lounge Design"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Cover panel that slides out of the way on scroll */}
          <motion.div
            style={{ width: coverWidth }}
            className={`absolute top-0 right-0 h-full z-10 transition-colors duration-500 ${
              theme === "dark" ? "bg-charcoal-950" : "bg-sand-100"
            }`}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Elegant structural border highlight */}
          <div className={`absolute inset-0 border pointer-events-none z-20 transition-colors duration-500 ${
            theme === "dark" ? "border-sand-400/10" : "border-charcoal-950/10"
          }`} />
        </div>
      </div>
    </section>
  );
}
