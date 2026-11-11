import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Bell, 
  Search, 
  Plus 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Customers', href: '/customers', icon: Users },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-text-primary">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-border-color bg-surface backdrop-blur-xl">
        <div className="flex h-20 flex-col justify-center px-6 border-b border-border-color">
          <span className="text-xs uppercase tracking-widest text-gold font-medium">Boutique Operations</span>
          <h1 className="text-lg font-grifter tracking-wider text-text-primary uppercase mt-0.5">
            Aalaya <span className="text-gold">Studio</span>
          </h1>
        </div>
        <nav className="flex-1 space-y-1.5 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 relative group ${
                  isActive 
                    ? 'bg-gradient-to-r from-gold/10 to-transparent text-gold border-l-2 border-gold font-semibold' 
                    : 'text-text-muted hover:text-text-primary hover:bg-white/[0.02]'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 transition-colors duration-300 ${isActive ? 'text-gold' : 'text-text-muted group-hover:text-text-primary'}`} />
                <span className="tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border-color bg-black/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-gold/40 flex items-center justify-center bg-gold/10 font-grifter text-gold text-sm">
              AS
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide">Studio Manager</p>
              <p className="text-[10px] text-text-muted">Operations Role</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-border-color bg-background/40 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search orders, clients, or products..."
                className="w-full rounded-full border border-border-color bg-surface/50 pl-11 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-full hover:bg-white/[0.04] text-text-muted hover:text-text-primary transition-all duration-300">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-gold" />
            </button>
            
            <div className="h-px bg-border-color w-6 rotate-90" />

            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 py-2.5 text-xs uppercase tracking-widest font-grifter text-background hover:opacity-95 transition-all duration-300 shadow-md shadow-gold/10">
              <Plus className="h-4 w-4 stroke-[3]" />
              New Order
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 bg-gradient-to-b from-background to-black/30">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
