import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { useProducts } from '../context/ProductContext';

export default function Footer() {
  const { brand } = useProducts();
  const waLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Salam UK Fashion! I would like to inquire about custom Balochi Bridal tailoring.")}`;

  return (
    <footer className="bg-[#111111] text-gray-400 pt-16 pb-12 border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Story */}
          <div className="md:col-span-1">
            <h2 className="font-serif-luxury text-2xl font-bold text-white tracking-widest uppercase">
              UK <span className="text-[#c5a059]">FASHION</span>
            </h2>
            <p className="text-xs leading-relaxed text-gray-400 mt-3">
              Preserving and elevating timeless Balochi Doch, bridal needlework, and royal cultural heritage attire. Curated from <span className="text-[#c5a059] font-medium">{brand.designer}</span>.
            </p>
            <div className="flex space-x-3 mt-6">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c5a059] text-white flex items-center justify-center transition"
                title="Instagram @kj_.collection"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={brand.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c5a059] text-white flex items-center justify-center transition"
                title="TikTok Feed"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white flex items-center justify-center transition"
                title="WhatsApp Consultation"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-serif-luxury text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Collections
            </h3>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <Link to="/collection?category=Bridal" className="hover:text-[#c5a059] transition">
                  Barat Bridal Doch
                </Link>
              </li>
              <li>
                <Link to="/collection?category=Walima" className="hover:text-[#c5a059] transition">
                  Walima Soft Hues
                </Link>
              </li>
              <li>
                <Link to="/collection?category=Festive" className="hover:text-[#c5a059] transition">
                  Mehndi Haft-Rang
                </Link>
              </li>
              <li>
                <Link to="/collection?category=Couture" className="hover:text-[#c5a059] transition">
                  Exclusive Royal Couture
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif-luxury text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <Link to="/" className="hover:text-[#c5a059] transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#c5a059] transition">Heritage & Artisans</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#c5a059] transition">Custom Inquiries</Link>
              </li>
              <li>
                <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[#c5a059] transition">
                  Instagram @kj_.collection
                </a>
              </li>
              <li>
                <a href={brand.tiktokUrl} target="_blank" rel="noreferrer" className="hover:text-[#c5a059] transition">
                  TikTok Video Showcase
                </a>
              </li>
            </ul>
          </div>

          {/* Bridal Concierge & Address */}
          <div>
            <h3 className="font-serif-luxury text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Bridal Concierge
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              For custom bridal appointments, sizing consultations, and fabric swatches:
            </p>
            <div className="text-xs space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] flex-shrink-0 mt-0.5" />
                <span>{brand.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {brand.whatsappDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Mon - Sat: 11:00 AM - 9:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} UK Fashion. All authentic handcrafted rights reserved. Powered by @kj_.collection.</p>
          <p className="mt-2 sm:mt-0 font-medium text-[#c5a059]">Bespoke Showcase Edition • No Public Checkout</p>
        </div>
      </div>
    </footer>
  );
}