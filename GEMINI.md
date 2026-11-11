# GEMINI.md - Technical Specification & Prompt Guide for Antigravity

## System & Project Overview
* **Project Name:** Aalaya Craft Studio - Operations & Sales Dashboard
* **Business Description:** Handcrafted, customized fashion accessories and boutique jewelry (silk thread bangles, custom statement bracelets, bridal jewelry sets, personalized accessory gift boxes).
* **Target Audience:** Internal business operations, order fulfillment management, inventory tracking, and sales analytics.
* **Core Objective:** Instruct and guide the Antigravity AI agent to build a sleek, highly visual, clean, and functional web-based dashboard with fast scannability, real-time tracking, stock management, and interactive analytics.

---

## Technical Stack Recommendation
Build the dashboard using the following high-performance web development stack:

* **Frontend Framework:** React (Vite) or Next.js (App Router)
* **Styling & UI:** Tailwind CSS + Shadcn UI / Radix UI Primitives + Lucide React Icons
* **Charts & Data Visualization:** Recharts or Tremor
* **State Management:** TanStack Query (React Query) + Zustand
* **Backend / Database:** Supabase (PostgreSQL + Realtime subscriptions + Auth)
* **Typography Integration:** `@font-face` configured for **Grifter Bold** (Headlines) and **Satoshi Variable** (Body text).

---

## Design System & Branding Guidelines

### Color Palette
Implement a dark background aesthetic with primary indigo tone `#3F4EFF` paired with warm, artisanal gold highlights:

* **Primary Accent / Brand:** `#3F4EFF` (Vibrant Electric Indigo / Blue)
* **Gold Highlights / Accent:** `#D4AF37` / `#E5C158` (Artisanal Gold)
* **Background Dark:** `#0F1117` / `#161922`
* **Card & Container Surfaces:** `#1E222D` with subtle border `#2A2E3D`
* **Warm Neutral Text (Primary):** `#F4F4F6`
* **Muted Text / Subtitles:** `#A0A5B5`
* **Status Colors:**
  * Pending / Crafting: `#F59E0B` (Warm Amber)
  * Completed / Shipped: `#10B981` (Emerald Green)
  * Low Stock Alert: `#EF4444` (Rose Red)

### Typography Rules
* **Headlines / Display Headings:** `Grifter Bold` (Uppercase / Bold Display)
* **Body / Data / UI Text:** `Satoshi Variable` (Clean, geometric sans-serif)

### Visual Layout & Mechanics (Google Material Design Inspired)
* **Grid System:** Responsive 12-column grid layout with clean card elevations and subtle gold/indigo hover state borders.
* **Navigation:** Collapsible Sidebar with quick action badges and icon-based navigation.
* **Header Bar:** User profile avatar, real-time notification bell, global search bar (Search by Order ID, Customer Name, or Product SKU), and a primary `+ New Order` trigger button.

---

## Agent Task Checklist & Functionalities to Implement

### Task 1: Sales & Revenue Analytics (Overview Module)
* **KPI Metric Cards:**
  * Total Revenue (Current Month vs. Previous Month % growth)
  * Active Orders Pending Fulfillment
  * Total Units Sold (Bangles, Sets, Gift Boxes)
  * Average Order Value (AOV)
* **Visual Charts:**
  * **Revenue Trend Chart:** Interactive Area/Line chart tracking monthly & weekly sales revenue.
  * **Product Category Breakdown:** Donut chart showing distribution across Silk Thread Bangles, Statement Bracelets, Bridal Sets, and Gift Boxes.

### Task 2: Order Tracking & Status Updates
* **Live Order Pipeline Board & Data Table:**
  * Status Filters: `All`, `Received`, `Crafting in Progress`, `Ready for Dispatch`, `Shipped`, `Delivered`.
  * Status Badge indicators with quick inline status change dropdowns.
* **Customization Notes Callout:** Dedicated visual section highlights customer customization requests (e.g., wrist size, color combination, bridal theme matching).

### Task 3: Inventory Management (Raw Materials & Finished Sets)
* **Finished Goods Tracker:** Real-time stock counts for ready-to-ship product sets.
* **Raw Material Tracker:**
  * Inventory tracking for silk thread spools, base bangle rings, embellishments/zardosi, beads, and packaging boxes.
  * **Low Stock Alert System:** Display visual warning badges when raw material inventory drops below defined re-order thresholds.
* **Quick Stock Adjuster:** Modal and inline counters to instantly increment or decrement inventory levels upon batch completion or supplier deliveries.

### Task 4: Customer Order History Logger (CRM)
* **Customer Directory:** Searchable directory of past buyers with purchase frequency, total spend, and preferred styles.
* **Order Detail Modal:** Complete history log, contact information, shipping label trigger, and order status timestamps.

---

## Database Architecture & Data Models (SQL Schema Instruction)

Execute and bind the following database schema to the dashboard:

```sql
-- Customers Table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

-- Products & Inventory Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) CHECK (category IN ('Silk Thread Bangles', 'Statement Bracelets', 'Bridal Jewelry Sets', 'Gift Boxes')),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  is_customizable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

-- Raw Materials Table
CREATE TABLE raw_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_name VARCHAR(255) NOT NULL,
  unit_type VARCHAR(50) NOT NULL, -- e.g., spools, pieces, boxes
  current_stock INT DEFAULT 0,
  min_reorder_level INT DEFAULT 10,
  last_restocked_at TIMESTAMP WITH TIMEZONE
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) CHECK (status IN ('Received', 'Crafting', 'Ready', 'Shipped', 'Delivered', 'Cancelled')) DEFAULT 'Received',
  customization_notes TEXT,
  created_at TIMESTAMP WITH TIMEZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);