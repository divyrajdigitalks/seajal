import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import { GALLERY, GalleryImage } from '../../data/db';

interface GalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'setup' | 'showroom'>('all');

  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter(img => img.category === activeFilter);

  const filters = [
    { value: 'all', name: 'Show All' },
    { value: 'setup', name: 'Installations' },
    { value: 'showroom', name: 'Our Showrooms' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 flex items-center gap-1">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-semibold">Image Gallery</span>
      </nav>

      {/* Header & Filter options */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Installation Gallery</h1>
          <p className="text-sm text-slate-500 mt-1">Real-life pictures of custom RO filters and water softeners installed in Pune.</p>
        </div>

        {/* Filter tags */}
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === f.value
                  ? 'gradient-bg text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry image layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-lg transition-all"
          >
            <div className="aspect-video sm:aspect-square w-full bg-slate-50 overflow-hidden flex items-center justify-center">
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=400' }}
              />
            </div>
            {/* Hover details overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-secondary">
                {img.category === 'setup' ? 'Installation' : 'Showroom'}
              </span>
              <h4 className="text-sm font-bold mt-1">{img.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { page: '1' } }],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      images: GALLERY
    }
  };
};
