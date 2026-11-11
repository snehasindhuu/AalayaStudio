import { useState } from 'react';
import { Search, Filter, MoreVertical, AlertCircle } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'ORD-2094', customer: 'Sarah Jenkins', amount: '$145.00', status: 'Crafting', date: 'Oct 12, 2026', items: 3, notes: 'Wrist size 6.5 inches. Wants extra gold zardosi on the center bangle.' },
  { id: 'ORD-2095', customer: 'Priya Sharma', amount: '$320.00', status: 'Received', date: 'Oct 13, 2026', items: 1, notes: 'Bridal theme matching (Burgundy/Gold).' },
  { id: 'ORD-2096', customer: 'Emma Watson', amount: '$85.00', status: 'Ready', date: 'Oct 11, 2026', items: 2, notes: '' },
  { id: 'ORD-2097', customer: 'Aisha Patel', amount: '$210.00', status: 'Shipped', date: 'Oct 10, 2026', items: 5, notes: 'Gift box required with personalized note.' },
  { id: 'ORD-2098', customer: 'Mia Thompson', amount: '$65.00', status: 'Delivered', date: 'Oct 05, 2026', items: 1, notes: '' },
];

const STATUS_COLORS: Record<string, string> = {
  'Received': 'bg-surface text-text-primary border-border-color',
  'Crafting': 'bg-status-pending/10 text-status-pending border-status-pending/20',
  'Ready': 'bg-primary/10 text-primary border-primary/20',
  'Shipped': 'bg-status-completed/10 text-status-completed border-status-completed/20',
  'Delivered': 'bg-surface text-text-muted border-border-color opacity-70',
};

export default function Orders() {
  const [filter, setFilter] = useState('All');

  const filteredOrders = filter === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status === filter);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-grifter tracking-wide text-text-primary">Orders Pipeline</h2>
          <p className="text-text-muted mt-1">Manage and track customer orders.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Filter orders..."
              className="w-64 rounded-md border border-border-color bg-surface pl-10 pr-4 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-md border border-border-color bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface/80 transition-colors">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>
      
      {/* Status Tabs */}
      <div className="flex space-x-1 rounded-lg bg-surface p-1 border border-border-color w-max">
        {['All', 'Received', 'Crafting', 'Ready', 'Shipped', 'Delivered'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              filter === status 
                ? 'bg-background text-primary shadow-sm' 
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="flex-1 rounded-xl border border-border-color bg-surface shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm text-text-primary">
            <thead className="bg-background/50 text-text-muted border-b border-border-color">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-background/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-medium">{order.id}</span>
                    {order.notes && (
                      <div className="mt-2 flex items-start gap-2 text-xs text-gold-light bg-gold/10 p-2 rounded-md border border-gold/20">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span className="italic">{order.notes}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-text-muted">{order.date}</td>
                  <td className="px-6 py-4 font-medium">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-text-muted hover:text-primary transition-colors">
                      <MoreVertical className="h-5 w-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No orders found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
