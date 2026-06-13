export interface Product {
  id: number;
  name: string;
  slug: string;
  category: 'water-softener' | 'domestic-water-purifier' | 'commercial-ro-water-purifier';
  categoryName: string;
  price?: number;
  originalPrice?: number;
  isEcommerce: boolean;
  image: string;
  features: string[];
  description: string;
  specification: Record<string, string>;
  inStock: boolean;
  hasCOD: boolean;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  category: 'setup' | 'product' | 'showroom';
  image: string;
}

export interface Brochure {
  id: number;
  title: string;
  pdfUrl: string;
  size: string;
  image: string;
}

export const CATEGORIES = [
  { slug: 'water-softener', name: 'Water Softeners' },
  { slug: 'domestic-water-purifier', name: 'Domestic Water Purifiers' },
  { slug: 'commercial-ro-water-purifier', name: 'Commercial RO Water Purifiers' }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Seajal Zico Cop Purifier",
    slug: "zico-cop",
    category: "domestic-water-purifier",
    categoryName: "Domestic Water Purifier",
    price: 15499,
    originalPrice: 18999,
    isEcommerce: true,
    image: "/images/products/zico_cop.jpg",
    description: "Premium copper alkaline water purifier designed for modern kitchens. Delivers mineral-rich, pure drinking water with multi-stage RO+UV+UF+TDS control technology.",
    features: [
      "RO + UV + UF Multi-stage Purification",
      "Active Copper & Alkaline Filter technology",
      "10 Liters high food-grade storage tank",
      "TDS Control Valve for taste adjustment",
      "Sleek visual LED indicator dashboard"
    ],
    specification: {
      "Purification Capacity": "15 Liters per hour",
      "Storage Tank Capacity": "10 Liters",
      "Installation Type": "Wall Mounted / Counter Top",
      "TDS Reduction": "Up to 90%",
      "Filter Lifespan": "6000 Liters"
    },
    inStock: true,
    hasCOD: true
  },
  {
    id: 2,
    name: "Seajal Community Water Softener",
    slug: "aqua-j1-community-softener",
    category: "water-softener",
    categoryName: "Water Softener",
    isEcommerce: false,
    image: "/images/products/community_softener.jpg",
    description: "Industrial-grade community water softener system for large residential complexes, apartments, and commercial facilities. Resolves scaling and hard water concerns completely.",
    features: [
      "High-grade food-safe ion exchange resin",
      "Automatic regeneration control valve",
      "Protects bathroom fittings & appliances from scaling",
      "Improves hair and skin health",
      "Low maintenance salt consumption model"
    ],
    specification: {
      "Flow Rate": "3000 to 5000 Liters/hour",
      "Hardness Reduction": "Up to 800 ppm input",
      "Vessel Type": "FRP Corrosion Resistant Vessel",
      "Control ValveType": "Automatic / Semi-automatic"
    },
    inStock: true,
    hasCOD: false
  },
  {
    id: 3,
    name: "Commercial 25 LPH RO Purifier Plant",
    slug: "25-lph-ro-water-purifier-plant",
    category: "commercial-ro-water-purifier",
    categoryName: "Commercial RO Water Purifier",
    price: 24500,
    originalPrice: 29999,
    isEcommerce: true,
    image: "/images/products/commercial_ro.jpg",
    description: "Robust 25 LPH RO Water Purifier for offices, small clinics, schools, and commercial settings. Built with double membrane technology for superior yield and reliability.",
    features: [
      "Dual high-yield RO membranes",
      "Heavy duty Booster pump",
      "Fully automatic operations",
      "High filtration speed (25 Liters/hour)",
      "Premium stainless steel support frame"
    ],
    specification: {
      "Capacity": "25 LPH (Liters Per Hour)",
      "Membrane Type": "Thin Film Composite (TFC)",
      "Power Input": "230V AC",
      "Weight": "18 Kg"
    },
    inStock: true,
    hasCOD: true
  },
  {
    id: 4,
    name: "Seajal S-Series Sand Filter Softener",
    slug: "aqua-j1-softener-with-sand-filter-s-series",
    category: "water-softener",
    categoryName: "Water Softener",
    isEcommerce: false,
    image: "/images/products/sand_filter_softener.jpg",
    description: "Complete water pretreatment setup featuring a combined multi-port sand filter and soft resin vessel. Ideal for independent villas and small commercial businesses utilizing borewell water.",
    features: [
      "Combined sand filter & softening media",
      "High turbidity removal capacity",
      "Manual multi-port valve for simple backwash",
      "Corrosion-proof fiberglass reinforced vessel"
    ],
    specification: {
      "Capacity": "1000 Liters/hour",
      "Operating Pressure": "2.0 - 3.5 bar",
      "Regeneration frequency": "Weekly"
    },
    inStock: true,
    hasCOD: false
  },
  {
    id: 5,
    name: "Seajal Alkaline Active Plus",
    slug: "aqua-j1-alkaline-active-plus",
    category: "domestic-water-purifier",
    categoryName: "Domestic Water Purifier",
    price: 12499,
    originalPrice: 15999,
    isEcommerce: true,
    image: "/images/products/alkaline_active.jpg",
    description: "Advanced domestic water purifier with customized pH balancing filter to produce alkaline antioxidant water for peak cellular hydration.",
    features: [
      "Bio-Alkaline mineral enhancer cartridge",
      "UV Disinfection chamber",
      "Elegant space-saving design",
      "TDS controller"
    ],
    specification: {
      "pH range": "8.0 - 9.5",
      "Tank Capacity": "8 Liters",
      "TDS reduction": "Up to 90%"
    },
    inStock: true,
    hasCOD: true
  }
];

