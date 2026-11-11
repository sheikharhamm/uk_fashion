import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight, Award, Scissors, Globe, Video, Play } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import VideoReelPlayer from '../components/VideoReelPlayer';

export default function Home() {
  const { products, loading, error, refetch, brand } = useProducts();

  const featuredProducts = products.slice(0, 4);
  const reelProducts = products.filter(p => p.video).slice(0, 4);

  const waLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Salam UK Fashion! I would like to inquire about custom Balochi Bridal tailoring.")}`;

  return (
    <div className="space-y-0">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#111111] overflow-hidden min-h-[620px] lg:min-h-[700px] flex items-center">
        {/* Background real bridal photo */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-luminosity bg-cover bg-center scale-105 transform hover:scale-100 transition-transform duration-1000"
          style={{ backgroundImage: `url('/media/kj-suit-01.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#e4ce9e] text-xs uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Authentic Handcraft by {brand.designer}</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight mb-6">
                The Pure Heritage of <br />
                <span className="text-gold-gradient">Balochi Bridal Doch</span>
              </h1>

              <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
                Real handcrafted bridal suits from our Karachi & Balochistan craft ateliers. Months of devoted needlepoint Doch, pure shafoon and katan silk fabrics, and antique heirloom designs created for extraordinary brides.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/collection"
                  className="px-8 py-4 bg-[#c5a059] hover:bg-[#8a6829] text-white uppercase text-xs tracking-widest font-bold rounded shadow-lg hover:shadow-[#c5a059]/40 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Explore Bridal Showcase
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-4 bg-transparent border border-[#e4ce9e] text-[#e4ce9e] hover:bg-[#e4ce9e] hover:text-[#111111] uppercase text-xs tracking-widest font-bold rounded transition-all duration-300 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Custom Order Inquiries</span>
                </a>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10 text-gray-300">
                <div>
                  <div className="text-2xl font-bold font-serif-luxury text-[#c5a059]">100%</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400">Pure Handmade Doch</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif-luxury text-[#c5a059]">Bespoke</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400">Custom Sizing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif-luxury text-[#c5a059]">Global</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400">{brand.shipping.split('•')[0]}</div>
                </div>
              </div>
            </div>

            {/* Right Hero Feature: Real Instagram Reel Video Preview */}
            <div className="lg:col-span-5 hidden lg:block">
              {reelProducts.length > 0 && (
                <div className="max-w-xs mx-auto">
                  <div className="text-center mb-2">
                    <span className="text-[11px] uppercase tracking-widest text-[#e4ce9e] font-semibold">
                      Featured Bridal Reel
                    </span>
                  </div>
                  <VideoReelPlayer
                    videoSrc={reelProducts[0].video}
                    posterSrc={reelProducts[0].image}
                    instagramUrl={reelProducts[0].instagramUrl}
                    title={reelProducts[0].title}
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* DISCOVER BY OCCASION */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#c5a059] uppercase text-xs font-bold tracking-[0.25em]">Royal Collections</span>
            <h2 className="font-serif-luxury text-3xl font-bold text-gray-900 mt-2">Discover By Wedding Occasion</h2>
            <div className="w-16 h-0.5 bg-[#c5a059] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <Link to="/collection?category=Bridal" className="group relative rounded-lg overflow-hidden shadow-md aspect-[4/5] block">
              <img src="/media/kj-suit-01.jpg" alt="Barat Bridal Suits" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">Barat Collection</span>
                <h3 className="font-serif-luxury text-2xl font-bold mt-1 group-hover:text-[#e4ce9e] transition-colors">Shahi Red Bridal Doch</h3>
                <p className="text-xs text-gray-300 mt-1 opacity-90 line-clamp-2">Pure zardozi, Pandol heavy pocket embroidery, and silk dupattas.</p>
                <div className="mt-3 inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#c5a059]">
                  View Designs <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link to="/collection?category=Walima" className="group relative rounded-lg overflow-hidden shadow-md aspect-[4/5] block">
              <img src="/media/kj-suit-07.jpg" alt="Walima Pastel & Silk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">Walima & Reception</span>
                <h3 className="font-serif-luxury text-2xl font-bold mt-1 group-hover:text-[#e4ce9e] transition-colors">Pastels & Royal Velvet</h3>
                <p className="text-xs text-gray-300 mt-1 opacity-90 line-clamp-2">Delicate cutdana, pearl accents, and fine contemporary Balochi stitches.</p>
                <div className="mt-3 inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#c5a059]">
                  View Designs <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link to="/collection?category=Festive" className="group relative rounded-lg overflow-hidden shadow-md aspect-[4/5] block">
              <img src="/media/kj-suit-04.jpg" alt="Mehndi & Haft-Rang" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">Mehndi & Mayun</span>
                <h3 className="font-serif-luxury text-2xl font-bold mt-1 group-hover:text-[#e4ce9e] transition-colors">Haft-Rang & Mirrored Doch</h3>
                <p className="text-xs text-gray-300 mt-1 opacity-90 line-clamp-2">Vibrant seven-color resham threads with glittering traditional mirror work.</p>
                <div className="mt-3 inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#c5a059]">
                  View Designs <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* FEATURED BRIDAL CATALOG */}
      <section className="py-20 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#c5a059] uppercase text-xs font-bold tracking-[0.25em]">Exclusive Showcase</span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-gray-900 mt-1">Featured Bridal Masterpieces</h2>
              <p className="text-gray-500 text-sm mt-2">Authentic hand needlework archives from {brand.designer}.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 text-[#c5a059] hover:text-[#8a6829] font-bold text-xs uppercase tracking-widest group"
              >
                <span>Browse Complete Collection</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-gray-500 mt-3 uppercase tracking-wider">Loading authentic bridal suits...</p>
            </div>
          ) : error && featuredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="font-serif-luxury text-lg font-bold text-gray-800">Unable to load bridal designs</p>
              <p className="text-xs text-gray-500 mt-1">{error}</p>
              <button
                onClick={refetch}
                className="mt-4 px-5 py-2 bg-[#111111] text-[#e4ce9e] hover:bg-[#c5a059] hover:text-white rounded text-xs uppercase font-bold tracking-wider transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REAL INSTAGRAM REEL SPOTLIGHT */}
      <section className="py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[#540f1a] font-bold text-xs tracking-widest uppercase mb-2">
              <InstagramIcon className="w-4 h-4 text-[#c5a059]" />
              <span>Real Video Feed</span>
            </div>
            <h2 className="font-serif-luxury text-3xl font-bold text-gray-900">
              Watch @kj_.collection Reels
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Genuine 720p HD videos of our bridal fits, needlework in progress, and fabric drape straight from Instagram.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reelProducts.map((p) => (
              <div key={p.id} className="flex flex-col">
                <VideoReelPlayer
                  videoSrc={p.video}
                  posterSrc={p.image}
                  instagramUrl={p.instagramUrl}
                  title={p.title}
                />
                <div className="mt-3 text-center">
                  <Link
                    to={`/product/${p.id}`}
                    className="text-xs font-serif-luxury font-bold text-gray-900 hover:text-[#c5a059]"
                  >
                    {p.title}
                  </Link>
                  <p className="text-[11px] text-gray-500 mt-0.5">{p.dochType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP STORY */}
      <section className="py-20 bg-[#111111] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#c5a059] uppercase text-xs font-bold tracking-[0.25em]">Centuries of Heritage</span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold mt-2 leading-tight">
                The Living Art of Handwoven Balochi Doch
              </h2>
              <div className="w-20 h-0.5 bg-[#c5a059] my-6"></div>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Every bridal dress presented at <strong className="text-white">UK Fashion</strong> is an authentic cultural treasure. Unlike mass-manufactured bridal suits, true Balochi doch takes between <strong>3 to 6 months</strong> of painstaking hand embroidery.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 flex-shrink-0 flex items-center justify-center text-[#c5a059]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-white text-base">Unmatched Artisanal Precision</h4>
                    <p className="text-xs text-gray-400 mt-1">Stitched by generational Balochi women artisans using needlepoint geometric perfection.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 flex-shrink-0 flex items-center justify-center text-[#c5a059]">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-white text-base">Pure Silks & Shafoon Fabrics</h4>
                    <p className="text-xs text-gray-400 mt-1">Katan silk, micro velvet 9000, real gold tilla, mukaish, and resham threads that never lose lustre.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 flex-shrink-0 flex items-center justify-center text-[#c5a059]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-white text-base">Direct Bespoke Consultation</h4>
                    <p className="text-xs text-gray-400 mt-1">Connect directly via WhatsApp or Instagram DM with photos of your dream bridal theme.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/about" className="inline-flex items-center gap-2 text-[#e4ce9e] hover:text-white font-bold text-xs uppercase tracking-widest">
                  <span>Read Our Craftsmanship Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-[#c5a059]/30">
                <img src="/media/kj-suit-02.jpg" alt="Balochi Doch Crafting" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#540f1a] border border-[#c5a059]/40 text-white p-6 rounded-lg shadow-xl max-w-xs hidden sm:block">
                <div className="text-[#c5a059] font-serif-luxury font-bold text-xl">100% Bespoke</div>
                <p className="text-xs text-gray-200 mt-1">Tailored custom to your neckline, pocket depth, and bridal color preference.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW CUSTOM ORDERING WORKS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[#c5a059] uppercase text-xs font-bold tracking-[0.25em]">Bespoke Process</span>
            <h2 className="font-serif-luxury text-3xl font-bold text-gray-900 mt-1">How Custom Bridal Orders Work</h2>
            <p className="text-gray-500 text-xs mt-2">Because each suit is an individual work of art, every inquiry is handled personally without public checkout.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-[#faf7f2] rounded-lg border border-[#c5a059]/15 hover:border-[#c5a059] transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#111111] text-[#c5a059] flex items-center justify-center font-bold text-lg font-serif-luxury mb-4">
                1
              </div>
              <h3 className="font-serif-luxury font-bold text-base text-gray-900 mb-2">Select Design</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Choose from our gallery or share reference screenshots from @kj_.collection Instagram.</p>
            </div>

            <div className="p-6 bg-[#faf7f2] rounded-lg border border-[#c5a059]/15 hover:border-[#c5a059] transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#111111] text-[#c5a059] flex items-center justify-center font-bold text-lg font-serif-luxury mb-4">
                2
              </div>
              <h3 className="font-serif-luxury font-bold text-base text-gray-900 mb-2">Inquire on WhatsApp</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Click 'Inquire on WhatsApp' to discuss fabric choices, customization, and event timelines.</p>
            </div>

            <div className="p-6 bg-[#faf7f2] rounded-lg border border-[#c5a059]/15 hover:border-[#c5a059] transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#111111] text-[#c5a059] flex items-center justify-center font-bold text-lg font-serif-luxury mb-4">
                3
              </div>
              <h3 className="font-serif-luxury font-bold text-base text-gray-900 mb-2">Handcrafted For You</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Our master artisans begin your Doch needlework, providing progress updates and videos.</p>
            </div>

            <div className="p-6 bg-[#faf7f2] rounded-lg border border-[#c5a059]/15 hover:border-[#c5a059] transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#111111] text-[#c5a059] flex items-center justify-center font-bold text-lg font-serif-luxury mb-4">
                4
              </div>
              <h3 className="font-serif-luxury font-bold text-base text-gray-900 mb-2">Worldwide Delivery</h3>
              <p className="text-xs text-gray-600 leading-relaxed">Safely packaged with luxury bridal boxing and delivered via tracked express courier worldwide.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}