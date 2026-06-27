import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext.tsx";

export default function Hero() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const numFrames = 240;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images asynchronously on mount
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImages = async () => {
      const promises = Array.from({ length: numFrames }, (_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const frameNum = String(i + 1).padStart(3, "0");
          img.src = `/hero/ezgif-frame-${frameNum}.png`;
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / numFrames) * 100));
            resolve();
          };
          img.onerror = () => {
            resolve(); // Resolve silently on error to prevent complete freeze
          };
          loadedImages[i] = img;
        });
      });

      await Promise.all(promises);
      imagesRef.current = loadedImages;
      setImagesLoaded(true);
      
      // Delay slightly for premium feeling before fading loader out
      setTimeout(() => {
        setLoadingComplete(true);
      }, 500);
    };

    loadImages();
  }, []);

  // Track scroll position of the 400vh hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to frame index (1 to 240)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, numFrames]);

  // Helper function to draw a frame to the canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imgList = imagesRef.current;
    if (imgList.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgList[index];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let drawX = 0;
      let drawY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        drawX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        drawY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }
  };

  // Re-draw when scroll position updates
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!imagesLoaded) return;
    const index = Math.min(numFrames - 1, Math.max(0, Math.floor(latest) - 1));
    drawFrame(index);
  });

  // Handle canvas sizing and initial frame rendering
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Draw first or current frame on resize
      if (imagesLoaded && imagesRef.current.length > 0) {
        const index = Math.min(numFrames - 1, Math.max(0, Math.floor(frameIndex.get()) - 1));
        drawFrame(index);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  // Initial draw when preloading completes
  useEffect(() => {
    if (loadingComplete) {
      drawFrame(0);
    }
  }, [loadingComplete]);

  // Scroll animations for Slide 1 (Intro)
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.22], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.22], [0, 0, -40, -40]);
  const display1 = useTransform(scrollYProgress, [0, 0.22], ["flex", "none"]);

  // Scroll animations for Slide 2 (Feature 1)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.48], [40, 0, 0, -40]);
  const display2 = useTransform(scrollYProgress, [0.18, 0.22, 0.48, 0.52], ["none", "flex", "flex", "none"]);

  // Scroll animations for Slide 3 (Feature 2)
  const opacity3 = useTransform(scrollYProgress, [0.48, 0.54, 0.68, 0.74], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.54, 0.68, 0.74], [40, 0, 0, -40]);
  const display3 = useTransform(scrollYProgress, [0.44, 0.48, 0.74, 0.78], ["none", "flex", "flex", "none"]);

  // Scroll animations for Slide 4 (Feature 3)
  const opacity4 = useTransform(scrollYProgress, [0.74, 0.80, 0.94, 0.98], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.74, 0.80, 0.94, 0.98], [40, 0, 0, -40]);
  const display4 = useTransform(scrollYProgress, [0.70, 0.74, 1.0], ["none", "flex", "flex"]);

  const handleScrollDown = () => {
    const philosophySection = document.querySelector("#philosophy");
    if (philosophySection) {
      philosophySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {!loadingComplete && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sand-50 text-charcoal-950"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <span className="font-display text-4xl font-bold tracking-[0.25em] uppercase text-charcoal-950">
                Decorle
              </span>
              <div className="w-48 h-[1px] bg-charcoal-950/10 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-charcoal-950"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section ref={containerRef} className="relative w-full transition-colors duration-500 bg-sand-50 dark:bg-charcoal-950" style={{ height: "400vh" }}>
        {/* Sticky viewport container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Canvas Rendering Area */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover opacity-100" 
            style={{ imageRendering: "-webkit-optimize-contrast" }}
          />

          {/* Vignette Overlay: Soft gradient bottom to blend canvas in */}
          <div className="absolute inset-0 bg-gradient-to-t from-sand-50 dark:from-charcoal-950 via-transparent to-transparent opacity-50 pointer-events-none" />

          {/* Texts Layers */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 h-full flex items-center justify-start pointer-events-none">
            {/* Slide 1: Intro (Left Aligned Transparent Card) */}
            <motion.div
              style={{ opacity: opacity1, y: y1, display: display1 }}
              className="absolute left-6 md:left-12 max-w-2xl flex flex-col items-start text-left"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-sand-400" : "bg-sand-600"}`} />
                <p className={`font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase ${
                  theme === "dark" ? "text-sand-400" : "text-sand-600"
                }`}>
                  Decorle Spaces
                </p>
              </div>
              <h1 className={`font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] ${
                theme === "dark" ? "text-white" : "text-charcoal-950"
              }`}>
                Sculpting Spaces, <br />
                Elevating Lifestyles.
              </h1>
              <p className={`font-sans font-semibold text-sm md:text-lg max-w-xl mt-6 leading-relaxed ${
                theme === "dark" ? "text-sand-100" : "text-charcoal-900"
              }`}>
                Scroll down to enter our digital sensory experience and explore how we shape 
                matter, light, and geometry.
              </p>
            </motion.div>

            {/* Slide 2: Turnkey Execution (Right Aligned Transparent Card) */}
            <motion.div
              style={{ opacity: opacity2, y: y2, display: display2 }}
              className="absolute right-6 md:right-12 max-w-xl flex flex-col items-end text-right"
            >
              <span className={`font-sans text-xs font-bold tracking-[0.2em] block mb-4 ${
                theme === "dark" ? "text-sand-400" : "text-sand-600"
              }`}>
                01 / ARCHITECTURAL INTEGRITY
              </span>
              <h2 className={`font-display font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-4 ${
                theme === "dark" ? "text-white" : "text-charcoal-950"
              }`}>
                Turnkey Execution
              </h2>
              <p className={`font-sans font-semibold text-sm md:text-base leading-relaxed max-w-md ${
                theme === "dark" ? "text-sand-100" : "text-charcoal-900"
              }`}>
                We handle the entire journey: from initial spatial planning and 3D renders to 
                on-site coordination, technical drafting, and the final structural reveal.
              </p>
            </motion.div>

            {/* Slide 3: Artisan Plasters (Left Aligned Transparent Card) */}
            <motion.div
              style={{ opacity: opacity3, y: y3, display: display3 }}
              className="absolute left-6 md:left-12 max-w-xl flex flex-col items-start text-left"
            >
              <span className={`font-sans text-xs font-bold tracking-[0.2em] block mb-4 ${
                theme === "dark" ? "text-sand-400" : "text-sand-600"
              }`}>
                02 / THE TACTILE CANVAS
              </span>
              <h2 className={`font-display font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-4 ${
                theme === "dark" ? "text-white" : "text-charcoal-950"
              }`}>
                Artisan Finishes
              </h2>
              <p className={`font-sans font-semibold text-sm md:text-base leading-relaxed max-w-md ${
                theme === "dark" ? "text-sand-100" : "text-charcoal-900"
              }`}>
                Walls should not be silent. Our custom painting, lime plasters, and microcement 
                overlays absorb and reflect natural daylight, bringing emotional warmth.
              </p>
            </motion.div>

            {/* Slide 4: Custom Furniture (Right Aligned Transparent Card) */}
            <motion.div
              style={{ opacity: opacity4, y: y4, display: display4 }}
              className="absolute right-6 md:right-12 max-w-xl flex flex-col items-end text-right"
            >
              <span className={`font-sans text-xs font-bold tracking-[0.2em] block mb-4 ${
                theme === "dark" ? "text-sand-400" : "text-sand-600"
              }`}>
                03 / BESPOKE TAILORING
              </span>
              <h2 className={`font-display font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-4 ${
                theme === "dark" ? "text-white" : "text-charcoal-950"
              }`}>
                Custom Essentials
              </h2>
              <p className={`font-sans font-semibold text-sm md:text-base leading-relaxed max-w-md mb-6 ${
                theme === "dark" ? "text-sand-100" : "text-charcoal-900"
              }`}>
                Modular kitchens, loose wood credenzas, wardrobes, and minimalist details 
                crafted specifically for your project's physical proportions.
              </p>
              <button
                onClick={handleScrollDown}
                className={`group flex items-center gap-2 px-5 py-2.5 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer rounded-full ${
                  theme === "dark" 
                    ? "bg-sand-400 hover:bg-sand-100 text-charcoal-950" 
                    : "bg-charcoal-950 hover:bg-charcoal-900 text-sand-100"
                }`}
              >
                Explore Philosophy
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* Persistent Scroll Down Indicator (Only on Slide 1) */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
          >
            <button
              onClick={handleScrollDown}
              className="group flex flex-col items-center gap-4 text-sand-300 hover:text-sand-100 transition-colors duration-300"
              aria-label="Scroll to exploration"
            >
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-sand-300/60 group-hover:text-sand-400 transition-colors">
                Scroll
              </span>
              <motion.div
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="p-1.5 border border-sand-400/20 rounded-full group-hover:border-sand-400/50 transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5 text-sand-400" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
