import React, { useState } from 'react';
import { X, MessageCircle, Sparkles, Send } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function InquiryModal() {
  const { inquiryProduct, closeInquiry, brand } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    weddingDate: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!inquiryProduct) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId: inquiryProduct.id,
          productTitle: inquiryProduct.title
        })
      });

      const data = await response.json();
      const url = data.whatsappUrl || `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
        `*Bridal Inquiry - UK Fashion*\n• Dress: ${inquiryProduct.title}\n• Name: ${formData.name}\n• City: ${formData.city}\n• Date: ${formData.weddingDate || 'TBD'}\n• Notes: ${formData.notes || 'None'}`
      )}`;
      
      window.open(url, '_blank');
      closeInquiry();
    } catch (err) {
      // Fallback direct WhatsApp open
      const fallbackUrl = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
        `*Bridal Inquiry - UK Fashion*\n• Dress: ${inquiryProduct.title}\n• Name: ${formData.name}\n• City: ${formData.city}\n• Date: ${formData.weddingDate || 'TBD'}\n• Notes: ${formData.notes || 'None'}`
      )}`;
      window.open(fallbackUrl, '_blank');
      closeInquiry();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeInquiry}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c5a059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Bridal Consultation</span>
          </div>

          <h3 className="font-serif-luxury text-xl font-bold text-gray-900 mt-1">
            {inquiryProduct.title}
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            {inquiryProduct.dochType} • {inquiryProduct.fabric}
          </p>

          <div className="mb-4 aspect-video rounded overflow-hidden bg-gray-100">
            <img
              src={inquiryProduct.image || (inquiryProduct.images && inquiryProduct.images[0])}
              alt={inquiryProduct.title}
              className="w-full h-full object-cover"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fatima Khan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  City / Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quetta / London"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Wedding Date
                </label>
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Customization Notes
              </label>
              <textarea
                rows="2"
                placeholder="Preferred color changes, neckline, stitching preferences..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#111111] text-[#e4ce9e] hover:bg-[#c5a059] hover:text-white font-bold text-xs uppercase tracking-widest rounded transition flex items-center justify-center gap-2 mt-4 shadow-lg disabled:opacity-50"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{submitting ? 'Connecting...' : 'Send Inquiry on WhatsApp'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}