export const BLOGS: Blog[] = [
  {
    id: 1,
    title: "Best RO Plant Supplier in Pune - Seajal Technologies",
    slug: "ro-plant-supplier-in-pune-aqua-j1-technologies",
    summary: "Finding a reliable RO Plant supplier in Pune can be challenging. Learn why Seajal Technologies stands out as Pune's premier manufacturer and supplier of water purification projects.",
    content: `<p>Water purity is a crucial factor for industrial, commercial, and residential spaces in Pune. Due to rising hard water and TDS levels, standard municipal setups often fall short of delivering pure water. This is where high-quality Reverse Osmosis (RO) plants become essential.</p>
    <h3>Why Choose Seajal Technologies?</h3>
    <p>Seajal Technologies has established itself as the leading RO plant designer and supplier in Pune. Our systems are custom built to handle different water sources including borewell, river, and tanker water.</p>
    <ul>
      <li>High-grade industrial components and pumps.</li>
      <li>Custom capacities ranging from 25 LPH up to 10,000 LPH setups.</li>
      <li>Prompt post-sales service and maintenance contracts.</li>
    </ul>
    <p>Whether you require water setups for an apartment community, school, factory, or corporate complex, our engineering team provides complete site audits, installation, and user training. Reach out today for a custom project quote.</p>`,
    date: "June 10, 2026",
    image: "/images/blogs/ro_plant_pune.jpg",
    author: "Seajal Expert Team"
  },
  {
    id: 2,
    title: "Understand Hard Water & Why You Need a Water Softener",
    slug: "understand-hard-water-benefits-of-softeners",
    summary: "Is hard water damaging your hair, skin, and bathroom pipes? Understand the signs of hard water and how a water softener can save you money.",
    content: `<p>Hard water contains high amounts of dissolved calcium and magnesium. While not directly harmful to health, it creates severe structural issues over time. If you notice white scaling on taps, dry skin, rough hair, or reduced soap lather, hard water is the culprit.</p>
    <h3>How a Water Softener Works</h3>
    <p>Water softeners use an ion exchange process. Hard water passes through a bed of resin beads containing sodium ions. As hard water passes, the calcium and magnesium ions bind to the resin, and sodium ions are released into the water, softening it.</p>
    <p>By investing in a domestic or community softener, you extend the lifetime of washing machines, geysers, and expensive plumbing fixtures by up to 50%.</p>`,
    date: "May 25, 2026",
    image: "/images/blogs/water_softener_guide.jpg",
    author: "Technical Advisor"
  }
];

export const TEAM: TeamMember[] = [
  { id: 1, name: "Mr. Satish Pawar", role: "Founder & Technical Director", image: "/images/team/team_1.jpg" },
  { id: 2, name: "Mrs. Reshma Pawar", role: "Head of Operations", image: "/images/team/team_2.jpg" },
  { id: 3, name: "Mr. Nilesh Kadam", role: "Chief Project Engineer", image: "/images/team/team_3.jpg" }
];

export const GALLERY: GalleryImage[] = [
  { id: 1, title: "Industrial RO Installation - Pune MIDC", category: "setup", image: "/images/gallery/setup_1.jpg" },
  { id: 2, title: "Seajal Flagship Showroom Entrance", category: "showroom", image: "/images/gallery/showroom_1.jpg" },
  { id: 3, title: "Automatic Water Softener Vessel Setup", category: "setup", image: "/images/gallery/setup_2.jpg" },
  { id: 4, title: "Premium Retail Purifier Display", category: "showroom", image: "/images/gallery/showroom_2.jpg" }
];

export const BROCHURES: Brochure[] = [
  {
    id: 1,
    title: "Seajal Product Range Catalog",
    pdfUrl: "https://web.s-cdn.boostkit.dev/webaction-files/5d9b23b3203f191b702ec40f_1570535311/aquaj1-product-range.pdf",
    size: "4.2 MB",
    image: "/images/brochures/catalog_cover.jpg"
  },
  {
    id: 2,
    title: "Water Softener System Pamphlet",
    pdfUrl: "https://web.s-cdn.boostkit.dev/webaction-files/5d9b23b3203f191b702ec40f_1570535311/water-softner-pamplet.pdf",
    size: "1.8 MB",
    image: "/images/brochures/softener_cover.jpg"
  }
];
