import { motion, useScroll } from "framer-motion";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

import { useTheme } from "./context/ThemeContext.tsx";

function App() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();

  return (
    <SmoothScroll>
      <div className={`${
        theme === "dark" 
          ? "bg-charcoal-950 text-sand-100 selection:bg-sand-400 selection:text-charcoal-950" 
          : "bg-sand-50 text-charcoal-950 selection:bg-charcoal-950 selection:text-sand-100"
      } min-h-screen font-sans transition-colors duration-500`}>
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className={`fixed top-0 left-0 right-0 h-[3px] origin-left z-[100] pointer-events-none ${
            theme === "dark" ? "bg-sand-400" : "bg-charcoal-950"
          }`}
        />
        <Navbar />
        <Hero />
        <Philosophy />
        <Services />
        <ContactCTA />
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
