import { useState } from 'react';
import { Search, Mail, Phone, MapPin, ChevronRight, Users } from 'lucide-react';

const MOCK_CUSTOMERS = [
  { 
    id: 'CUST-001', 
    name: 'Sarah Jenkins', 
    email: 'sarah.j@example.com', 
    phone: '+1 (555) 123-4567', 
    address: '123 Silk Road, NY 10001',
    totalSpend: '$845.00',
    orders: 4,
    lastOrder: 'Oct 12, 2026',
    preferences: ['Gold Zardosi', 'Bridal Themes']
  },
  { 
    id: 'CUST-002', 
    name: 'Priya Sharma', 
    email: 'priya.s@example.com', 
    phone: '+1 (555) 987-6543', 
    address: '456 Lotus Ave, CA 90210',
    totalSpend: '$1,200.00',
    orders: 6,
    lastOrder: 'Oct 13, 2026',
    preferences: ['Statement Pieces', 'Ruby']
  },
  { 
    id: 'CUST-003', 
    name: 'Emma Watson', 
    email: 'emma.w@example.com', 
    phone: '+1 (555) 555-5555', 
    address: '789 Thames St, London UK',
    totalSpend: '$210.00',
    orders: 2,
    lastOrder: 'Oct 11, 2026',
    preferences: ['Minimalist']
  }
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-grifter tracking-wide text-text-primary">Customer CRM</h2>
          <p className="text-text-muted mt-1">Manage customer profiles and order history.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-md border border-border-color bg-surface pl-10 pr-4 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="rounded-xl border border-border-color bg-surface p-6 shadow-sm hover:border-primary/30 transition-colors group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-grifter text-xl">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-grifter text-lg text-text-primary">{customer.name}</h3>
                  <span className="text-xs text-text-muted">{customer.id}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <Mail className="h-4 w-4" />
                {customer.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <Phone className="h-4 w-4" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <MapPin className="h-4 w-4" />
                {customer.address}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border-color grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-muted mb-1">Total Spend</p>
                <p className="font-grifter text-primary text-lg">{customer.totalSpend}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Total Orders</p>
                <p className="font-grifter text-text-primary text-lg">{customer.orders}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {customer.preferences.map(pref => (
                <span key={pref} className="inline-flex items-center rounded-full bg-background border border-border-color px-2.5 py-0.5 text-xs text-text-muted">
                  {pref}
                </span>
              ))}
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-md bg-background py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors border border-border-color hover:border-primary group-hover:border-primary/50">
              View Full History
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="flex-1 rounded-xl border border-border-color bg-surface flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Users className="h-12 w-12 text-border-color mx-auto mb-4" />
            <p className="text-text-muted">No customers found.</p>
          </div>
        </div>
      )}
    </div>
  );
}
