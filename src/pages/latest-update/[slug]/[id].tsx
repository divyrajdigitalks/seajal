import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react';
import { BLOGS, Blog } from '../../../data/db';

interface BlogDetailProps {
  blog: Blog;
  recentBlogs: Blog[];
}

export default function BlogDetail({ blog, recentBlogs }: BlogDetailProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
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
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md space-y-6"
      >
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center hover-card-trigger"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450?text=AquaJ1' }}
          />
        </motion.div>

        <div
          className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </motion.article>

      {/* Recent Posts Snippet */}
      {recentBlogs.length > 0 && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
          className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 space-y-4"
        >
          <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Recent Updates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentBlogs.map((b) => (
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} key={b.id}>
                <Link
                  href={`/latest-update/${b.slug}/${b.id}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm hover:border-primary transition-all flex flex-col justify-between h-full hover:shadow-md hover:-translate-y-1"
                >
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-2">{b.title}</h4>
                  <span className="text-[10px] text-slate-400 mt-2">{b.date}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
    </>
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
