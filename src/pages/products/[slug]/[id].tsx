import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Shield, CheckCircle, Info, ChevronRight, Check, ChevronDown } from 'lucide-react';
import { PRODUCTS, Product } from '../../../data/db';
import { EnquiryModal } from '../../../components/EnquiryModal';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 flex items-center gap-1">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/all-products/1" className="hover:text-primary transition-colors">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* Main product view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[400px] sm:h-[500px] w-full bg-white rounded-2xl overflow-hidden border border-slate-50 flex items-center justify-center p-8 group cursor-crosshair"
        >
          <motion.img
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-md"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600?text=Seajal' }}
          />
        </motion.div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <span className="bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.categoryName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{product.name}</h1>
            {product.price && (
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">Water Solution Inquiry</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                This system is customized depending on source water hardness, capacity needs, and site space. Submit an enquiry for configurations.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Description</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setModalOpen(true)}
                className="w-full gradient-bg text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Get Quote</span>
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/917770018181?text=Hi%20Aqua%20J1,%20I%20am%20interested%20in%20inquiring%20about%20${encodeURIComponent(product.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-center"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.116-2.905-6.993C16.255 1.87 13.78 1.843 11.47 1.843c-5.437 0-9.861 4.421-9.865 9.864 0 1.63.499 3.224 1.453 4.825L1.96 20.89l4.687-1.736zm10.413-6.205c-.308-.154-1.82-.9-2.1-.1-.281.1-.56.415-.688.563-.127.147-.255.166-.563.011-.307-.154-1.3-.478-2.477-1.53-.914-.816-1.53-1.824-1.71-2.131-.18-.308-.02-.475.134-.628.14-.137.308-.36.462-.54.153-.18.205-.308.308-.513.102-.206.051-.385-.026-.54-.077-.154-.688-1.657-.943-2.27-.248-.598-.5-.517-.688-.527-.178-.008-.383-.01-.587-.01-.205 0-.537.077-.819.385-.282.308-1.077 1.05-1.077 2.562 0 1.514 1.102 2.977 1.254 3.182.154.205 2.169 3.313 5.256 4.646.734.317 1.307.506 1.753.648.737.234 1.408.201 1.94.122.592-.087 1.82-.743 2.076-1.46.256-.718.256-1.334.18-1.46-.077-.128-.282-.205-.59-.359z" />
                </svg>
                <span>WhatsApp Quote</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Specs & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Features list */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-2">Key Features</h3>
          <ul className="space-y-2.5">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications Accordion */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4 self-start">
          <button 
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full flex justify-between items-center text-lg font-bold text-slate-900 border-b border-slate-50 pb-2 focus:outline-none"
          >
            <span>Technical Specifications</span>
            <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${specsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {specsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(product.specification).map(([key, value]) => (
                        <tr key={key} className="border-b border-slate-100 last:border-b-0">
                          <td className="py-2.5 font-semibold text-slate-500 w-1/2">{key}</td>
                          <td className="py-2.5 text-slate-800">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Related Products</h3>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {relatedProducts.map((p) => (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 w-full bg-white flex items-center justify-center overflow-hidden p-4 border-b border-slate-50">
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400?text=Seajal' }} />
                  </div>
                  <div className="p-5 space-y-1">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{p.categoryName}</span>
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      <Link href={`/products/${p.slug}/${p.id}`} className="hover:text-primary">
                        {p.name}
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between gap-4">
                  {p.price ? (
                    <div className="flex flex-col">
                      <span className="text-slate-950 font-bold text-sm">₹{p.price.toLocaleString('en-IN')}</span>
                      {p.originalPrice && (
                        <span className="text-slate-400 text-[10px] line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs font-semibold uppercase">Get Quote</span>
                  )}
                  <Link href={`/products/${p.slug}/${p.id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold px-3 py-2 rounded-lg transition-all">
                    View Specs
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={product.name}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PRODUCTS.map((product) => ({
    params: { slug: product.slug, id: String(product.id) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id);
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return { notFound: true };
  }

  // Find related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return {
    props: {
      product,
      relatedProducts,
    },
  };
};
