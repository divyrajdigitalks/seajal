import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { BLOGS, Blog } from '../../data/db';

interface BlogsProps {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 6;

export default function LatestUpdates({ blogs, currentPage, totalPages }: BlogsProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 flex items-center gap-1">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-semibold">Latest Updates</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Latest Updates & Resources</h1>
        <p className="text-sm text-slate-500 mt-1">Get updates on setups, guides, and tips for water purification</p>
      </div>

      {/* Blog Cards list */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {}
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {blogs.map((blog) => (
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            key={blog.id}
            className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col sm:flex-row gap-6 p-6 transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
          >
            <div className="sm:w-1/3 aspect-video sm:aspect-square bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x300?text=AquaJ1' }}
              />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {blog.author}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                  <Link href={`/latest-update/${blog.slug}/${blog.id}`} className="hover:text-primary transition-colors">
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">{blog.summary}</p>
              </div>
              <Link
                href={`/latest-update/${blog.slug}/${blog.id}`}
                className="mt-6 text-sm font-semibold text-primary flex items-center gap-1 hover:underline"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {currentPage > 1 ? (
            <Link
              href={`/latest-updates/${currentPage - 1}`}
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
                href={`/latest-updates/${pageNum}`}
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
              href={`/latest-updates/${currentPage + 1}`}
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
  const totalCount = BLOGS.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  const paths = Array.from({ length: totalPages }, (_, i) => ({
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
  const paginatedBlogs = BLOGS.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(BLOGS.length / ITEMS_PER_PAGE) || 1;

  return {
    props: {
      blogs: paginatedBlogs,
      currentPage: page,
      totalPages
    }
  };
};
