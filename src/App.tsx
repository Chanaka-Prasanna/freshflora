import React, { useState, useEffect, useMemo } from 'react';
import { Flower, CartItem, User, Order, FilterState, Review } from './types';
import { REVIEWS as INITIAL_REVIEWS } from './data/reviews';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FlowersPage } from './pages/FlowersPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { OrdersPage } from './pages/OrdersPage';

import { FlowerDetailModal } from './components/FlowerDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'flowers' | 'privacy' | 'orders'>(() => {
    const path = window.location.pathname.replace('/', '');
    if (['flowers', 'privacy', 'orders'].includes(path)) {
      return path as any;
    }
    return 'home';
  });

  useEffect(() => {
    const path = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      if (['flowers', 'privacy', 'orders'].includes(path)) {
        setCurrentPage(path as any);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('freshflora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshflora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Modals & Drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);

  // Discount / Promo
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Auth User
  const [user, setUser] = useState<User | null>(() => {
    try {
      const token = localStorage.getItem('freshflora_token');
      if (!token) return null;
      const saved = localStorage.getItem('freshflora_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    try {
      localStorage.setItem('freshflora_user', JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('freshflora_user');
    localStorage.removeItem('freshflora_token');
  };

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    maxPrice: 0,
    availability: 'All',
    sortBy: 'popular',
    searchQuery: '',
  });

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      maxPrice: 0,
      availability: 'All',
      sortBy: 'popular',
      searchQuery: '',
    });
  };

  // Backend API Integration
  const [hotFlowers, setHotFlowers] = useState<Flower[]>([]);
  const [filteredFlowers, setFilteredFlowers] = useState<Flower[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    import('./services/api').then(({ api }) => {
      api.getHotProducts({ size: 20 }).then(setHotFlowers).catch(console.error);
    });
  }, []);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Reset pagination on filter change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (page === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      import('./services/api').then(({ api }) => {
        api.getProducts({ ...filters, page, size: 12 })
          .then(data => {
            if (page === 1) {
              setFilteredFlowers(data.items);
            } else {
              setFilteredFlowers(prev => {
                // Prevent duplicates by checking ids
                const existingIds = new Set(prev.map(f => f.id));
                const newItems = data.items.filter((f: Flower) => !existingIds.has(f.id));
                return [...prev, ...newItems];
              });
            }
            setHasMore(data.page < data.pages);
          })
          .catch(console.error)
          .finally(() => {
            setIsLoading(false);
            setIsFetchingMore(false);
          });
      });
    }, page === 1 ? 300 : 0);
    return () => clearTimeout(handler);
  }, [filters, page]);

  const handleLoadMore = () => {
    if (hasMore && !isFetchingMore && !isLoading) {
      setPage(p => p + 1);
    }
  };

  // Cart operations
  const handleAddToCart = (flower: Flower, selectedVase = false, customNote = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.flower.id === flower.id && item.selectedVase === selectedVase
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        if (customNote) updated[existingIndex].customNote = customNote;
        return updated;
      } else {
        return [...prev, { flower, quantity: 1, selectedVase, customNote }];
      }
    });
  };

  const handleBuyNow = (flower: Flower, selectedVase = false, customNote = '') => {
    handleAddToCart(flower, selectedVase, customNote);
    setCartDrawerOpen(false);
    if (!user) {
      setAuthModalOpen(true);
    } else {
      setCheckoutModalOpen(true);
    }
  };

  const handleUpdateCartQuantity = (flowerId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(flowerId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.flower.id === flowerId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (flowerId: string) => {
    setCartItems((prev) => prev.filter((item) => item.flower.id !== flowerId));
  };

  const handleProceedToCheckout = (discountAmount: number, promoCode: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setAppliedDiscount(discountAmount);
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleAuthError = () => {
    handleLogout();
    setCheckoutModalOpen(false);
    setAuthModalOpen(true);
  };

  const handleOrderComplete = (order: Order) => {
    // Clear cart on successful mock payment
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFF9F9] font-sans antialiased">
      
      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        user={user}
        searchQuery={filters.searchQuery}
        setSearchQuery={(query) => setFilters((prev) => ({ ...prev, searchQuery: query }))}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            flowers={hotFlowers}
            isLoading={isLoading}
            onAddToCart={(f) => handleAddToCart(f)}
            onBuyNow={(f) => handleBuyNow(f)}
            onQuickView={(f) => setSelectedFlower(f)}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            filteredFlowers={filteredFlowers}
            onNavigateToCatalog={() => {
              setCurrentPage('flowers');
              window.scrollTo(0, 0);
            }}
            onAddReview={handleAddReview}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isFetchingMore={isFetchingMore}
          />
        )}

        {currentPage === 'flowers' && (
          <FlowersPage
            flowers={filteredFlowers}
            isLoading={isLoading}
            onAddToCart={(f) => handleAddToCart(f)}
            onBuyNow={(f) => handleBuyNow(f)}
            onQuickView={(f) => setSelectedFlower(f)}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            filteredFlowers={filteredFlowers}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isFetchingMore={isFetchingMore}
          />
        )}

        {currentPage === 'privacy' && <PrivacyPage />}

        {currentPage === 'orders' && (
          <OrdersPage 
            onNavigateToCatalog={() => {
              setCurrentPage('flowers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Quick View / Flower Detail Modal */}
      <FlowerDetailModal
        flower={selectedFlower}
        onClose={() => setSelectedFlower(null)}
        onAddToCart={(f, vase, note) => handleAddToCart(f, vase, note)}
        onBuyNow={(f, vase, note) => handleBuyNow(f, vase, note)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Card Checkout Payment Modal (Dummy Mock Sandbox) */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        appliedDiscount={appliedDiscount}
        onOrderComplete={handleOrderComplete}
        onAuthError={handleAuthError}
      />

      {/* Sign In / Sign Up Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

    </div>
  );
}
