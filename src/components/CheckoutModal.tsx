import React, { useState } from 'react';
import { X, CreditCard, Lock, ShieldCheck, CheckCircle2, Truck, Calendar, MapPin, Download, Sparkles, ArrowLeft, Loader2, Check, RefreshCw } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscount: number;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscount,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing' | 'success'>('shipping');

  // Form states
  const [recipientName, setRecipientName] = useState('Sanduni Fernando');
  const [streetAddress, setStreetAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [postalCode, setPostalCode] = useState('97477');
  const [deliveryDate, setDeliveryDate] = useState('2026-08-05');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Please leave near the front door in the shade.');

  // Card states (Dummy Mock)
  const [cardName, setCardName] = useState('Sanduni Fernando');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('882');

  // Processing simulation state
  const [processingStatus, setProcessingStatus] = useState('Encrypting transaction payload...');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Price totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.flower.price + (item.selectedVase ? 14 : 0)) * item.quantity;
  }, 0);

  const shippingFee = subtotal >= 60 ? 0 : 7.99;
  const grandTotal = Math.max(0, subtotal - appliedDiscount + shippingFee);

  // Auto-format card numbers nicely
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    const formatted = val.replace(/(\d{4})/g, 'Rs. 100 ').trim();
    setCardNumber(formatted || '4532 ');
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardExpiry(val.substring(0, 5));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    // Simulate realistic card processing stages
    setTimeout(() => {
      setProcessingStatus('Verifying dummy card security code...');
    }, 1200);

    setTimeout(() => {
      setProcessingStatus('Authorizing Rs. ' + grandTotal.toFixed(2) + ' payment with issuing bank...');
    }, 2400);

    setTimeout(async () => {
      setProcessingStatus('Securing delivery reservation...');
      
      try {
        const { api } = await import('../services/api');
        const orderData = {
          total_amount: grandTotal,
          items: cartItems.map(item => ({
            product_id: item.flower.id,
            quantity: item.quantity,
            price: item.flower.price
          }))
        };
        
        const backendOrder = await api.createOrder(orderData);
        
        const newOrder: Order = {
          id: backendOrder.id,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          items: [...cartItems],
          subtotal,
          discount: appliedDiscount,
          shipping: shippingFee,
          total: grandTotal,
          recipientName,
          shippingAddress: `${streetAddress}, ${city}, ${postalCode}`,
          deliveryDate,
          cardLast4: cardNumber.slice(-4) || '8892',
          status: 'Preparing Blooms',
          trackingNumber: 'TRK-' + Math.floor(10000000 + Math.random() * 90000000)
        };

        setCompletedOrder(newOrder);
        onOrderComplete(newOrder);
        setStep('success');
      } catch (error) {
        console.error("Failed to create order:", error);
        alert("Please login to place an order!");
        setStep('payment');
      }
    }, 3600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#FFF9F9] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-[#F8D7E3] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#FDE2E4] bg-[#FDE2E4]/40 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E86F80] text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-[#4A3B3B]">
                {step === 'shipping' && 'Step 1: Recipient & Delivery Details'}
                {step === 'payment' && 'Step 2: Mock Card Payment'}
                {step === 'processing' && 'Processing Mock Payment...'}
                {step === 'success' && 'Order Confirmed!'}
              </h2>
              <p className="text-[10px] text-[#4A3B3B]/70">
                {step !== 'success' && '256-Bit Encrypted Secure Checkout • Dummy Mock Sandbox'}
              </p>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">

          {/* STEP 1: SHIPPING & RECIPIENT */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              
              <div className="bg-[#FFF0F5] p-3 rounded-xl border border-[#F8D7E3] text-xs text-[#8C1C40] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C83863]" />
                <span>Hand-delivered in temperature-controlled floral vans for peak freshness.</span>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Street Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Zip / Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Preferred Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Delivery Driver Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Gate code, porch request, ring bell..."
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                />
              </div>

              {/* Order Total Preview */}
              <div className="pt-4 border-t border-[#FCE8EF] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8C5A6A] block">Total Amount Due</span>
                  <span className="font-serif text-2xl font-bold text-[#8C1C40]">
                    Rs. {grandTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-full bg-[#E86F80] hover:bg-[#d65f70] text-white font-bold text-xs shadow-md transition-all"
                >
                  Continue to Mock Payment →
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: CARD PAYMENT FORM (MOCK DUMMY) */}
          {step === 'payment' && (
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              
              <div className="bg-[#FFF0F5] p-3 rounded-xl border border-[#F8D7E3] text-xs text-[#8C1C40] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C83863]" />
                  <span>Test Mode active: All card payments are simulated.</span>
                </span>
                <span className="font-bold text-[10px] bg-white px-2 py-0.5 rounded border border-[#F8D7E3]">
                  DEMO CARD
                </span>
              </div>

              {/* Dummy Card Visual graphic */}
              <div className="bg-gradient-to-tr from-[#3D1E28] via-[#8C1C40] to-[#E05280] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-pink-200 block">FreshFlora Vault</span>
                    <span className="font-serif font-bold text-lg">Debit / Credit Card</span>
                  </div>
                  <CreditCard className="w-8 h-8 text-pink-200 opacity-80" />
                </div>
                <div className="font-mono text-lg tracking-widest mb-4">
                  {cardNumber || '4532 •••• •••• 8892'}
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-pink-200 block uppercase">Cardholder</span>
                    <span>{cardName || 'NIMAL PERERA'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-pink-200 block uppercase">Expires</span>
                    <span>{cardExpiry || '08/28'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Card Number (Simulated) *
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className="w-full text-xs p-3 font-mono rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    Expiration Date *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={handleCardExpiryChange}
                    maxLength={5}
                    className="w-full text-xs p-3 font-mono rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                    CVC / CVV *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.substring(0, 4))}
                    maxLength={4}
                    className="w-full text-xs p-3 font-mono rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-gray-500">
                <Lock className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Payment details are mock sandbox tests and are never saved or charged.</span>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-[#FCE8EF] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="flex items-center gap-1 text-xs text-[#8C5A6A] font-semibold hover:text-black"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-[#C83863] hover:bg-[#B02852] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Pay Rs. {grandTotal.toFixed(2)} (Simulate)
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SIMULATED PAYMENT PROCESSING LOADER */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-[#FCE8EF] border-t-[#C83863] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  🌸
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#3D1E28] mb-2">
                  Processing Your Payment
                </h3>
                <p className="text-xs text-[#C83863] font-mono font-semibold bg-[#FFF0F5] py-2 px-4 rounded-full max-w-sm mx-auto border border-[#F8D7E3] animate-pulse">
                  {processingStatus}
                </p>
              </div>

              <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                Please keep this browser window open while we reserve your fresh floral blooms and confirm the transaction.
              </p>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED RECEIPT */}
          {step === 'success' && completedOrder && (
            <div className="space-y-6 text-center animate-fadeIn">
              
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] flex items-center justify-center mx-auto text-2xl shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-[#2E7D32]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full border border-[#C8E6C9]">
                  Payment Approved • Order #{completedOrder.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D1E28] mt-3 mb-1">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-[#735A63] max-w-sm mx-auto">
                  Your floral arrangement is being hand-crafted by our master florists and will be delivered on <strong>{completedOrder.deliveryDate}</strong>.
                </p>
              </div>

              {/* Printable Receipt Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#F8D7E3] text-left text-xs space-y-3 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-[#FCE8EF]">
                  <div>
                    <span className="text-gray-400 text-[10px] block">RECIPIENT</span>
                    <strong className="text-[#3D1E28]">{completedOrder.recipientName}</strong>
                    <span className="block text-gray-500 text-[11px]">{completedOrder.shippingAddress}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-[10px] block">TRACKING CODE</span>
                    <strong className="font-mono text-[#C83863]">{completedOrder.trackingNumber}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Items Ordered</span>
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-[#3D1E28]">
                        {item.quantity}x {item.flower.title} {item.selectedVase && '(+ Glass Vase)'}
                      </span>
                      <span className="font-semibold text-[#8C1C40]">
                        Rs. {((item.flower.price + (item.selectedVase ? 1400 : 0)) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#FCE8EF] space-y-1">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${completedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-[#2E7D32]">
                      <span>Discount</span>
                      <span>-${completedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>{completedOrder.shipping === 0 ? 'FREE' : `$${completedOrder.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#3D1E28] pt-1 border-t border-[#F8D7E3]">
                    <span>Total Paid</span>
                    <span className="text-[#8C1C40]">${completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    const textContent = `FreshFlora Order Receipt #${completedOrder.id}\nRecipient: ${completedOrder.recipientName}\nAddress: ${completedOrder.shippingAddress}\nTotal Paid: Rs. ${completedOrder.total.toFixed(2)}\nTracking: ${completedOrder.trackingNumber}`;
                    const blob = new Blob([textContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `FreshFlora_Receipt_${completedOrder.id}.txt`;
                    a.click();
                  }}
                  className="w-full py-3 rounded-xl bg-[#FFF0F5] hover:bg-[#FCE8EF] text-[#8C1C40] border border-[#F8D7E3] font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Receipt
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-[#C83863] hover:bg-[#B02852] text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Back to Boutique
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
