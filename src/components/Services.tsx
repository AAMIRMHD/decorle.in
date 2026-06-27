import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext.tsx";

interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    tag: "01 / BESPOKE SEATING",
    title: "Customised Sofa Design",
    description:
      "Handcrafted, ergonomically tailored sofas designed to fit your room's precise dimensions. We select luxury textiles, custom cushioning, and solid wood frames.",
    image: "/service_sofa.png",
    features: [
      "Bespoke Dimensional Scaling",
      "Premium Leather & Fabric curation",
      "Solid Hardwood Internal Frames",
      "Ergonomic Foam & Feather fills",
    ],
  },
  {
    id: "02",
    tag: "02 / ARCHITECTURAL CREATION",
    title: "Premium Interior Design & Execution",
    description:
      "End-to-end turnkey architectural interiors. From spatial planning and 3D visual renders to meticulous material curation, project management, and final execution.",
    image: "/service_bedroom.png",
    features: [
      "Full Turnkey Execution",
      "3D Spatial Renders & Planning",
      "Material Sourcing & Quality Control",
      "Lighting & Acoustic Engineering",
    ],
  },
  {
    id: "03",
    tag: "03 / EXQUISITE DETAIL",
    title: "Custom Home Essentials Crafting",
    description:
      "Bespoke wood styling, custom-designed loose furniture, minimal kitchen cabinetry, built-in wardrobes, and unique decor pieces tailored exactly to your layout.",
    image: "/service_tv_room.png",
    features: [
      "Bespoke Modular Kitchens",
      "Handcrafted Hardwood Furniture",
      "Custom Wardrobes & Storage Syst.",
      "Unique Decorative Accessories",
    ],
  },
];

export default function Services() {
  const { theme } = useTheme();

  return (
    <section 
      id="services" 
      className={`relative py-24 md:py-36 transition-colors duration-500 ${
        theme === "dark" ? "bg-charcoal-950" : "bg-sand-50"
      }`}
    >
      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div className="flex items-center gap-2 mb-6">
          <span className={`w-8 h-[1px] ${theme === "dark" ? "bg-sand-400" : "bg-sand-600"}`} />
          <p className={`font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase ${
            theme === "dark" ? "text-sand-400" : "text-sand-600"
          }`}>
            What We Do
          </p>
        </div>
        <h2 className={`font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl leading-[1.1] ${
          theme === "dark" ? "text-sand-100" : "text-charcoal-950"
        }`}>
          We compose spatial experiences.
        </h2>
      </div>

      {/* Services Sticky Stack */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24 relative">
        {servicesData.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  // Track the scroll of this specific card relative to the top of the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Scale down and dim the card as it starts scrolling off/getting stacked over
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);

  return (
    <div
      ref={cardRef}
      className="sticky top-[12vh] h-[78vh] md:h-[70vh] lg:h-[75vh] w-full flex items-center justify-center mb-[10vh]"
    >
      <motion.div
        style={{
          scale,
          opacity,
          zIndex: index + 1,
        }}
        className={`w-full h-full border rounded-none overflow-hidden flex flex-col lg:grid lg:grid-cols-12 transition-all duration-500 ${
          theme === "dark"
            ? "bg-charcoal-900 border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            : "bg-white border-charcoal-950/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
        }`}
      >
        {/* Left Side: Information */}
        <div className={`order-2 lg:order-1 lg:col-span-7 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between h-[52%] lg:h-full bg-gradient-to-br transition-all duration-500 ${
          theme === "dark" 
            ? "from-charcoal-900 to-charcoal-950" 
            : "from-white to-sand-50/20"
        }`}>
          <div>
            <span className={`font-sans text-xs font-bold tracking-[0.2em] block mb-6 ${
              theme === "dark" ? "text-sand-400" : "text-sand-600"
            }`}>
              {service.tag}
            </span>
            <h3 className={`font-display font-semibold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-6 ${
              theme === "dark" ? "text-sand-100" : "text-charcoal-950"
            }`}>
              {service.title}
            </h3>
            <p className={`font-sans font-normal text-sm md:text-base leading-relaxed max-w-xl mb-8 ${
              theme === "dark" ? "text-sand-300/80" : "text-charcoal-900"
            }`}>
              {service.description}
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className={`w-1 h-1 rounded-full ${
                    theme === "dark" ? "bg-sand-400/50" : "bg-sand-600"
                  }`} />
                  <span className={`font-sans text-xs md:text-sm font-normal ${
                    theme === "dark" ? "text-sand-300/60" : "text-charcoal-900"
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-8 pt-6 border-t flex items-center justify-between ${
            theme === "dark" ? "border-white/5" : "border-charcoal-950/5"
          }`}>
            <a
              href="https://wa.me/919605389002"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase transition-colors ${
                theme === "dark" ? "text-sand-400 hover:text-sand-100" : "text-sand-600 hover:text-charcoal-950"
              }`}
            >
              Discuss Project
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className={`font-display text-4xl font-extralight ${
              theme === "dark" ? "text-sand-200/10" : "text-charcoal-950/5"
            }`}>
              {service.id}
            </span>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className={`order-1 lg:order-2 lg:col-span-5 relative h-[48%] lg:h-full w-full overflow-hidden block ${
          theme === "dark" ? "bg-charcoal-950" : "bg-sand-200"
        }`}>
          <motion.img
            initial={{ scale: 1.05 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient vignette */}
          <div className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r pointer-events-none ${
            theme === "dark"
              ? "from-charcoal-900/40 via-transparent to-transparent"
              : "from-white/40 via-transparent to-transparent"
          }`} />
        </div>
      </motion.div>
    </div>
  );
}
