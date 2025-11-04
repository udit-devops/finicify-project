# Finicify - Financial Analytics Platform

A data-driven financial analytics platform built for the Finicify frontend developer test assignment.

## Project Overview

This project implements two main tasks:

### Task 1 - Dashboard UI Implementation
**Company Internal Comparison Page** (`/company-comparison`)
- Recreated pixel-perfect UI matching the provided design
- Responsive layout for desktop and tablet
- Toggle buttons to switch between "Compare with Sector" and "Compare Within Company" modes
- Company selection dropdown
- Statistics cards displaying key metrics
- Comparison table with company data
- Interactive performance chart with time period selector
- Component-based structure using React and Tailwind CSS

### Task 2 - Data Visualization & Dynamic Analytics

**Part A - Risk Metrics Heatmap** (`/risk-metrics`)
- Interactive heatmap table displaying risk metrics across investment funds
- Color-coded cells with gradient from green (low risk) to red (high risk)
- Tooltips on hover showing fund name and exact value
- Color scale bar/legend with gradient visualization
- Uses Recharts for dynamic data visualization

**Part B - Sector Risk Analysis** (`/sector-risk`)
- Donut chart displaying sector risk level distribution
- Interactive hover highlighting on chart segments
- Risk level percentage boxes with gradient backgrounds
- Sortable table of top-performing funds
- Search functionality to filter funds
- Sortable columns for all table fields

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn-ui** - Component library
- **Recharts** - Chart library for data visualization
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   └── StatsCard.tsx       # Reusable statistics card component
│   ├── layout/
│   │   ├── AppLayout.tsx       # Main layout wrapper
│   │   ├── AppSidebar.tsx      # Navigation sidebar
│   │   └── Header.tsx          # Top header bar
│   └── ui/                     # shadcn-ui components
├── pages/
│   ├── CompanyComparison.tsx   # Task 1 - Company comparison page
│   ├── RiskMetrics.tsx         # Task 2A - Risk metrics heatmap
│   ├── SectorRiskAnalysis.tsx  # Task 2B - Sector risk analysis
│   ├── Overview.tsx            # Overview/home page
│   └── NotFound.tsx            # 404 page
├── lib/                        # Utility functions
├── hooks/                      # Custom React hooks
└── App.tsx                     # Main app component with routing
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finicify-insight-nexus-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Available Routes

- `/` - Overview/Home page
- `/company-comparison` - Task 1: Company Internal Comparison
- `/risk-metrics` - Task 2A: Risk Metrics Heatmap
- `/sector-risk` - Task 2B: Sector Risk Analysis

## Features Implemented

### ✅ Task 1 Requirements
- [x] Pixel-perfect UI matching the design
- [x] Responsive layout (desktop & tablet)
- [x] Component-based structure
- [x] Toggle buttons with state management
- [x] All UI sections: stats, tables, charts
- [x] Time period selector for charts

### ✅ Task 2A Requirements
- [x] Heatmap table with color intensity
- [x] Color scale bar with gradient (red → yellow → green)
- [x] Fund names and metric values displayed
- [x] Tooltips on hover with fund name and value
- [x] Bonus: Using Recharts for visualization

### ✅ Task 2B Requirements
- [x] Donut chart for sector risk distribution
- [x] Interactive hover highlighting
- [x] Top-performing funds table
- [x] Sortable table columns
- [x] Search functionality
- [x] Bonus: Animations and tooltips using Recharts

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Code Quality

- Clean, modular, and readable code
- TypeScript for type safety
- Component-based architecture
- Responsive design principles
- Proper state management with React hooks

## Notes

- All text has been translated to English (original assignment was in Turkish)
- Data structures match the exact format specified in the requirements
- Charts are fully interactive with hover effects
- The UI follows the dark theme design system
- All components are responsive and work on both desktop and tablet devices

## Contact

For questions or issues, please contact:
- Email: csayinfo1@gmail.com
- Phone/WhatsApp: +1 613 413 0777

---

Built with ❤️ for Finicify Frontend Developer Test
