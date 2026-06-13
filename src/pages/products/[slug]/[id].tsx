import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, MessageSquare, Shield, CheckCircle, Info, ChevronRight, Check } from 'lucide-react';
import { PRODUCTS, Product } from '../../../data/db';
import { useCart } from '../../../context/CartContext';
import { EnquiryModal } from '../../../components/EnquiryModal';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [addedAlert, setAddedAlert] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/cart');
  };

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
        <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600?text=AquaJ1' }}
          />
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <span className="bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.categoryName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{product.name}</h1>
          </div>

          {/* Pricing & Stock indicators (Retail Model) */}
          {product.isEcommerce && product.price ? (
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-slate-400 line-through text-lg">₹{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="text-emerald-500 font-semibold text-sm">
                    ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1 text-emerald-600">
                  <Check className="h-4 w-4" /> In Stock
                </span>
                {product.hasCOD && (
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                    Cash on Delivery Available
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-800">Industrial / Customized Setup</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  This system is customized depending on source water hardness, capacity needs, and site space. Submit an enquiry for configurations.
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Description</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
            {addedAlert && (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm p-3 rounded-xl border border-emerald-100 animate-pulse">
                <CheckCircle className="h-4 w-4" /> Added to your cart!
              </div>
            )}

            {product.isEcommerce ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full gradient-bg hover:opacity-95 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="w-full gradient-bg hover:opacity-95 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Send Quotation Enquiry</span>
              </button>
            )}

            {/* Back-up Enquiry option for e-commerce products too */}
            {product.isEcommerce && (
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-6 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5 text-xs shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Ask Product Query</span>
              </button>
            )}
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

        {/* Specifications Table */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-2">Technical Specifications</h3>
          <div className="overflow-x-auto">
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
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400?text=AquaJ1' }} />
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
                  {p.isEcommerce && p.price ? (
                    <span className="text-slate-950 font-bold text-sm">₹{p.price}</span>
                  ) : (
                    <span className="text-slate-400 text-xs font-semibold uppercase">Enquiry Only</span>
                  )}
                  <Link href={`/products/${p.slug}/${p.id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold px-3 py-2 rounded-lg transition-all">
                    View Specs
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
