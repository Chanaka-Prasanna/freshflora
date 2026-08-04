import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, Check, Heart, Shield } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const { api } = await import('../services/api');
      if (mode === 'signup') {
        const data = await api.register({ name, email, password });
        localStorage.setItem('freshflora_token', data.access_token);
        onLogin({ id: 'new_user', name, email });
      } else {
        const data = await api.login({ email, password });
        localStorage.setItem('freshflora_token', data.access_token);
        onLogin({ id: 'user', name: email.split('@')[0], email });
      }
      onClose();
    } catch (err: any) {
      try {
        const parsed = JSON.parse(err.message);
        setError(parsed.detail || 'Authentication failed');
      } catch {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FFF9F9] rounded-3xl max-w-md w-full border border-[#F8D7E3] shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 bg-[#FDE2E4]/40 border-b border-[#FDE2E4] text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 rounded-full bg-[#E86F80] text-white flex items-center justify-center mx-auto mb-2 text-lg font-bold shadow-sm">
            🌸
          </div>

          <h2 className="font-serif text-xl font-bold text-[#4A3B3B]">
            {currentUser ? 'Your Account' : (mode === 'signin' ? 'Welcome Back' : 'Join Our Flower Club')}
          </h2>
          <p className="text-xs text-[#4A3B3B]/70 mt-0.5">
            {currentUser 
              ? 'Manage saved delivery addresses and floral order history' 
              : 'Sign in to access VIP florist perks and exclusive discounts'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {currentUser ? (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FCE8EF] border-2 border-[#F8D7E3] text-[#C83863] text-2xl font-bold flex items-center justify-center mx-auto shadow-inner">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#3D1E28]">{currentUser.name}</h3>
                <p className="text-xs text-[#735A63]">{currentUser.email}</p>
                <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full border border-[#C8E6C9]">
                  VIP Bloom Member
                </span>
              </div>

              <div className="pt-4 border-t border-[#FCE8EF] space-y-2">
                <button
                  onClick={onLogout}
                  className="w-full py-3 rounded-xl bg-[#FFF0F5] hover:bg-[#FCE8EF] text-[#C83863] font-bold text-xs border border-[#F8D7E3] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Tab Switcher */}
              <div className="flex bg-[#FFF0F5] p-1 rounded-xl border border-[#F8D7E3] mb-6">
                <button
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === 'signin'
                      ? 'bg-white text-[#C83863] shadow-sm'
                      : 'text-[#8C5A6A] hover:text-[#3D1E28]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === 'signup'
                      ? 'bg-white text-[#C83863] shadow-sm'
                      : 'text-[#8C5A6A] hover:text-[#3D1E28]'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Rose Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="rose@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-[#C83863] font-semibold bg-[#FCE8EF] p-2 rounded-lg text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 rounded-full text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2
                    ${isSubmitting ? 'bg-[#d65f70] opacity-80 cursor-not-allowed' : 'bg-[#E86F80] hover:bg-[#d65f70]'}`}
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {mode === 'signin' ? 'Sign In to Account' : 'Create Free Account'}
                </button>
              </form>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
