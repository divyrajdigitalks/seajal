import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Droplet, Shield, Settings, Award, Users, CheckCircle, ArrowRight, Star, ChevronDown, Check, Info, ShieldAlert, Zap, Heart } from 'lucide-react';
import { PRODUCTS, BLOGS, TEAM } from '../data/db';
import { EnquiryModal } from '../components/EnquiryModal';

// Mouse-tracking 3D Perspective Card Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const x = useMotionValue(150);
  const y = useMotionValue(150);

  const rotateX = useTransform(y, [0, 300], [10, -10]);
  const rotateY = useTransform(x, [0, 300], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set((mouseX / width) * 300);
    y.set((mouseY / height) * 300);
  }

  function handleMouseLeave() {
    x.set(150);
    y.set(150);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-100 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

// Smooth Scroll Reveal Wrapper
const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// FAQ Accordion Item Component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-teal-50/60 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 font-semibold text-slate-800 hover:text-primary transition-colors focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-600 leading-relaxed pt-1 pb-3">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BubbleParticles = () => {
  const [bubbles, setBubbles] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 8}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 8 + 5}s`
    }));
    setBubbles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: b.duration
          }}
        />
      ))}
    </div>
  );
};

const AnimatedWaves = () => (
  <div className="wave-container">
    <svg
      className="wave-svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
      </defs>
      <g className="wave-animated">
        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(248, 250, 252, 0.7)" />
        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(248, 250, 252, 0.5)" />
        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(248, 250, 252, 0.3)" />
        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#f8fafc" />
      </g>
    </svg>
  </div>
);

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [activeStage, setActiveStage] = useState(0);

  const openEnquiry = (productName: string) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  const stats = [
    { value: "15,000+", label: "Happy Customers", icon: Users },
    { value: "500+", label: "Water Projects Completed", icon: Droplet },
    { value: "10+", label: "Years of Excellence", icon: Award },
    { value: "100%", label: "Service Satisfaction", icon: Shield }
  ];

  const services = [
    {
      title: "Commercial Water Treatment",
      desc: "Custom-built large capacity reverse osmosis plants, tailored for hospitals, factories, and residential blocks.",
      icon: Settings
    },
    {
      title: "Industrial Softener Setup",
      desc: "Heavy-duty hardness filtration systems protecting plumbing lines and appliances from severe scaling.",
      icon: Droplet
    },
    {
      title: "Domestic Pure Water Solution",
      desc: "Eco-friendly retail alkaline water purifiers ensuring clean, safe, and delicious drinking water.",
      icon: Shield
    }
  ];

  const benefits = [
    { title: "Free Source Water Audit", desc: "Our engineers visit your site in Pune to check hardness and TDS levels free of cost.", icon: Droplet },
    { title: "Same-Day Dispatch", desc: "Domestic filter installations are completed within 24 hours of booking confirmation.", icon: Zap },
    { title: "Mineral-Guard Tech", desc: "Unlike standard filters, Seajal preserves calcium and magnesium minerals during filtration.", icon: Heart },
    { title: "ISO Certified Build Quality", desc: "All vessels, membranes, and fittings comply with global food-grade safety guidelines.", icon: Shield }
  ];

  const stages = [
    { num: "01", name: "Pre Spun Filter", desc: "Filters physical silt, sand, mud, and rust particles. Acts as the first line of defense to protect sensitive membranes downstream.", icon: Shield },
    { num: "02", name: "Sediment Filter", desc: "Filters fine sediment particles, protecting secondary filtration systems from clogging.", icon: Settings },
    { num: "03", name: "Pre Carbon Filter", desc: "Extracts volatile organic compounds, bad odor, chlorine, and herbicides. Restores natural clean water sweetness.", icon: Settings },
    { num: "04", name: "RO Membrane", desc: "Tackles dissolved salts, heavy metals, arsenic, fluorides, and chemical TDS. Lowers TDS down to safe consumption levels.", icon: Droplet },
    { num: "05", name: "UV", desc: "Renders active virus strains, harmful bacteria, and pathogens harmless by disrupting their cellular DNA.", icon: Shield },
    { num: "06", name: "Copper / Alkaline Filter", desc: "Enriches the drinking water with active copper and zinc ions, and balances pH values to healthy alkaline range.", icon: Award },
    { num: "07", name: "UF Filtration", desc: "A final capillary membrane polishing stage ensuring absolute crystal clarity and trapping suspended particles.", icon: CheckCircle }
  ];

  return (
    <div className="relative bg-[#f8fafc] space-y-6 pb-8">
      {/* Interactive Bright Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50/50 to-white pt-24 pb-32 border-b border-teal-100/50">
        <BubbleParticles />

        {/* Floating gradient orbs for background depth */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-4 py-1.5 text-sm font-bold text-teal-800 border border-teal-200"
            >
              <Droplet className="h-4 w-4 text-teal-600 animate-bounce" /> Pure Water, Pure Living
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Premium Water Purification <br className="hidden lg:block" />
              <span className="gradient-text drop-shadow-sm">Plants & Softeners</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Seajal designs state-of-the-art reverse osmosis systems and automated water softeners. Protect your health and machinery with the best water in Pune.
            </motion.p>

            {/* Live Filtration Loop Visualization inside Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-xl border border-teal-100 p-6 rounded-3xl mt-8 shadow-xl shadow-teal-900/5 max-w-md mx-auto lg:mx-0 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer" />

              <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Live Purification Path
              </h4>

              <div className="flex justify-between items-center gap-2 relative">
                {/* Animated Flowing Line Behind */}
                <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-slate-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                  />
                </div>

                <div className="flex flex-col items-center z-10">
                  <motion.div whileHover={{ scale: 1.1 }} className="h-10 w-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-sm z-10 relative">
                    💧
                  </motion.div>
                  <span className="text-[9px] uppercase font-bold text-slate-500 mt-2 bg-white/80 px-1 rounded">Borewell</span>
                </div>

                <div className="flex flex-col items-center z-10">
                  <motion.div whileHover={{ scale: 1.1 }} className="h-10 w-10 rounded-full bg-teal-50 shadow-md border border-teal-200 flex items-center justify-center text-sm z-10 relative">
                    ⚡
                  </motion.div>
                  <span className="text-[9px] uppercase font-bold text-teal-700 mt-2 bg-white/80 px-1 rounded">RO + UV</span>
                </div>

                <div className="flex flex-col items-center z-10">
                  <motion.div whileHover={{ scale: 1.1 }} className="h-10 w-10 rounded-full bg-emerald-50 shadow-md border border-emerald-200 flex items-center justify-center text-sm z-10 relative">
                    ✨
                  </motion.div>
                  <span className="text-[9px] uppercase font-bold text-emerald-700 mt-2 bg-white/80 px-1 rounded">Mineral</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6"
            >
              <Link
                href="/all-products/1"
                className="gradient-bg text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-teal-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 hover:shadow-xl"
              >
                <span>Browse Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => openEnquiry("Custom Project Consultation")}
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                Request Consultation
              </button>
            </motion.div>
          </motion.div>

          {/* Premium Photo Hero Poster */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center z-10 perspective-1000 mt-10 lg:mt-0"
          >
            <TiltCard className="w-full max-w-lg">
              <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-visible">
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl shadow-teal-900/15 border-8 border-white/80 flex items-center justify-center">
                  <motion.img
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    src="/f9.jpeg"
                    alt="Seajal Premium Purifier"
                    className="w-full h-full object-contain mix-blend-multiply"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x600/transparent/0d9488?text=Pure+Water';
                    }}
                  />
                </div>

                {/* Floating UI Badge 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-8 -left-4 sm:-left-8 glass p-4 rounded-2xl flex items-center gap-4 text-slate-800 shadow-xl border border-white/80 z-20"
                >
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="pr-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">100% Pure</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Zero Impurities</p>
                  </div>
                </motion.div>

                {/* Floating UI Badge 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-12 -right-4 sm:-right-8 glass p-4 rounded-2xl flex items-center gap-3 text-slate-800 shadow-xl border border-white/80 z-20"
                >
                  <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
                    <Droplet className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="pr-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">Mineral Rich</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Alkaline Boosted</p>
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What We Do</h2>
            <p className="text-slate-600">
              We offer specialized water filtration and softening services configured by highly experienced design engineers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <TiltCard key={svc.title} className="h-full">
                <div className="glass p-8 rounded-3xl h-full flex flex-col justify-between border border-teal-50/60 shadow-md">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-primary shadow-sm border border-teal-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{svc.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                  <button
                    onClick={() => openEnquiry(svc.title)}
                    className="mt-6 text-sm font-bold text-primary flex items-center gap-1.5 hover:underline"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* 7-Stage Purification Interactive Console Dashboard */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">7-Stage Seajal purifier Process</h2>
            <p className="text-slate-600">
              Click on each filtration layer to explore the scientific diagnostics inside our smart purifiers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Stage list controller */}
          <div className="lg:col-span-1 space-y-2">
            {stages.map((stg, index) => {
              const isActive = index === activeStage;
              return (
                <button
                  key={stg.num}
                  onClick={() => setActiveStage(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left focus:outline-none ${isActive
                    ? 'bg-primary text-white border-primary shadow-lg shadow-teal-500/10 scale-102 font-bold'
                    : 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50'
                    }`}
                >
                  <span className={`text-lg font-black ${isActive ? 'text-teal-200' : 'text-slate-300'}`}>{stg.num}</span>
                  <span className="text-sm">{stg.name}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Console display */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: 20, rotateY: -5 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -20, rotateY: 5 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6 relative overflow-hidden"
              >
                {/* Background water droplet icon outline */}
                <div className="absolute right-4 bottom-4 text-slate-50/60 pointer-events-none">
                  <Droplet className="h-40 w-40 fill-current" />
                </div>

                <span className="text-sm font-bold uppercase tracking-widest text-primary">Stage Diagnostic {stages[activeStage].num}</span>

                <h3 className="text-2xl font-black text-slate-900">{stages[activeStage].name}</h3>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{stages[activeStage].desc}</p>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    <CheckCircle className="h-4 w-4" /> Active Pure
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                    <Info className="h-4 w-4" /> Certified Grade
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Stats Section with proper visual separation */}
      <section className="bg-gradient-to-r from-[#082f49] to-[#0f766e] py-10 my-8 text-white overflow-hidden relative shadow-2xl">
        <BubbleParticles />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="space-y-3 py-4"
                >
                  <div className="mx-auto h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-teal-300 mb-3 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-4xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-teal-100 font-bold">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seajal Quality Benefits Checklist */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full">
              Seajal Safeguards
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Why Prefers Seajal</h2>
            <p className="text-slate-600">
              High-end build components designed by design engineers for domestic and industrial water treatment.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                key={b.title}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:border-primary/20 transition-all flex flex-col justify-between hover-card-trigger"
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base">{b.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* About Seajal Section */}
      {/* <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">About Seajal</h2>
            <div className="text-left space-y-4 mt-8">
              <p className="text-slate-600 leading-relaxed text-lg">
                Seajal has spent over a decade leading the water purification market in India. Originally founded in PCMC, Pune, our dedication is to bring high-quality, pure water solutions directly to families and industries.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Our systems utilize advanced reverse osmosis, ultra-filtration, and ion-exchange softening resin to balance TDS, hardness, and minerals. From individual kitchens to housing complex communities and MIDC industries, we construct, supply, and support custom systems.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section> */}



      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Featured Products</h2>
              <p className="text-slate-600">Explore our premium range of commercial and household filters.</p>
            </div>
            <Link
              href="/all-products/1"
              className="text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS.slice(0, 3).map((product) => (
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} key={product.id}>
              <TiltCard>
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg flex flex-col h-full justify-between hover-card-trigger">
                  <div>
                    <div className="relative h-64 w-full bg-white flex items-center justify-center overflow-hidden p-6 border-b border-slate-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/400x400?text=Seajal';
                        }}
                      />
                      {product.isEcommerce && (
                        <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                          COD Available
                        </span>
                      )}
                    </div>
                    <div className="p-6 space-y-2">
                      <span className="text-xs font-bold text-secondary uppercase tracking-widest">{product.categoryName}</span>
                      <h3 className="text-lg font-bold text-slate-900 truncate">
                        <Link href={`/products/${product.slug}/${product.id}`} className="hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between gap-4 mt-auto">
                    {product.price ? (
                      <div className="flex flex-col">
                        <span className="text-slate-950 font-bold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-slate-400 text-xs line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Get Quote</span>
                    )}
                    <Link
                      href={`/products/${product.slug}/${product.id}`}
                      className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Founders and Team Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our Founding Team</h2>
            <p className="text-slate-600">
              Guided by technical excellence, our leaders have configured reliable clean water structures for thousands of premises.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {TEAM.map((member) => (
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} key={member.id}>
              <TiltCard>
                <div className="text-center space-y-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full hover-card-trigger">
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/150x150?text=' + member.name.charAt(0);
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                    <p className="text-sm text-secondary font-medium">{member.role}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="text-center space-y-4 mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Common Questions</h2>
            <p className="text-slate-600">Find answers to water softener installation, maintenance, and filter life.</p>
          </div>
        </ScrollReveal>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-2">
          <FAQItem
            question="How often does a Seajal water softener require resin regeneration?"
            answer="Resin regeneration depends on hardness levels and water consumption. For average hard water (400-600 ppm) in Pune housing societies, regeneration is recommended weekly or semi-weekly."
          />
          <FAQItem
            question="What is the difference between active copper and alkaline filters?"
            answer="An active copper filter introduces small mineral copper ions that act as antibacterial agents. An alkaline filter increases pH values, neutralizing acidity in tap water for better cell absorption."
          />
          <FAQItem
            question="Do you offer installation services outside of Pune?"
            answer="We primarily support Pune, Pimpri Chinchwad, Wakad, Hinjawadi, and nearby industrial zones. However, custom commercial RO plants can be supplied across Maharashtra."
          />
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-white py-8 border-y border-slate-100 shadow-sm my-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What Our Clients Say</h2>
            </div>
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } }, hidden: {} }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <TiltCard>
                <div className="glass p-8 rounded-3xl h-full flex flex-col justify-between border border-teal-50/60 shadow-md bg-slate-50/50 hover-card-trigger">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-amber-400 mb-4">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <p className="text-slate-700 italic leading-relaxed text-lg">
                      "We installed the Seajal Community Softener in our housing society in Thergaon. The hardness levels dropped from 600 ppm to 40 ppm, resolving scale issues completely. Their technicians are highly professional!"
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">HM</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Hrishikesh Mankar</h4>
                      <p className="text-sm text-slate-500">Secretary, Ganga Asiayana Society</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <TiltCard>
                <div className="glass p-8 rounded-3xl h-full flex flex-col justify-between border border-teal-50/60 shadow-md bg-slate-50/50 hover-card-trigger">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-amber-400 mb-4">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <p className="text-slate-700 italic leading-relaxed text-lg">
                      "We have been using Seajal Commercial 25 LPH Purifiers in our software development office in Hinjawadi for 2 years. Excellent taste, absolute reliability, and prompt routine filter replacement service."
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">SA</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Sagar Ahir</h4>
                      <p className="text-sm text-slate-500">Admin Lead</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Latest Blogs Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Latest Updates</h2>
            <p className="text-slate-600">Read the latest articles on water treatment projects, systems, and guidelines.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOGS.map((blog) => (
            <TiltCard key={blog.id}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col md:flex-row gap-6 p-6 h-full">
                <div className="md:w-1/3 aspect-video md:aspect-square bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/200x200?text=Seajal';
                    }}
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{blog.date}</span>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                      <Link href={`/latest-update/${blog.slug}/${blog.id}`} className="hover:text-primary transition-colors">
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2">{blog.summary}</p>
                  </div>
                  <Link
                    href={`/latest-update/${blog.slug}/${blog.id}`}
                    className="mt-4 text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName={selectedProduct} />
    </div>
  );
}
