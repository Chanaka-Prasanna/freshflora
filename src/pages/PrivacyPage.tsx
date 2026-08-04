import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Check, Heart, Mail } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#FDE2E4] px-4 py-1.5 rounded-full border border-[#FAD2D4] mb-3">
          <ShieldCheck className="w-4 h-4 text-[#E86F80]" />
          <span className="text-xs font-bold text-[#E86F80] tracking-wide">
            Your Data & Trust Protection Policy
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A3B3B] mb-3">
          Privacy & Data Security Policy
        </h1>
        <p className="text-xs text-[#4A3B3B]/70">
          Last Updated: August 2026 • FloraCharm Florist Boutique
        </p>
      </div>

      {/* Main Document Content */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#FDE2E4] shadow-sm space-y-8 text-xs sm:text-sm text-[#4A3B3B] leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#4A3B3B] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#E86F80]" />
            1. Our Commitment to Your Privacy
          </h2>
          <p>
            At <strong>FloraCharm</strong>, we treat your personal information and gift message details with the utmost care and respect. Whether you are sending roses to a loved one or ordering custom event arrangements, we ensure your recipient details, payment information, and greeting card messages are kept 100% confidential.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#3D1E28] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C83863]" />
            2. Information We Collect
          </h2>
          <p>
            To fulfill your fresh flower orders efficiently, we collect the following essential information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Order & Delivery Info:</strong> Recipient name, delivery address, phone number, and preferred delivery date.</li>
            <li><strong>Payment Details:</strong> Simulated mock card transactions processed securely in memory without persistent storage of unencrypted raw financial credentials.</li>
            <li><strong>Gift Notes:</strong> Custom handwritten card text created solely for inclusion with your floral delivery.</li>
            <li><strong>Account Preferences:</strong> Saved email and account details for tracking past floral orders and re-ordering favorite bouquets.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#3D1E28] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#C83863]" />
            3. How We Use Your Data
          </h2>
          <p>
            Your information is strictly used to process flower deliveries, notify you of delivery status updates, and provide customer support. We <strong>never sell, rent, or trade</strong> your personal data to third-party advertisers or data brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#3D1E28] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C83863]" />
            4. Security Standards & Mock Payments
          </h2>
          <p>
            All checkout workflows utilize 256-bit SSL encryption standards. In this online showcase, all card payments are executed as simulated dummy sandboxes. No real bank accounts or actual credit cards are charged.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#3D1E28] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#C83863]" />
            5. Contact Our Privacy Concierge
          </h2>
          <p>
            If you have questions regarding your data or wish to request data removal from our customer database, please email our privacy team at <a href="mailto:privacy@floracharm.com" className="text-[#C83863] font-bold underline">privacy@floracharm.com</a> or write to FloraCharm Florist, 428 Magnolia Blossom Ave, San Francisco, CA.
          </p>
        </section>

      </div>

    </div>
  );
};
