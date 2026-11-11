import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Video, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons';
import { useProducts } from '../context/ProductContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { brand } = useProducts();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bridal Suits', path: '/collection?category=Bridal' },
    { name: 'Walima Edit', path: '/collection?category=Walima' },
    { name: 'Mehndi & Festive', path: '/collection?category=Festive' },
    { name: 'All Collections', path: '/collection' },
    { name: 'Heritage Story', path: '/about' },
    { name: 'Contact & Inquiry', path: '/contact' }
  ];

  const waLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Salam UK Fashion! I would like to inquire about your Balochi Bridal & Cultural collection.")}`;

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#111111] text-[#e4ce9e] text-[11px] py-2 px-4 border-b border-[#c5a059]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="tracking-[0.18em] uppercase font-medium text-gray-300">
              Authentic Handcrafted Balochi Doch • Bespoke Bridal Orders • Worldwide Delivery
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="tracking-wider">{brand.instagramHandle}</span>
            </a>
            <a
              href={brand.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <TikTokIcon className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="tracking-wider">TikTok Feed</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition flex items-center gap-1.5 text-emerald-400 font-semibold"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="tracking-wider">VIP Consultation</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER (DESKTOP) */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="grid grid-cols-12 items-center">
            
            {/* Left Column: Concierge Info */}
            <div className="col-span-4 text-left">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-gray-700">Concierge Available:</span>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-gray-900 hover:text-[#c5a059] transition"
                >
                  {brand.whatsappDisplay}
                </a>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5 tracking-wider uppercase">
                Karachi & Balochistan Craft Ateliers
              </p>
            </div>

            {/* Center Column: Royal Brand Logo */}
            <div className="col-span-4 text-center">
              <Link to="/" className="group inline-block">
                <h1 className="font-serif-luxury text-3xl xl:text-4xl font-extrabold tracking-[0.2em] text-[#111111] uppercase group-hover:text-[#c5a059] transition-colors">
                  UK <span className="text-[#c5a059]">FASHION</span>
                </h1>
                <p className="text-[10px] tracking-[0.45em] uppercase text-gray-400 font-semibold mt-1">
                  Balochi Haute Couture
                </p>
              </Link>
            </div>

            {/* Right Column: Social & Booking Actions */}
            <div className="col-span-4 flex items-center justify-end space-x-3">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-[#c5a059] hover:border-[#c5a059] flex items-center justify-center transition"
                title="Instagram @kj_.collection"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={brand.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-[#c5a059] hover:border-[#c5a059] flex items-center justify-center transition"
                title="TikTok @uk_fashion92"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#111111] text-[#e4ce9e] hover:bg-[#c5a059] hover:text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Book Bridal</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 3. DEDICATED NAVIGATION BAR (STICKY) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* DESKTOP CENTERED MENU */}
          <div className="hidden lg:flex items-center justify-center h-13 py-2.5">
            <nav className="flex items-center space-x-8 xl:space-x-12">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname + location.search === link.path ||
                  (link.path === '/' && location.pathname === '/' && !location.search);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-[#c5a059] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#c5a059]'
                        : 'text-gray-700 hover:text-[#c5a059]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* MOBILE NAVBAR (< lg) */}
          <div className="lg:hidden flex items-center justify-between h-16">
            {/* Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-700 hover:text-[#c5a059] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Logo */}
            <Link to="/" className="text-center">
              <span className="font-serif-luxury text-xl font-bold tracking-widest text-[#111111] uppercase">
                UK <span className="text-[#c5a059]">FASHION</span>
              </span>
              <span className="block text-[8px] tracking-[0.3em] uppercase text-gray-400 font-semibold -mt-0.5">
                Balochi Couture
              </span>
            </Link>

            {/* Mobile WhatsApp Quick Action */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-emerald-600 hover:text-emerald-700 transition"
              title="WhatsApp Consultation"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-sm lg:hidden">
            <div className="fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-5 border-b border-gray-100">
                  <div>
                    <span className="font-serif-luxury font-bold text-xl text-[#111111]">UK FASHION</span>
                    <span className="block text-[9px] tracking-[0.25em] uppercase text-gray-400">Balochi Couture</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 text-gray-400 hover:text-black"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col space-y-3.5 mt-6 text-xs font-semibold tracking-[0.16em] uppercase text-gray-800">
                  {navLinks.map((link) => {
                    const isActive =
                      location.pathname + location.search === link.path ||
                      (link.path === '/' && location.pathname === '/' && !location.search);

                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`py-2 px-3 rounded transition ${
                          isActive
                            ? 'bg-[#faf7f2] text-[#c5a059] font-bold border-l-2 border-[#c5a059]'
                            : 'hover:text-[#c5a059] hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 font-medium">
                  Atelier & Social Channels
                </p>
                <div className="flex gap-3 mb-4">
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#c5a059] hover:text-white transition"
                    title="Instagram @kj_.collection"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={brand.tiktokUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#c5a059] hover:text-white transition"
                    title="TikTok @uk_fashion92"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center w-full py-3 bg-[#111111] text-[#e4ce9e] font-bold rounded-lg text-xs uppercase tracking-wider shadow"
                >
                  WhatsApp VIP Concierge
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}