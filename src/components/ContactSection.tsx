import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSenderName('');
      setSenderEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-[#FFF9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Boutique Information & Social Links */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83863] bg-[#FCE8EF] px-3.5 py-1 rounded-full border border-[#F8D7E3] inline-block mb-3">
              Get in Touch with Master Florists
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D1E28] mb-4">
              Visit Our Flagship Florist Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#735A63] mb-8 leading-relaxed">
              Have questions about custom bridal bouquets, corporate event floral installations, or bulk flower deliveries? Drop by our charming boutique studio or send us a message!
            </p>

            {/* Contact Details List */}
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] border border-[#F8D7E3] text-[#C83863] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D1E28]">Boutique Address</h4>
                  <p className="text-xs text-[#735A63]">428 Galle Road, Kollupitiya, Colombo 03, Sri Lanka</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] border border-[#F8D7E3] text-[#C83863] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D1E28]">Telephone & Hotline</h4>
                  <p className="text-xs text-[#735A63]">+94 77 123 4567 • 011 234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] border border-[#F8D7E3] text-[#C83863] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D1E28]">Customer Support Email</h4>
                  <p className="text-xs text-[#735A63]">concierge@freshflora.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] border border-[#F8D7E3] text-[#C83863] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D1E28]">Boutique Opening Hours</h4>
                  <p className="text-xs text-[#735A63]">Monday – Saturday: 7:00 AM – 7:30 PM | Sunday: 8:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#3D1E28] mb-3">
                Connect With Our Floral Artists
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full bg-[#FFF0F5] hover:bg-[#C83863] text-[#C83863] hover:text-white border border-[#F8D7E3] flex items-center justify-center transition-all shadow-sm"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="#facebook"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full bg-[#FFF0F5] hover:bg-[#C83863] text-[#C83863] hover:text-white border border-[#F8D7E3] flex items-center justify-center transition-all shadow-sm"
                  title="Follow on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="#twitter"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full bg-[#FFF0F5] hover:bg-[#C83863] text-[#C83863] hover:text-white border border-[#F8D7E3] flex items-center justify-center transition-all shadow-sm"
                  title="Follow on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                <a
                  href="#whatsapp"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full bg-[#FFF0F5] hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#F8D7E3] flex items-center justify-center transition-all shadow-sm"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="bg-white p-8 rounded-3xl border border-[#F8D7E3] shadow-rose-soft relative">
            <h3 className="font-serif text-2xl font-bold text-[#3D1E28] mb-1">
              Send a Custom Floral Inquiry
            </h3>
            <p className="text-xs text-[#735A63] mb-6">
              Need a bespoke floral design or help choosing stems? Our senior florist replies within 1 hour.
            </p>

            {formSubmitted ? (
              <div className="bg-[#E8F5E9] p-6 rounded-2xl border border-[#C8E6C9] text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-[#2E7D32] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#2E7D32]">Inquiry Received!</h4>
                <p className="text-xs text-gray-600">
                  Thank you, <strong>{senderName}</strong>. A master florist will reach out to <em>{senderEmail}</em> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nimal Perera"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-[#FFF0F5] text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nimal@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-[#FFF0F5] text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Your Message or Bouquet Customization Request *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your event, preferred flower colors, or delivery date requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-[#FFF0F5] text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C83863] hover:bg-[#B02852] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry to Florist
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
