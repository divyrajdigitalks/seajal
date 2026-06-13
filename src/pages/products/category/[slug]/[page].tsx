import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../../../../data/db';

interface CategoryProductsProps {
  products: Product[];
  categoryName: string;
  categorySlug: string;
  currentPage: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 6;

export default function CategoryProducts({ products, categoryName, categorySlug, currentPage, totalPages }: CategoryProductsProps) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/all-products/1" className="hover:text-primary transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-semibold">{categoryName}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{categoryName}</h1>
          <p className="text-sm text-slate-500 mt-1">Showing {products.length} products</p>
        </div>

        {/* Filter Selection links */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/all-products/1"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:border-primary transition-all"
          >
            All Products
          </Link>
          {CATEGORIES.map(cat => {
            const isCurrent = cat.slug === categorySlug;
            return (
              <Link
                key={cat.slug}
                href={`/products/category/${cat.slug}/1`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
          <p className="text-slate-500 font-medium">No products in this category yet.</p>
          <Link href="/all-products/1" className="mt-4 inline-block text-primary font-bold hover:underline">
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
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
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {currentPage > 1 ? (
            <Link
              href={`/products/category/${categorySlug}/${currentPage - 1}`}
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
                href={`/products/category/${categorySlug}/${pageNum}`}
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
              href={`/products/category/${categorySlug}/${currentPage + 1}`}
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
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string; page: string } }[] = [];

  CATEGORIES.forEach(cat => {
    const catProducts = PRODUCTS.filter(p => p.category === cat.slug);
    const totalCount = catProducts.length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

    for (let i = 1; i <= totalPages; i++) {
      paths.push({
        params: { slug: cat.slug, page: String(i) }
      });
    }
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const page = params?.page ? Number(params.page) : 1;

  const currentCategory = CATEGORIES.find(c => c.slug === slug);
  const catProducts = PRODUCTS.filter(p => p.category === slug);

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = catProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(catProducts.length / ITEMS_PER_PAGE) || 1;

  return {
    props: {
      products: paginatedProducts,
      categoryName: currentCategory?.name || slug,
      categorySlug: slug,
      currentPage: page,
      totalPages
    }
  };
};
