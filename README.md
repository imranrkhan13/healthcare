# MedCore — B2B Healthcare SaaS UI

A production-grade B2B Healthcare SaaS frontend built with React + TypeScript + Zustand.

![MedCore](https://img.shields.io/badge/MedCore-Healthcare%20SaaS-2563eb?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Zustand](https://img.shields.io/badge/Zustand-State%20Mgmt-orange?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Build-646cff?style=flat-square&logo=vite)

## 🚀 Live Demo

> Deploy to Vercel/Netlify — see deployment section below.

**Demo Credentials:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medcore.health | admin123 |
| Doctor | doctor@medcore.health | doctor123 |
| Demo | demo@medcore.health | demo123 |

---

## ✨ Features

### Core
- **🔐 Authentication** — Email/password login with session handling, error states, loading UI
- **📊 Dashboard** — Live stats, Recharts area chart, patient table, alert feed, department capacity bars
- **📈 Analytics** — KPI cards, bar/area/pie charts, revenue vs expenses, department load
- **👥 Patients** — Grid & List view with toggle, search, status filter, 12 mock patients
- **🗂️ Patient Detail Modal** — 4-tab modal: Overview, Vitals, Medications, History timeline
- **🔔 Notifications** — Service Worker, browser push notifications, in-app bell with badge
- **⚙️ Settings** — Profile, notification toggles, security options, live "Test Alert" button

### Design
- **White & Blue** colour system with CSS custom properties
- **Poppins** font throughout (300–900 weights)
- Animated hero login with floating cards & feature carousel
- Collapsible dark sidebar with active nav indicators
- Fully responsive — mobile, tablet, desktop

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── common/
│   │   └── ProtectedRoute.tsx       # Auth guard
│   └── layout/
│       ├── AppLayout.tsx            # Shell with sidebar + outlet
│       ├── Sidebar.tsx              # Collapsible nav sidebar
│       └── Header.tsx               # Top bar + notifications
├── hooks/
│   └── useServiceWorker.ts          # SW registration + demo alerts
├── pages/
│   ├── LoginPage.tsx                # Animated split-screen login
│   ├── DashboardPage.tsx            # Home dashboard
│   ├── AnalyticsPage.tsx            # Charts & KPIs
│   ├── PatientsPage.tsx             # Grid/List patient view
│   ├── SettingsPage.tsx             # User settings
│   └── components/
│       └── PatientDetailModal.tsx   # Patient detail 4-tab modal
├── store/
│   └── appStore.ts                  # Zustand global store
├── styles/
│   └── globals.css                  # Design tokens + utilities
├── types/
│   └── index.ts                     # TypeScript interfaces
└── utils/
    └── mockData.ts                  # 12 patients + analytics data
```

### State Management (Zustand)
Single store handles:
- `auth` — user, isAuthenticated, login(), logout()
- `patients` — list, selectedPatient, search, statusFilter, viewMode
- `notifications` — list, unreadCount, add/markRead
- `ui` — sidebarOpen

### Service Worker
`public/sw.js` registers on app load, requests notification permission, and handles:
- `push` events → `showNotification()`
- `notificationclick` → open app / dismiss
- Demo trigger available on every page via "Test Alert" button

---

## 🛠️ Tech Stack

| Library | Purpose |
|---------|---------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Zustand 4 | State management |
| React Router 6 | Client-side routing |
| Recharts | Charts (area, bar, pie) |
| Lucide React | Icon set |
| Vite 5 | Build tool |

---

## 📦 Getting Started

```bash
# Clone
git clone https://github.com/your-username/medcore-saas.git
cd medcore-saas

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the dist/ folder at app.netlify.com/drop
```

### GitHub Pages
Add to `vite.config.ts`:
```ts
base: '/medcore-saas/',
```
Then push — GitHub Actions will deploy automatically.

---

## 📋 Assignment Coverage

| Requirement | Implementation |
|---|---|
| React + TypeScript | ✅ React 18, strict TS throughout |
| State Management | ✅ Zustand store with full app state |
| Firebase Auth replacement | ✅ Simulated auth with session + error states |
| Login Page | ✅ Animated split-screen with validation |
| Dashboard Page | ✅ Stats, chart, alerts, quick actions |
| Analytics Page | ✅ 4 chart types, KPIs, financial data |
| Patient Details Page | ✅ Grid + List view, modal with 4 tabs |
| Grid/List Toggle | ✅ Toggle switch in controls bar |
| Service Worker | ✅ SW + push notifications + browser alerts |
| Notifications | ✅ Bell icon, badge, dropdown, auto-alerts |
| Reusable Components | ✅ Header, Sidebar, Modal, cards |
| Responsive Design | ✅ Mobile-first with breakpoints |
| Clean Folder Structure | ✅ Feature-based, scalable |

---

## 📸 Pages

- `/login` — Split-screen hero with animated background
- `/dashboard` — Main overview with live data
- `/analytics` — Charts and KPI metrics
- `/patients` — Patient management with view toggle
- `/settings` — Account and system settings

---

## 🧩 Bonus Features Implemented

- **Micro-frontend ready** — Each page is a self-contained module
- **Reusable component design** — Header, Sidebar, Modal are fully generic
- **Performance** — Lazy-loadable routes, minimal re-renders via Zustand selectors
- **Clean folder structure** — `components/`, `pages/`, `store/`, `hooks/`, `utils/`, `types/`
# healthcare
