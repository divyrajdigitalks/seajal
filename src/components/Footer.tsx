import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/db';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Newsletter section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Stay updated with Seajal</h3>
            <p className="mt-2 text-sm text-slate-400">
              Subscribe to get exclusive product guides, pure water updates, and maintenance schedules.
            </p>
          </div>
          <div>
            {success ? (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">Thank you! You have successfully subscribed to our newsletter.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-0 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-secondary"
                  required
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white rounded-xl px-4 flex items-center justify-center shadow-lg transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main links section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="gradient-bg text-white font-extrabold text-lg h-8 w-8 rounded-full flex items-center justify-center shadow-md">
                A1
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white leading-none">Seajal</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-secondary mt-0.5">Technologies</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Leading developer of water treatment projects, industrial water softeners, and residential smart purifiers. Dedicated to pure and healthy living.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3.6L16 8h-3V6.5c0-.8.2-1 1-1h2V2h-3C9.8 2 9 3.5 9 5.5V8z"/></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Product Categories</h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products/category/${cat.slug}/1`} className="hover:text-secondary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-secondary transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link href="/all-products/1" className="hover:text-secondary transition-colors">
                  Product Range
                </Link>
              </li>
              <li>
                <Link href="/latest-updates/1" className="hover:text-secondary transition-colors">
                  Blog & News
                </Link>
              </li>
              <li>
                <Link href="/image-gallery/1" className="hover:text-secondary transition-colors">
                  Installation Gallery
                </Link>
              </li>
              <li>
                <Link href="/brochure/1" className="hover:text-secondary transition-colors">
                  Download Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Official Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Shop No. 4, Shravani Heritage, Near PCMC School, Pimple Saudagar, Pune - 411027
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <a href="tel:+918048039988" className="hover:text-secondary transition-colors">
                  +91 80480 39988
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <a href="mailto:info@aquaj1.in" className="hover:text-secondary transition-colors">
                  info@aquaj1.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copy */}
      <div className="bg-slate-950 py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Seajal Technologies. All rights reserved. Designed with Next.js & Tailwind.</p>
        </div>
      </div>
    </footer>
  );
};
