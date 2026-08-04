import React from 'react';
import { Flower2, Heart, ShieldCheck, Truck, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: 'home' | 'flowers' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-[#4A3B3B] text-white pt-12 pb-6 border-t border-[#FDE2E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E86F80] flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-xs text-white">Same-Day Fresh Delivery</h4>
              <p className="text-[11px] text-gray-300">Order before 2 PM for local delivery</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E86F80] flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-xs text-white">7-Day Freshness Guarantee</h4>
              <p className="text-[11px] text-gray-300">Guaranteed farm-fresh stems</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E86F80] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-xs text-white">Hand-Tied Eco Wrapping</h4>
              <p className="text-[11px] text-gray-300">100% biodegradable craft paper</p>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl text-[#E86F80]">✿</span>
              <span className="font-serif italic text-xl font-bold text-[#E86F80] tracking-tight">FloraCharm</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              An artisan flower boutique dedicated to spreading joy through fresh Ecuadorian roses, Dutch tulips, and seasonal garden blooms.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif font-bold text-xs text-white uppercase tracking-wider mb-3">
              Shop & Explore
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E86F80] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('flowers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E86F80] transition-colors"
                >
                  Flowers Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E86F80] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="font-serif font-bold text-xs text-white uppercase tracking-wider mb-3">
              Popular Flowers
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>Ecuadorian Long-Stem Roses</li>
              <li>Coral & Blush Peonies</li>
              <li>Crisp Dutch Tulips</li>
              <li>Stargazer White Lilies</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-xs text-white uppercase tracking-wider mb-2">
              Floral VIP Club
            </h4>
            <p className="text-xs text-gray-300 mb-3">
              Subscribe for secret bloom drops and 10% off your first order.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full text-xs px-3 py-1.5 rounded bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-[#E86F80]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded bg-[#E86F80] hover:bg-[#d65f70] text-white font-bold text-xs transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
          <p>© 2026 FloraCharm (Petals & Prose). Handcrafted with care.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-white">
              Privacy
            </button>
            <span>•</span>
            <button onClick={() => setCurrentPage('flowers')} className="hover:text-white">
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
