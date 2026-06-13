import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Droplet, Shield, Settings, Award, Users, CheckCircle, ArrowRight, Star, HelpCircle, ChevronDown, Check } from 'lucide-react';
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
      <div style={{ transform: "translateZ(25px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

// Scroll Reveal Wrapper
const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// FAQ Accordion Item Component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-blue-50/60 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-3 font-semibold text-slate-800 hover:text-primary transition-colors focus:outline-none"
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
            transition={{ duration: 0.3 }}
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

  // Interactive TDS Calculator State
  const [tdsValue, setTdsValue] = useState(250);
  const [tdsRecommendation, setTdsRecommendation] = useState({
    title: "Seajal UV + UF Purifier",
    desc: "For low TDS municipal water. Provides mineral-rich taste with micro-biological safety without lowering necessary minerals.",
    badge: "Ideal for Municipal Water"
  });

  useEffect(() => {
    if (tdsValue < 300) {
      setTdsRecommendation({
        title: "Seajal Active UV + UF Filtration",
        desc: "Best choice. Municipal tap water contains required minerals; UV/UF kills active pathogents without stripping natural taste.",
        badge: "Low TDS Recommendation"
      });
    } else if (tdsValue >= 300 && tdsValue <= 900) {
      setTdsRecommendation({
        title: "Seajal Zico Cop Alkaline RO+UV",
        desc: "Highly Recommended. Eliminates excess heavy metals, chemicals, and balances pH values to alkaline levels.",
        badge: "Standard RO Fitment"
      });
    } else {
      setTdsRecommendation({
        title: "Seajal Dual Sand Softener + RO Plant",
        desc: "Hardness is extremely high. Requires an ion-exchange Water Softener setup prior to RO purification to prevent Scaling.",
        badge: "Borewell & Hard Water Solution"
      });
    }
  }, [tdsValue]);

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

  // 7 Stages
  const stages = [
    { num: "01", name: "Spun Dust Filter", desc: "Filters physical silt, sand, mud, and rust particles." },
    { num: "02", name: "Pre-Carbon Block", desc: "Extracts volatile organic compounds, bad odor, and chlorine." },
    { num: "03", name: "RO Membrane", desc: "Tackles salts, heavy metals, pesticides, and chemical TDS." },
    { num: "04", name: "UV Disinfection", desc: "Renders active virus strains and harmful bacteria harmless." },
    { num: "05", name: "Active Copper", desc: "Enriches the drinking water with antibacterial copper ions." },
    { num: "06", name: "Bio-Alkaline", desc: "Regulates natural pH values back to a healthy 8.5+ range." },
    { num: "07", name: "Ultra Filtration (UF)", desc: "A final polishing stage ensuring absolute crystal clarity." }
  ];

  return (
    <div className="space-y-28 pb-20 relative bg-slate-50/50">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-sky-50/50 to-white pt-24 pb-48 border-b border-blue-50">
        <BubbleParticles />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-primary">
              <Droplet className="h-4 w-4 text-secondary animate-bounce" /> Pure Water, Pure Living
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Premium Water Solutions for <span className="gradient-text">Your Home & Business</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Seajal Technologies designs state-of-the-art reverse osmosis systems and automated water softeners. Protect your health and machinery with the best water in Pune.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/all-products/1"
                className="gradient-bg hover:opacity-95 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Browse Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => openEnquiry("Custom Project Consultation")}
                className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                Request Consultation
              </button>
            </div>
          </motion.div>

          {/* 3D Tilt Hero Poster */}
          <div className="relative flex justify-center z-10">
            <TiltCard className="w-full max-w-lg">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/hero_banner.jpg"
                  alt="Seajal Pure Splashing Water"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl flex items-center justify-between text-slate-800">
                  <div>
                    <h4 className="font-bold text-slate-900">Crystal Clear Flow</h4>
                    <p className="text-xs text-slate-600">Zero Impurities guaranteed</p>
                  </div>
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg">Pure Standard</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
        <AnimatedWaves />
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 -mt-24">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
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
                <div className="glass p-8 rounded-3xl h-full flex flex-col justify-between border border-blue-50/60 shadow-md">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-sky-50 flex items-center justify-center text-primary shadow-sm border border-sky-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{svc.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                  <button
                    onClick={() => openEnquiry(svc.title)}
                    className="mt-6 text-sm font-bold text-primary flex items-center gap-1.5 hover:underline"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* 7-Stage Purification Interactive Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">7-Stage Seajal Process</h2>
            <p className="text-slate-600">
              How our advanced multi-barrier filtration system guarantees clean and healthy minerals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stg) => (
            <div
              key={stg.num}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-3xl font-extrabold text-blue-200">{stg.num}</span>
                <h4 className="text-base font-bold text-slate-800">{stg.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{stg.desc}</p>
              </div>
              <div className="h-1 bg-sky-100 w-12 rounded-full mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-slate-900 to-sky-950 py-20 text-white overflow-hidden relative">
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
                  className="space-y-2"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-cyan-300 mb-3 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-sky-200 font-semibold">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Water Quality Advisor / TDS Calculator */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Water Quality Advisor</h2>
            <p className="text-slate-600">
              Slide the meter to your input water's approximate TDS level and get instant configuration suggestions.
            </p>
          </div>
        </ScrollReveal>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Slider Controls */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Input TDS Level</span>
              <span className="text-3xl font-extrabold text-primary">{tdsValue} <span className="text-xs text-slate-400">ppm</span></span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="50"
              value={tdsValue}
              onChange={(e) => setTdsValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Municipal (50)</span>
              <span>Standard (500)</span>
              <span>Borewell (1500)</span>
            </div>
          </div>

          {/* Recommendation Output */}
          <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100/60 space-y-4">
            <span className="bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
              {tdsRecommendation.badge}
            </span>
            <h4 className="text-lg font-bold text-slate-900">{tdsRecommendation.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{tdsRecommendation.desc}</p>
            <button
              onClick={() => openEnquiry(`Consultation for TDS ${tdsValue} ppm`)}
              className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
            >
              <span>Ask an expert about this setup</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product) => (
            <TiltCard key={product.id}>
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg flex flex-col h-full justify-between">
                <div>
                  <div className="relative aspect-square w-full bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
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
                  {product.isEcommerce && product.price ? (
                    <div>
                      <span className="text-slate-400 text-xs line-through">₹{product.originalPrice}</span>
                      <p className="text-slate-900 font-extrabold text-lg">₹{product.price}</p>
                    </div>
                  ) : (
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Custom Setup</span>
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
          ))}
        </div>
      </section>

      {/* Founders and Team Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our Founding Team</h2>
            <p className="text-slate-600">
              Guided by technical excellence, our leaders have configured reliable clean water structures for thousands of premises.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <TiltCard key={member.id}>
              <div className="text-center space-y-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
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
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-4">
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

      {/* Latest Blogs Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
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
