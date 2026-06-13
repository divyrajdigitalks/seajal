import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, BLOGS } from '../data/db';

export const Header: React.FC = () => {
  const router = useRouter();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Products', href: '/all-products/1' },
    { name: 'Updates', href: '/latest-updates/1' },
    { name: 'Gallery', href: '/image-gallery/1' },
    { name: 'Brochures', href: '/brochure/1' },
    { name: 'Contact', href: '/mapview/18-62226649999999/73-8303176' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-products/1?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Find quick recommendations
  const quickProducts = searchQuery.trim() 
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const quickBlogs = searchQuery.trim()
    ? BLOGS.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass shadow-sm transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="gradient-bg text-white font-extrabold text-xl h-10 w-10 rounded-full flex items-center justify-center shadow-md">
                  A1
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-primary leading-none">Seajal</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-0.5">Technologies</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navbar */}
            <nav className="hidden md:flex space-x-1 lg:space-x-4">
              {navLinks.map((link) => {
                const isActive = router.pathname === link.href || (link.href !== '/' && router.pathname.startsWith(link.href.split('/')[1]));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'text-primary bg-primary/5 font-semibold'
                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right widgets */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
                aria-label="Search site"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/cart"
                className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              <a
                href="tel:+918048039988"
                className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>+91 80480 39988</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 md:hidden transition-all"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-1 shadow-lg">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href || (link.href !== '/' && router.pathname.startsWith(link.href.split('/')[1]));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isActive
                      ? 'text-primary bg-primary/5 font-semibold'
                      : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a
              href="tel:+918048039988"
              className="mt-4 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold shadow-md"
            >
              <Phone className="h-4 w-4" />
              <span>Call Us: +91 80480 39988</span>
            </a>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/80 backdrop-blur-md p-4 pt-24 sm:p-6 sm:pt-28">
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 transition-all">
            <div className="flex items-center border-b border-slate-100 px-4 py-3">
              <Search className="h-6 w-6 text-slate-400" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  type="text"
                  placeholder="Search products or articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-0 px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 sm:text-lg"
                  autoFocus
                />
              </form>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Quick search suggestions */}
            {searchQuery && (
              <div className="p-4 max-h-[350px] overflow-y-auto space-y-4">
                {quickProducts.length === 0 && quickBlogs.length === 0 ? (
                  <p className="text-center text-sm text-slate-500 py-4">No quick results found. Press Enter to search all.</p>
                ) : (
                  <>
                    {quickProducts.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Matching Products</h4>
                        <div className="space-y-2">
                          {quickProducts.map(product => (
                            <Link 
                              key={product.id} 
                              href={`/products/${product.slug}/${product.id}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                              <div className="h-10 w-10 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100?text=AquaJ1' }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{product.name}</p>
                                <p className="text-xs text-slate-500">{product.categoryName}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {quickBlogs.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Latest Updates</h4>
                        <div className="space-y-2">
                          {quickBlogs.map(blog => (
                            <Link 
                              key={blog.id} 
                              href={`/latest-update/${blog.slug}/${blog.id}`}
                              onClick={() => setSearchOpen(false)}
                              className="block p-2 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                              <p className="text-sm font-semibold text-slate-800 truncate">{blog.title}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{blog.date}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
