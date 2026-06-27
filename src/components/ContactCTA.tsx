import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext.tsx";

// Custom SVG Instagram Icon to bypass registry dependencies
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function MagneticButton({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const { theme } = useTheme();
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Pull factor (0.3)
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.1 }}
      className={`inline-flex items-center justify-center w-52 h-52 md:w-64 md:h-64 rounded-full border text-center font-sans text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-500 cursor-pointer ${
        theme === "dark" 
          ? "border-sand-400 bg-sand-400 text-charcoal-950 hover:bg-transparent hover:text-sand-100 shadow-[0_10px_40px_-20px_rgba(197,168,128,0.4)]" 
          : "border-charcoal-950 bg-charcoal-950 text-sand-100 hover:bg-transparent hover:text-charcoal-950 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]"
      }`}
    >
      {children}
    </motion.a>
  );
}

export default function ContactCTA() {
  const { theme } = useTheme();
  const email = "decorle.in@gmail.com";
  const instagram = "https://www.instagram.com/decorle.in/";
  const phone = "+91 9605389002";
  const whatsapp = "https://wa.me/919605389002";

  return (
    <section
      id="contact"
      className={`relative min-h-screen w-full py-24 md:py-36 border-t flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-charcoal-950 border-white/5" : "bg-sand-100 border-charcoal-950/5"
      }`}
    >
      {/* Dynamic Background Gradients */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${
        theme === "dark" ? "bg-sand-400/5" : "bg-sand-400/10"
      }`} />

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center items-center relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-sand-400" : "bg-sand-600"}`} />
            <p className={`font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              Begin Your Journey
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className={`font-display font-semibold text-5xl md:text-8xl tracking-tight leading-none mb-16 uppercase ${
              theme === "dark" ? "text-sand-100" : "text-charcoal-950"
            }`}
          >
            Let’s build <br />
            <span className={`font-sans font-bold italic ${theme === "dark" ? "text-sand-400" : "text-sand-600"}`}>together.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-16 md:mb-24"
          >
            <MagneticButton href={whatsapp}>
              <div className="flex flex-col items-center gap-1">
                <span>Get a Quote</span>
                <ArrowUpRight className="w-5 h-5 mt-1" />
              </div>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t transition-colors duration-500 ${
          theme === "dark" ? "border-white/5" : "border-charcoal-950/5"
        }`}>
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className={`group flex flex-col p-6 border transition-all duration-500 ${
              theme === "dark" 
                ? "bg-charcoal-900 border-white/5 hover:border-sand-400/30 shadow-none" 
                : "bg-white border-charcoal-950/5 hover:border-charcoal-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-charcoal-950 text-sand-400 group-hover:text-sand-100" 
                  : "bg-sand-100 text-charcoal-950 group-hover:bg-charcoal-950 group-hover:text-sand-100"
              }`}>
                <Mail className="w-5 h-5" />
              </div>
              <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${
                theme === "dark" ? "text-sand-300/20 group-hover:text-sand-400" : "text-charcoal-950/20 group-hover:text-charcoal-950"
              }`} />
            </div>
            <span className={`font-sans text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              Email Us
            </span>
            <span className={`font-sans text-sm md:text-base font-semibold ${
              theme === "dark" ? "text-sand-100" : "text-charcoal-950"
            }`}>
              {email}
            </span>
          </a>

          {/* Call / WhatsApp */}
          <a
            href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
            className={`group flex flex-col p-6 border transition-all duration-500 ${
              theme === "dark" 
                ? "bg-charcoal-900 border-white/5 hover:border-sand-400/30 shadow-none" 
                : "bg-white border-charcoal-950/5 hover:border-charcoal-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-charcoal-950 text-sand-400 group-hover:text-sand-100" 
                  : "bg-sand-100 text-charcoal-950 group-hover:bg-charcoal-950 group-hover:text-sand-100"
              }`}>
                <MessageSquare className="w-5 h-5" />
              </div>
              <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${
                theme === "dark" ? "text-sand-300/20 group-hover:text-sand-400" : "text-charcoal-950/20 group-hover:text-charcoal-950"
              }`} />
            </div>
            <span className={`font-sans text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              Call or WhatsApp
            </span>
            <span className={`font-sans text-sm md:text-base font-semibold ${
              theme === "dark" ? "text-sand-100" : "text-charcoal-950"
            }`}>
              {phone}
            </span>
          </a>

          {/* Instagram */}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col p-6 border transition-all duration-500 ${
              theme === "dark" 
                ? "bg-charcoal-900 border-white/5 hover:border-sand-400/30 shadow-none" 
                : "bg-white border-charcoal-950/5 hover:border-charcoal-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-charcoal-950 text-sand-400 group-hover:text-sand-100" 
                  : "bg-sand-100 text-charcoal-950 group-hover:bg-charcoal-950 group-hover:text-sand-100"
              }`}>
                <InstagramIcon className="w-5 h-5" />
              </div>
              <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${
                theme === "dark" ? "text-sand-300/20 group-hover:text-sand-400" : "text-charcoal-950/20 group-hover:text-charcoal-950"
              }`} />
            </div>
            <span className={`font-sans text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              Follow Us
            </span>
            <span className={`font-sans text-sm md:text-base font-semibold ${
              theme === "dark" ? "text-sand-100" : "text-charcoal-950"
            }`}>
              @decorle.in
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
