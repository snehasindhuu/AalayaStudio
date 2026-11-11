import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';

export async function sendDummyOrderToWebhook() {
  const dummyOrder = {
    order_number: `ORD-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
    customer: {
      full_name: "John Doe (Test)",
      email: "john.doe.test@example.com",
      phone: "+1 (555) 019-2834",
      shipping_address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043"
    },
    items: [
      {
        product_name: "Silk Thread Bangle Set (Red & Gold)",
        sku: "STB-RED-GLD-01",
        category: "Silk Thread Bangles",
        quantity: 2,
        unit_price: 45.00
      },
      {
        product_name: "Bespoke Bridal Statement Set",
        sku: "BJS-BRD-GLD-03",
        category: "Bridal Jewelry Sets",
        quantity: 1,
        unit_price: 230.00
      }
    ],
    total_amount: 320.00,
    status: "Received",
    customization_notes: "Wrist size 6.5 inches. Wants extra gold zardosi on the center bangle. Please match the burgundy shade with client's saree fabric.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const webhookUrl = import.meta.env.VITE_PABBLY_WEBHOOK_URL || 'https://connect.pabbly.com/webhook-listener/webhook/IjU3NjMwNTZmMDYzNjA0MzU1MjZkNTUzYyI_3D_pc/IjU3NjcwNTY4MDYzNDA0MzQ1MjY5NTUzNDUxMzEi_pc';
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dummyOrder),
  });

  if (!response.ok) {
    throw new Error(`Failed to send webhook: ${response.statusText}`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
