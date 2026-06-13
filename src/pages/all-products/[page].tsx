import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../../data/db';

interface ProductsProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const ITEMS_PER_PAGE = 6;

export default function AllProducts({ products, currentPage, totalPages, totalCount }: ProductsProps) {
  const router = useRouter();
  const { search } = router.query;

  // Handles search filtering dynamically on the client side if queries exist
  const filterSearch = search ? String(search).toLowerCase() : '';
  const displayedProducts = filterSearch
    ? products.filter(p => p.name.toLowerCase().includes(filterSearch) || p.description.toLowerCase().includes(filterSearch))
    : products;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-semibold">Products</span>
      </nav>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {search ? `Search Results for "${search}"` : 'All Products & Systems'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">Showing {displayedProducts.length} items</p>
        </div>

        {/* Category quick selectors */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/all-products/1"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white shadow-sm"
          >
            All Products
          </Link>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/products/category/${cat.slug}/1`}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:border-primary transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main product catalog grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
          <p className="text-slate-500 font-medium">No products match your filters.</p>
          <Link href="/all-products/1" className="mt-4 inline-block text-primary font-bold hover:underline">
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400?text=AquaJ1' }}
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
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {!search && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {currentPage > 1 ? (
            <Link
              href={`/all-products/${currentPage - 1}`}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-primary transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          ) : (
            <span className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed">
              <ArrowLeft className="h-5 w-5" />
            </span>
          )}

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <Link
                key={pageNum}
                href={`/all-products/${pageNum}`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                  isCurrent
                    ? 'gradient-bg text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          {currentPage < totalPages ? (
            <Link
              href={`/all-products/${currentPage + 1}`}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-primary transition-all"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <span className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed">
              <ArrowRight className="h-5 w-5" />
            </span>
          )}
        </div>
      )}

      {/* SEO tags area */}
      <section className="bg-slate-100 rounded-3xl p-6 sm:p-8 space-y-4 mt-12">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Top Search Locations & Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {["Water Softener in Pune", "Water Purifier Showroom", "Commercial RO Plant Pune", "Borewell Water Filter", "Industrial Filter Wakad", "Water Softener Pimple Saudagar", "RO Repair Pune", "Water Softener Repair Wakad"].map((tag) => (
            <span key={tag} className="bg-white border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-500 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalCount = PRODUCTS.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const paths = Array.from({ length: totalPages || 1 }, (_, i) => ({
    params: { page: String(i + 1) }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = params?.page ? Number(params.page) : 1;
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = PRODUCTS.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const totalCount = PRODUCTS.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return {
    props: {
      products: paginatedProducts,
      currentPage: page,
      totalPages,
      totalCount
    }
  };
};
