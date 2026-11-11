import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Sparkles, MessageCircle, Calendar, ShieldCheck, Truck, Clock, Ruler, Camera, Play } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import VideoReelPlayer from '../components/VideoReelPlayer';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading, openInquiry, brand } = useProducts();

  const [activeMedia, setActiveMedia] = useState('image'); // 'image' or 'video'
  const [selectedImage, setSelectedImage] = useState(null);

  const product = products.find(p => p.id === id || p.slug === id) || products[0];

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image || (product.images && product.images[0]));
      setActiveMedia('image');
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (loading && !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-gray-500 mt-3 uppercase tracking-wider">Loading design details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif-luxury text-2xl font-bold">Design Not Found</h2>
        <Link to="/collection" className="mt-4 inline-block text-[#c5a059] underline">
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Related products
  const related = products
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const waMessage = encodeURIComponent(
    `Salam UK Fashion! I am interested in inquiring about this Balochi Bridal suit:\n` +
    `• Dress: ${product.title}\n` +
    `• Doch Type: ${product.dochType}\n` +
    `• Occasion: ${product.occasion}\n\n` +
    `Please share details regarding tailoring timeline, fabric choices, and bespoke ordering.`
  );
  const waLink = `https://wa.me/${brand.whatsappNumber}?text=${waMessage}`;

  return (
    <div>
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 flex items-center space-x-2">
          <Link to="/" className="hover:text-[#c5a059]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/collection" className="hover:text-[#c5a059]">Collections</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to={`/collection?category=${encodeURIComponent(product.category)}`} className="hover:text-[#c5a059]">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* MAIN SHOWCASE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: GALLERY & REEL (6 cols) */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails Column */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              <button
                onClick={() => { setActiveMedia('image'); setSelectedImage(product.image); }}
                className={`w-20 h-24 rounded border-2 overflow-hidden focus:outline-none transition ${
                  activeMedia === 'image' ? 'border-[#c5a059]' : 'border-transparent'
                }`}
                title="View Photo"
              >
                <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
              </button>

              {product.video && (
                <button
                  onClick={() => setActiveMedia('video')}
                  className={`w-20 h-24 rounded border-2 overflow-hidden focus:outline-none transition relative bg-black flex items-center justify-center text-white ${
                    activeMedia === 'video' ? 'border-[#c5a059]' : 'border-transparent'
                  }`}
                  title="Watch Instagram Reel"
                >
                  <img src={product.image} alt="Video Reel" className="w-full h-full object-cover opacity-50" />
                  <Play className="w-6 h-6 fill-current absolute text-[#e4ce9e]" />
                </button>
              )}
            </div>

            {/* Main View Area */}
            <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm relative aspect-[3/4]">
              {activeMedia === 'video' && product.video ? (
                <div className="w-full h-full p-2 bg-black flex items-center justify-center">
                  <VideoReelPlayer
                    videoSrc={product.video}
                    posterSrc={product.image}
                    instagramUrl={product.instagramUrl}
                    title={product.title}
                  />
                </div>
              ) : (
                <>
                  <img
                    src={selectedImage || product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-[#111111]/90 text-[#e4ce9e] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
                    {product.badge || product.category}
                  </span>
                  {product.instagramUrl && (
                    <a
                      href={product.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-full shadow hover:bg-[#c5a059] hover:text-white transition flex items-center gap-1.5 text-gray-800"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>View on @kj_.collection</span>
                    </a>
                  )}
                </>
              )}
            </div>

          </div>

          {/* RIGHT: SPECIFICATIONS & CONSULTATION (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Title & Doch Subtitle */}
              <div className="border-b border-gray-200 pb-5">
                <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-bold block mb-1">
                  {product.dochType}
                </span>
                <h1 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {product.shortDesc}
                </p>
              </div>

              {/* BESPOKE NOTICE (No Checkout, Direct Booking) */}
              <div className="my-5 p-4 bg-amber-50/80 border border-[#c5a059]/40 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#c5a059] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#8a6829]">
                      Bespoke Couture Piece
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Each suit is handmade by artisanal Balochi masters over 3 to 6 months. Public checkout is disabled; custom sizing, color tweaks, and orders are handled directly through bridal consultation.
                    </p>
                  </div>
                </div>
              </div>

              {/* SPECIFICATION TABLE */}
              <div className="mt-6">
                <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Garment Specifications
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 text-xs">
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-gray-500 font-medium">Embroidery (Doch)</span>
                    <span className="col-span-2 text-gray-900 font-semibold">{product.dochType}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-gray-500 font-medium">Fabric Base</span>
                    <span className="col-span-2 text-gray-900 font-semibold">{product.fabric}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-gray-500 font-medium">Embellishments</span>
                    <span className="col-span-2 text-gray-900 font-semibold">{product.work}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-gray-500 font-medium">Color Palette</span>
                    <span className="col-span-2 text-gray-900 font-semibold">{product.color}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-gray-500 font-medium">Ideal Occasion</span>
                    <span className="col-span-2 text-gray-900 font-semibold">{product.occasion}</span>
                  </div>
                </div>
              </div>

              {/* ARTISAN INCLUSIONS */}
              <div className="mt-6">
                <h3 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">
                  Artisan Inclusions
                </h3>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1.5 leading-relaxed">
                  {product.details ? (
                    product.details.map((d, i) => <li key={i}>{d}</li>)
                  ) : (
                    <>
                      <li>Authentic Handcrafted Doch needlework from Balochistan</li>
                      <li>Custom tailored to client measurement sheet</li>
                      <li>Worldwide DHL express delivery with bridal packaging</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-4 bg-[#111111] text-[#e4ce9e] hover:bg-[#c5a059] hover:text-white rounded-lg font-bold text-xs uppercase tracking-widest text-center transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Inquire & Order on WhatsApp</span>
                </a>
                <button
                  onClick={() => openInquiry(product)}
                  className="py-4 px-6 bg-white border border-[#111111] text-[#111111] hover:bg-gray-50 rounded-lg font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#c5a059]" />
                  <span>Book Consultation</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Hand-embroidered guarantee</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#c5a059]" />
                  <span>{brand.shipping}</span>
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* FULL ARTISAN STORY & TIMELINE */}
        <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          <h3 className="font-serif-luxury text-xl font-bold text-gray-900 mb-3">
            About This Handcrafted Ensemble
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-4xl whitespace-pre-line">
            {product.fullDesc || product.rawCaption}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase text-gray-800">3 - 6 Months Crafting Time</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Please order well in advance of your wedding date to ensure flawless needlework.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Ruler className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase text-gray-800">Custom Measurement Form</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  We provide a video guide and measurement sheet upon consultation.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Camera className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase text-gray-800">Progress Updates</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Receive high-res photos and videos from the artisan during Doch creation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[#c5a059] uppercase text-xs font-bold tracking-[0.25em]">
                Curated Recommendations
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-gray-900 mt-1">
                You May Also Admire
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}