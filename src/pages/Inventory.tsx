import { useState } from 'react';
import { Package, Plus, Minus, AlertTriangle } from 'lucide-react';

const INITIAL_FINISHED = [
  { id: 'FG-001', name: 'Bridal Set - Ruby/Gold', category: 'Bridal Sets', stock: 4 },
  { id: 'FG-002', name: 'Peacock Silk Bangles', category: 'Silk Thread Bangles', stock: 12 },
  { id: 'FG-003', name: 'Kundan Statement Bracelet', category: 'Statement Bracelets', stock: 2 },
];

const INITIAL_RAW = [
  { id: 'RM-001', name: 'Silk Thread (Crimson)', unit: 'Spools', stock: 4, min: 10 },
  { id: 'RM-002', name: 'Base Bangle Rings (Size 2.4)', unit: 'Pieces', stock: 45, min: 50 },
  { id: 'RM-003', name: 'Zardosi Spring Wire', unit: 'Grams', stock: 250, min: 100 },
  { id: 'RM-004', name: 'Premium Velvet Gift Boxes', unit: 'Boxes', stock: 12, min: 20 },
];

export default function Inventory() {
  const [finishedGoods, setFinishedGoods] = useState(INITIAL_FINISHED);
  const [rawMaterials, setRawMaterials] = useState(INITIAL_RAW);

  const adjustStock = (id: string, type: 'finished' | 'raw', amount: number) => {
    if (type === 'finished') {
      setFinishedGoods(prev => prev.map(item => 
        item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
      ));
    } else {
      setRawMaterials(prev => prev.map(item => 
        item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
      ));
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h2 className="text-2xl font-grifter tracking-wide text-text-primary">Inventory Management</h2>
        <p className="text-text-muted mt-1">Track finished goods and raw materials.</p>
      </div>
      
      {/* Finished Goods */}
      <div className="rounded-xl border border-border-color bg-surface shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-border-color px-6 py-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center text-primary">
            <Package className="h-5 w-5" />
          </div>
          <h3 className="font-grifter text-lg text-text-primary">Finished Goods (Ready to Ship)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-primary">
            <thead className="bg-background/50 text-text-muted border-b border-border-color">
              <tr>
                <th className="px-6 py-3 font-medium">SKU / Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium text-center">Stock Level</th>
                <th className="px-6 py-3 font-medium text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {finishedGoods.map((item) => (
                <tr key={item.id} className="hover:bg-background/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-text-muted">{item.id}</p>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center h-8 w-12 rounded-md bg-background border border-border-color font-grifter text-lg">
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => adjustStock(item.id, 'finished', -1)} className="p-1.5 rounded-md border border-border-color text-text-muted hover:text-status-alert hover:border-status-alert/50 transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <button onClick={() => adjustStock(item.id, 'finished', 1)} className="p-1.5 rounded-md border border-border-color text-text-muted hover:text-status-completed hover:border-status-completed/50 transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Materials */}
      <div className="rounded-xl border border-border-color bg-surface shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-border-color px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gold/20 flex items-center justify-center text-gold">
              <Package className="h-5 w-5" />
            </div>
            <h3 className="font-grifter text-lg text-text-primary">Raw Materials Tracker</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-primary">
            <thead className="bg-background/50 text-text-muted border-b border-border-color">
              <tr>
                <th className="px-6 py-3 font-medium">Material Name</th>
                <th className="px-6 py-3 font-medium">Unit</th>
                <th className="px-6 py-3 font-medium text-center">Current Stock</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
                <th className="px-6 py-3 font-medium text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {rawMaterials.map((item) => {
                const isLow = item.stock < item.min;
                return (
                  <tr key={item.id} className={`hover:bg-background/30 transition-colors ${isLow ? 'bg-status-alert/5' : ''}`}>
                    <td className="px-6 py-4">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-text-muted">{item.id}</p>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{item.unit}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center h-8 px-3 rounded-md border font-grifter text-lg ${isLow ? 'bg-status-alert/10 border-status-alert/30 text-status-alert' : 'bg-background border-border-color'}`}>
                        {item.stock}
                      </span>
                      <p className="text-[10px] text-text-muted mt-1">Min: {item.min}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-status-alert/30 bg-status-alert/10 px-2.5 py-1 text-xs font-semibold text-status-alert">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-status-completed/30 bg-status-completed/10 px-2.5 py-1 text-xs font-semibold text-status-completed">
                          Adequate
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => adjustStock(item.id, 'raw', -1)} className="p-1.5 rounded-md border border-border-color text-text-muted hover:text-status-alert hover:border-status-alert/50 transition-colors">
                          <Minus className="h-4 w-4" />
                        </button>
                        <button onClick={() => adjustStock(item.id, 'raw', 1)} className="p-1.5 rounded-md border border-border-color text-text-muted hover:text-status-completed hover:border-status-completed/50 transition-colors">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
