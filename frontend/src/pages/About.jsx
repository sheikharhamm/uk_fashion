import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { useProducts } from '../context/ProductContext';

export default function About() {
  const { brand } = useProducts();
  const waLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Salam UK Fashion! I would like to inquire about custom Balochi Bridal tailoring.")}`;

  return (
    <div>
      {/* BANNER */}
      <section className="bg-[#111111] text-white py-16 border-b border-[#c5a059]/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: `url('/media/kj-suit-02.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-bold">
            The Royal Craft of Balochistan
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mt-2">
            Centuries of Balochi Doch Heritage
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Where every needlepoint thread preserves the ancestral geometry, nobility, and soul of Baluchi women artisans.
          </p>
        </div>
      </section>

      {/* STORY CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest">Our Vision</span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-4">
              Reviving Royal Couture for Modern Brides
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              <strong>UK Fashion</strong> was founded on a singular passion: to elevate authentic <strong>Balochi Doch (Needlework)</strong> from a regional cultural secret onto the global high-fashion stage. 
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Curated in direct collaboration with <strong>Khan Jee Collection ({brand.instagramHandle})</strong>, we bring brides in the UK, North America, the Gulf, and Pakistan heirloom suits that will be treasured for generations.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg border-2 border-[#c5a059]/20 aspect-[4/3]">
            <img
              src="/media/kj-suit-03.jpg"
              alt="Balochi Doch needlework"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section 2: Anatomy of Balochi Doch */}
        <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest">Artisanal Elements</span>
            <h3 className="font-serif-luxury text-2xl font-bold text-gray-900 mt-1">The Anatomy of Authentic Doch</h3>
            <p className="text-xs text-gray-500 mt-1">Every suit incorporates distinctive historical signatures.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 bg-[#faf7f2] rounded border border-[#c5a059]/20">
              <h4 className="font-serif-luxury font-bold text-base text-gray-900 mb-2 text-[#8a6829]">
                1. Ji & Gardan (Chest Plate)
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                The heart of the dress, featuring thousands of miniature geometric stitches crafted in perfect mathematical harmony.
              </p>
            </div>

            <div className="p-5 bg-[#faf7f2] rounded border border-[#c5a059]/20">
              <h4 className="font-serif-luxury font-bold text-base text-gray-900 mb-2 text-[#8a6829]">
                2. Pandol (Royal Pocket)
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                The iconic downward triangular pocket extending below the waistline, traditionally symbolizing abundance and grace.
              </p>
            </div>

            <div className="p-5 bg-[#faf7f2] rounded border border-[#c5a059]/20">
              <h4 className="font-serif-luxury font-bold text-base text-gray-900 mb-2 text-[#8a6829]">
                3. Asteen & Pauncha (Cuffs)
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Heavy matching sleeve bands and trouser cuffs bordered with hand-beaded trims and mirror reflections.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Social & Consultation CTA */}
        <div className="bg-[#111111] rounded-xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold mb-3">
              Begin Your Custom Bridal Journey
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
              Because true Doch takes several months of dedicated stitching, we recommend booking your bridal consultation 4 to 6 months prior to your wedding day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-[#c5a059] hover:bg-[#8a6829] text-white font-bold text-xs uppercase tracking-widest rounded transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Consultation</span>
              </a>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded transition flex items-center gap-2"
              >
                <InstagramIcon className="w-4 h-4 text-[#c5a059]" />
                <span>Follow {brand.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}