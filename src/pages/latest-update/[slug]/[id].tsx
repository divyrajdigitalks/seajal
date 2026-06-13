import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react';
import { BLOGS, Blog } from '../../../data/db';

interface BlogDetailProps {
  blog: Blog;
  recentBlogs: Blog[];
}

export default function BlogDetail({ blog, recentBlogs }: BlogDetailProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 flex items-center gap-1">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/latest-updates/1" className="hover:text-primary transition-colors">Latest Updates</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px]">{blog.title}</span>
      </nav>

      {/* Blog Article */}
      <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {blog.author}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* Feature Image */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450?text=AquaJ1' }}
          />
        </div>

        {/* Main Content Body */}
        <div
          className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Recent Posts Snippet */}
      {recentBlogs.length > 0 && (
        <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Recent Updates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentBlogs.map((b) => (
              <Link
                key={b.id}
                href={`/latest-update/${b.slug}/${b.id}`}
                className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm hover:border-primary transition-all flex flex-col justify-between"
              >
                <h4 className="text-sm font-bold text-slate-800 line-clamp-2">{b.title}</h4>
                <span className="text-[10px] text-slate-400 mt-2">{b.date}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = BLOGS.map((blog) => ({
    params: { slug: blog.slug, id: String(blog.id) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id);
  const blog = BLOGS.find((b) => b.id === id);

  if (!blog) {
    return { notFound: true };
  }

  // Find recent updates excluding current post
  const recentBlogs = BLOGS.filter((b) => b.id !== id).slice(0, 2);

  return {
    props: {
      blog,
      recentBlogs,
    },
  };
};
