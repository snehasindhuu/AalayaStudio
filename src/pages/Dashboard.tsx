import { useState } from 'react';
import { sendDummyOrderToWebhook } from '../App';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const revenueData = [
  { name: 'Jan', total: 4200 },
  { name: 'Feb', total: 5100 },
  { name: 'Mar', total: 4800 },
  { name: 'Apr', total: 6300 },
  { name: 'May', total: 7200 },
  { name: 'Jun', total: 8500 },
  { name: 'Jul', total: 12450 },
];

const categoryData = [
  { name: 'Silk Thread Bangles', value: 45 },
  { name: 'Statement Bracelets', value: 25 },
  { name: 'Bridal Jewelry Sets', value: 20 },
  { name: 'Gift Boxes', value: 10 },
];

const COLORS = ['#3F4EFF', '#D4AF37', '#10B981', '#F59E0B'];

export default function Dashboard() {
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [webhookFeedback, setWebhookFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleTriggerWebhook = async () => {
    setWebhookStatus('loading');
    setWebhookFeedback(null);
    try {
      const response = await sendDummyOrderToWebhook();
      setWebhookStatus('success');
      setWebhookFeedback({
        type: 'success',
        message: typeof response === 'object' ? JSON.stringify(response) : String(response) || 'Success! Dummy order payload was dispatched.'
      });
      setTimeout(() => setWebhookStatus('idle'), 4000);
    } catch (err: any) {
      setWebhookStatus('error');
      setWebhookFeedback({
        type: 'error',
        message: err?.message || 'Unknown error occurred while triggering the webhook.'
      });
      setTimeout(() => setWebhookStatus('idle'), 6000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border-color pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">Executive Analytics</span>
          <h2 className="text-3xl font-grifter tracking-wide text-text-primary mt-1">Boutique Overview</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-text-muted italic font-medium">Real-time handcrafted sales performance</p>
          <button
            onClick={handleTriggerWebhook}
            disabled={webhookStatus === 'loading'}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg ${
              webhookStatus === 'loading'
                ? 'bg-surface text-text-muted border-border-color cursor-not-allowed opacity-80'
                : webhookStatus === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-emerald-500/5'
                : webhookStatus === 'error'
                ? 'bg-red-500/10 text-red-400 border-red-500/40 shadow-red-500/5'
                : 'bg-gold/5 text-gold border-gold/40 hover:bg-gold/15 shadow-gold/5 cursor-pointer'
            }`}
          >
            {webhookStatus === 'loading' && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {webhookStatus === 'success' && <CheckCircle className="h-3.5 w-3.5" />}
            {webhookStatus === 'error' && <AlertCircle className="h-3.5 w-3.5" />}
            {webhookStatus === 'idle' && <Send className="h-3.5 w-3.5" />}
            Trigger Test Order
          </button>
        </div>
      </div>

      {webhookFeedback && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
          webhookFeedback.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {webhookFeedback.type === 'success' ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className="font-semibold text-sm">
              {webhookFeedback.type === 'success' ? 'Webhook Dispatched Successfully!' : 'Webhook Dispatch Failed'}
            </h4>
            <p className="text-xs text-text-muted mt-1 font-mono break-all max-h-24 overflow-y-auto">
              {webhookFeedback.message}
            </p>
          </div>
          <button 
            onClick={() => setWebhookFeedback(null)} 
            className="text-xs hover:underline uppercase tracking-wider font-semibold opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Featured Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-72 rounded-2xl border border-gold/15 bg-surface backdrop-blur-md overflow-hidden relative group shadow-2xl transition-all duration-500 hover:border-gold/30">
          <img src="/bangles.png" alt="Silk Thread Bangles" className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent flex items-end p-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Artisanal</span>
              <h3 className="text-2xl font-grifter text-text-primary tracking-wide mt-1">Silk Thread Collection</h3>
              <p className="text-xs text-text-muted mt-1.5 font-medium">Finest craftsmanship, customized to precision.</p>
            </div>
          </div>
        </div>
        <div className="h-72 rounded-2xl border border-gold/15 bg-surface backdrop-blur-md overflow-hidden relative group shadow-2xl transition-all duration-500 hover:border-gold/30">
          <img src="/bridal.png" alt="Bridal Jewelry Sets" className="object-cover w-full h-full opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent flex items-end p-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Bespoke</span>
              <h3 className="text-2xl font-grifter text-text-primary tracking-wide mt-1">Bridal Statement Sets</h3>
              <p className="text-xs text-text-muted mt-1.5 font-medium">Traditional designs tailored for elegance.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Revenue', value: '$12,450', trend: '+15.2% MoM' },
          { label: 'Active Orders', value: '45', trend: '12 In Crafting' },
          { label: 'Units Sold', value: '382', trend: '+12.4% MoM' },
          { label: 'Avg Order Value', value: '$85.50', trend: '+4.1% MoM' },
        ].map((kpi, i) => (
          <div key={i} className="rounded-xl border border-border-color bg-surface backdrop-blur-md p-6 shadow-xl transition-all duration-500 hover:border-gold/30 hover:shadow-gold/5 cursor-default relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-xs uppercase tracking-widest text-text-muted font-medium">{kpi.label}</p>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-2xl font-grifter text-gold tracking-wide">{kpi.value}</p>
              <span className="text-[10px] font-semibold tracking-wider text-gold-light bg-gold/10 px-2 py-0.5 rounded-full border border-gold/10">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-8 lg:grid-cols-7">
        
        {/* Area Chart */}
        <div className="rounded-2xl border border-border-color bg-surface backdrop-blur-md p-6 shadow-2xl lg:col-span-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-grifter text-sm uppercase tracking-widest text-text-primary">Revenue Trend</h3>
            <span className="text-xs text-gold font-medium">Past 7 Months</span>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141625', borderColor: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px' }}
                  itemStyle={{ color: '#F9FAFB' }}
                />
                <Area type="monotone" dataKey="total" stroke="#D4AF37" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="rounded-2xl border border-border-color bg-surface backdrop-blur-md p-6 shadow-2xl lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-grifter text-sm uppercase tracking-widest text-text-primary">Category Share</h3>
            <span className="text-xs text-text-muted font-medium">Bestsellers</span>
          </div>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141625', borderColor: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px', color: '#F9FAFB' }}
                  itemStyle={{ color: '#F9FAFB' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 border border-border-color bg-black/10 px-3 py-2 rounded-lg">
                <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[11px] font-semibold text-text-muted truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
