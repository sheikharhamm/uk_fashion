import React, { useState } from 'react';
import { MessageCircle, Video, MapPin, Clock, Phone, Send } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { useProducts } from '../context/ProductContext';

export default function Contact() {
  const { brand } = useProducts();
  const [form, setForm] = useState({
    name: '',
    city: '',
    weddingDate: '',
    occasion: 'Barat Bridal',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          productTitle: `General Consultation - ${form.occasion}`
        })
      });

      const data = await res.json();
      const waUrl = data.whatsappUrl || `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
        `*General Bridal Consultation - UK Fashion*\n• Name: ${form.name}\n• City: ${form.city}\n• Date: ${form.weddingDate || 'TBD'}\n• Occasion: ${form.occasion}\n• Notes: ${form.notes}`
      )}`;

      window.open(waUrl, '_blank');
      setSuccess(true);
    } catch (err) {
      const fallbackUrl = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
        `*General Bridal Consultation - UK Fashion*\n• Name: ${form.name}\n• City: ${form.city}\n• Date: ${form.weddingDate || 'TBD'}\n• Occasion: ${form.occasion}\n• Notes: ${form.notes}`
      )}`;
      window.open(fallbackUrl, '_blank');
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const directWa = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Salam UK Fashion! I would like to schedule a custom bridal consultation.")}`;

  return (
    <div>
      {/* BANNER */}
      <section className="bg-[#111111] text-white py-16 border-b border-[#c5a059]/30 text-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-bold">
            Personalized Bridal Concierge
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mt-2">
            Custom Consultation & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-3 leading-relaxed">
            Let us craft the Balochi bridal ensemble of your dreams. Reach out directly on WhatsApp or Instagram.
          </p>
        </div>
      </section>

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* DIRECT CHANNELS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-serif-luxury text-lg font-bold text-gray-900 mb-4">
                Direct Contact Channels
              </h3>
              
              <div className="space-y-4 text-xs">
                
                <a
                  href={directWa}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 hover:border-emerald-400 flex items-center gap-4 transition block"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-900 block text-sm">
                      WhatsApp Consultation
                    </span>
                    <span className="text-emerald-700">
                      Direct messaging for custom sizing & fabric swatches ({brand.whatsappDisplay})
                    </span>
                  </div>
                </a>

                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-lg bg-purple-50 border border-purple-200 hover:border-purple-400 flex items-center gap-4 transition block"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-purple-900 block text-sm">
                      Instagram Direct Message
                    </span>
                    <span className="text-purple-700">
                      Follow {brand.instagramHandle} & send reference reels
                    </span>
                  </div>
                </a>

                <a
                  href={brand.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-400 flex items-center gap-4 transition block"
                >
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-sm">
                      TikTok Video Showcase
                    </span>
                    <span className="text-gray-600">
                      Watch Doch needlework close-ups and customer fittings
                    </span>
                  </div>
                </a>

              </div>
            </div>

            <div className="bg-[#111111] text-white p-6 rounded-lg border border-[#c5a059]/30">
              <h4 className="font-serif-luxury font-bold text-base text-[#c5a059] mb-2">
                Atelier Location
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                <MapPin className="w-4 h-4 inline-block text-[#c5a059] mr-1" />
                {brand.address}
              </p>
              <p className="text-xs text-gray-400">
                <Clock className="w-4 h-4 inline-block text-[#c5a059] mr-1" />
                Timings: Monday to Saturday, 11:00 AM - 9:00 PM PKT
              </p>
            </div>
          </div>

          {/* INQUIRY FORM (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-serif-luxury text-xl font-bold text-gray-900 mb-2">
              Send Custom Bridal Inquiry
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill in your wedding details to initiate a bespoke consultation with our senior bridal designer.
            </p>

            {success && (
              <div className="p-4 mb-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs">
                Inquiry registered! WhatsApp has been opened with your consultation details.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Baloch"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    City & Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London, UK / Quetta"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Wedding / Event Date
                  </label>
                  <input
                    type="date"
                    value={form.weddingDate}
                    onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Occasion Type
                  </label>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none bg-white text-gray-700"
                  >
                    <option value="Barat Bridal">Barat Bridal (Heavy Red/Maroon)</option>
                    <option value="Walima">Walima (Soft Ivory / Pastel)</option>
                    <option value="Mehndi">Mehndi / Mayun (Haft-Rang / Mirrors)</option>
                    <option value="Custom Bespoke">Other Custom Couture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Your Requirements & Preferred Doch Details
                </label>
                <textarea
                  rows="4"
                  placeholder="Mention fabric preferences, neck styles, pocket details, or references from @kj_.collection..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#111111] text-[#e4ce9e] hover:bg-[#c5a059] hover:text-white font-bold text-xs uppercase tracking-widest rounded-lg transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{loading ? 'Submitting...' : 'Send Direct Consultation on WhatsApp'}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}