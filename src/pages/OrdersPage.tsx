import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2, ChevronRight, Gift } from 'lucide-react';

interface OrderItem {
  product_id: string;
  quantity: int;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  items: OrderItem[];
  status: string;
}

interface OrdersPageProps {
  onNavigateToCatalog: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigateToCatalog }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { api } = await import('../services/api');
        const data = await api.getOrders();
        // Sort orders by newest first
        const sorted = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setOrders(sorted);
      } catch (err: any) {
        setError(err.message || 'Failed to load orders.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'delivered':
        return 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]';
      case 'pending':
        return 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]';
      case 'shipped':
        return 'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#4A3B3B] mb-3">
          Your Order History
        </h1>
        <p className="text-xs sm:text-sm text-[#4A3B3B]/70">
          Track your fresh bloom deliveries and view past artisan arrangements.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 mx-auto border-4 border-[#FDE2E4] border-t-[#E86F80] rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-bold text-[#4A3B3B]">Fetching your orders...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#FAD2D4] p-8 shadow-sm">
          <div className="text-4xl mb-3">🥀</div>
          <h3 className="font-serif text-xl font-bold text-[#4A3B3B] mb-2">
            Oops! Something went wrong.
          </h3>
          <p className="text-xs text-[#4A3B3B]/70 max-w-sm mx-auto mb-6">
            {error}
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#FAD2D4] p-8 shadow-sm">
          <div className="w-16 h-16 bg-[#FFF0F5] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FAD2D4]">
            <Gift className="w-8 h-8 text-[#E86F80]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#4A3B3B] mb-2">
            No Orders Yet
          </h3>
          <p className="text-xs text-[#4A3B3B]/70 max-w-sm mx-auto mb-6">
            You haven't placed any floral orders yet. Browse our exquisite collection to find your first bouquet!
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="px-6 py-3 rounded-full bg-[#E86F80] text-white font-bold text-xs shadow-md hover:bg-[#d65f70] transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order) => {
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#FDE2E4] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] text-9xl pointer-events-none transform group-hover:scale-110 transition-transform duration-500">
                  🌸
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold text-[#8C1C40] bg-[#FFF0F5] px-2 py-0.5 rounded border border-[#FAD2D4]">
                        #{order.id.substring(0, 8).toUpperCase()}...
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#4A3B3B]/70 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(order.created_at)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-[#FDE2E4]">
                    <div>
                      <span className="text-[10px] text-[#4A3B3B]/60 uppercase tracking-wider font-bold block mb-0.5">
                        Items
                      </span>
                      <span className="text-sm font-semibold text-[#4A3B3B]">
                        {totalItems} {totalItems === 1 ? 'Bouquet' : 'Bouquets'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#4A3B3B]/60 uppercase tracking-wider font-bold block mb-0.5">
                        Total
                      </span>
                      <span className="font-serif text-xl font-bold text-[#E86F80]">
                        Rs. {order.total_amount.toFixed(2)}
                      </span>
                    </div>

                    <button className="w-10 h-10 rounded-full bg-[#FFF0F5] border border-[#FAD2D4] flex items-center justify-center text-[#E86F80] group-hover:bg-[#E86F80] group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
