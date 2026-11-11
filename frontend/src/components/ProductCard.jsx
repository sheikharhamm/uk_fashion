import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Play, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function ProductCard({ product }) {
  const { openInquiry } = useProducts();

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between group">
      <div>
        {/* Image & Video badge */}
        <div className="image-zoom-container aspect-[3/4] bg-gray-100 relative">
          <img
            src={product.image || (product.images && product.images[0])}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Badge */}
          <span className="absolute top-3 left-3 bg-[#111111]/90 text-[#e4ce9e] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
            {product.badge || product.category}
          </span>

          {/* Video Reel Indicator */}
          {product.video && (
            <span className="absolute top-3 right-3 bg-brandMaroon text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-current" /> Reel
            </span>
          )}

          {/* Occasion tag on bottom of image */}
          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-[#111111] text-[10px] font-semibold px-2 py-0.5 rounded shadow">
            {product.occasion.split('/')[0]}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="absolute inset-0 z-10"
            aria-label={product.title}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="text-[11px] text-[#c5a059] font-bold uppercase tracking-wider block">
            {product.dochType}
          </span>
          <h3 className="font-serif-luxury font-bold text-base text-gray-900 mt-1 group-hover:text-[#c5a059] transition-colors">
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
            {product.shortDesc}
          </p>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c5a059]"></span>
            <span className="truncate">Fabric: {product.fabric}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between gap-2 mt-2">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition"
        >
          View Details
        </Link>
        <button
          onClick={() => openInquiry(product)}
          className="py-2 px-3 bg-[#111111] text-[#e4ce9e] hover:bg-[#c5a059] hover:text-white rounded transition flex items-center justify-center gap-1 text-xs font-bold tracking-wider"
          title="Quick WhatsApp Inquiry"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Inquire</span>
        </button>
      </div>
    </div>
  );
}