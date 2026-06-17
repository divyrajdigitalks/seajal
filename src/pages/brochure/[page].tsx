import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { ChevronRight, Download, FileText } from 'lucide-react';
import { BROCHURES, Brochure } from '../../data/db';

interface BrochureProps {
  brochures: Brochure[];
}

export default function BrochuresPage({ brochures }: BrochureProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 flex items-center gap-1">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-semibold">Brochures</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Brochures & Catalogs</h1>
        <p className="text-sm text-slate-500 mt-1">Download official Seajal brochures for technical setup and features.</p>
      </div>

      {/* Brochure Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
        {brochures.map((brochure) => (
          <div
            key={brochure.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center gap-6 hover:shadow-lg transition-all"
          >
            <div className="h-20 w-16 bg-teal-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-primary border border-teal-100">
              <FileText className="h-10 w-10 text-secondary" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 truncate leading-snug">{brochure.title}</h3>
              <p className="text-xs text-slate-400">File Size: {brochure.size}</p>
              <a
                href={brochure.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 bg-primary hover:bg-primary-dark text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF</span>
              </a>
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
      brochures: BROCHURES
    }
  };
};
