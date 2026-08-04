import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, X, Heart, Flower2, Sparkles, Check } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  currentPage: 'home' | 'flowers' | 'privacy' | 'orders';
  setCurrentPage: (page: 'home' | 'flowers' | 'privacy' | 'orders') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  user: UserType | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
  onOpenAuth,
  user,
  searchQuery,
  setSearchQuery
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#FDE2E4] shadow-sm py-2.5'
          : 'bg-[#FFF9F9]/90 backdrop-blur-sm py-3.5 border-b border-[#FDE2E4]'
      }`}
    >
      {/* Top Banner Notice */}
      <div className="hidden md:flex justify-center items-center gap-2 text-xs font-medium text-[#4A3B3B] bg-[#FDE2E4] py-1 px-4 mb-2 -mt-3.5">
        <Sparkles className="w-3.5 h-3.5 text-[#E86F80]" />
        <span>Complimentary Next-Day Delivery on orders over $60 — Use code <strong className="font-bold underline tracking-wide text-[#E86F80]">BLOOM10</strong> for 10% OFF</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <span className="text-2xl text-[#E86F80]">✿</span>
          <div>
            <span className="font-serif italic text-xl font-bold text-[#E86F80] block leading-none">
              FreshFlora
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#4A3B3B]/60 font-semibold block mt-0.5">
              Petals & Prose Boutique
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors relative py-1 ${
              currentPage === 'home'
                ? 'text-[#E86F80] font-bold border-b-2 border-[#E86F80]'
                : 'text-[#4A3B3B] hover:text-[#E86F80]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentPage('flowers')}
            className={`transition-colors relative py-1 ${
              currentPage === 'flowers'
                ? 'text-[#E86F80] font-bold border-b-2 border-[#E86F80]'
                : 'text-[#4A3B3B] hover:text-[#E86F80]'
            }`}
          >
            Flowers
          </button>

          {user && (
            <button
              onClick={() => {
                setCurrentPage('orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors relative py-1 ${
                currentPage === 'orders'
                  ? 'text-[#E86F80] font-bold border-b-2 border-[#E86F80]'
                  : 'text-[#4A3B3B] hover:text-[#E86F80]'
              }`}
            >
              Orders
            </button>
          )}

          {/* Quick Home Section Anchors */}
          <button
            onClick={() => navigateToSection('reviews')}
            className="text-[#4A3B3B] hover:text-[#E86F80] transition-colors py-1"
          >
            Reviews
          </button>

          <button
            onClick={() => navigateToSection('contact')}
            className="text-[#4A3B3B] hover:text-[#E86F80] transition-colors py-1"
          >
            Contact
          </button>

          <button
            onClick={() => setCurrentPage('privacy')}
            className={`transition-colors relative py-1 ${
              currentPage === 'privacy'
                ? 'text-[#E86F80] font-bold border-b-2 border-[#E86F80]'
                : 'text-[#4A3B3B]/70 hover:text-[#E86F80]'
            }`}
          >
            Privacy
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          
          {/* Search Trigger */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-white border border-[#FDE2E4] rounded-full px-3 py-1.5 shadow-sm">
                <Search className="w-4 h-4 text-[#E86F80] mr-2" />
                <input
                  type="text"
                  placeholder="Search roses, peonies..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentPage !== 'flowers' && e.target.value) {
                      setCurrentPage('flowers');
                    }
                  }}
                  autoFocus
                  className="w-36 sm:w-48 text-xs bg-transparent border-none focus:outline-none text-[#4A3B3B]"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 rounded-full text-[#4A3B3B] hover:text-[#E86F80] hover:bg-[#FDE2E4]/40 transition-colors"
                title="Search flowers"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Cart Trigger with Counter Badge */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center cursor-pointer p-2 rounded-full text-[#4A3B3B] hover:text-[#E86F80] hover:bg-[#FDE2E4]/40 transition-colors"
            title="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#4A3B3B]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E86F80] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Sign In / Auth Button matching design theme */}
          <button
            onClick={onOpenAuth}
            className="px-4 py-1.5 border border-[#E86F80] text-[#E86F80] text-xs font-medium uppercase tracking-tighter hover:bg-[#E86F80] hover:text-white transition-colors rounded-sm flex items-center gap-1.5"
            title={user ? `Logged in as ${user.name}` : 'Sign In'}
          >
            <User className="w-3.5 h-3.5" />
            <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-lg text-[#4A3B3B] hover:text-[#E86F80] hover:bg-[#FDE2E4]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#FDE2E4] px-4 pt-3 pb-6 space-y-3 mt-2 animate-fadeIn">
          <button
            onClick={() => {
              setCurrentPage('home');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md uppercase tracking-wider text-xs font-medium ${
              currentPage === 'home' ? 'bg-[#FDE2E4] text-[#E86F80] font-bold' : 'text-[#4A3B3B]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setCurrentPage('flowers');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md uppercase tracking-wider text-xs font-medium ${
              currentPage === 'flowers' ? 'bg-[#FDE2E4] text-[#E86F80] font-bold' : 'text-[#4A3B3B]'
            }`}
          >
            Flowers Catalog
          </button>

          {user && (
            <button
              onClick={() => {
                setCurrentPage('orders');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md uppercase tracking-wider text-xs font-medium ${
                currentPage === 'orders' ? 'bg-[#FDE2E4] text-[#E86F80] font-bold' : 'text-[#4A3B3B]'
              }`}
            >
              Order History
            </button>
          )}

          <button
            onClick={() => navigateToSection('reviews')}
            className="block w-full text-left px-3 py-2 rounded-md uppercase tracking-wider text-xs font-medium text-[#4A3B3B] hover:bg-[#FDE2E4]/50"
          >
            Recent Reviews
          </button>

          <button
            onClick={() => navigateToSection('contact')}
            className="block w-full text-left px-3 py-2 rounded-md uppercase tracking-wider text-xs font-medium text-[#4A3B3B] hover:bg-[#FDE2E4]/50"
          >
            Contact
          </button>

          <button
            onClick={() => {
              setCurrentPage('privacy');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md uppercase tracking-wider text-xs font-medium ${
              currentPage === 'privacy' ? 'bg-[#FDE2E4] text-[#E86F80] font-bold' : 'text-[#4A3B3B]'
            }`}
          >
            Privacy Policy
          </button>
        </div>
      )}
    </header>
  );
};
