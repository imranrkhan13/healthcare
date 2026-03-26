import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './store/appStore';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PatientsPage from './pages/PatientsPage';
import SettingsPage from './pages/SettingsPage';

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

function AppInner() {
  const { isAuthenticated, addNotification } = useAppStore();

  // Request notification permission once authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          addNotification({ title: 'Notifications enabled', message: 'You will receive real-time alerts for critical events.', type: 'success' });
        }
      });
    }
  }, [isAuthenticated]);

  // Periodic auto-alerts after login
  useEffect(() => {
    if (!isAuthenticated) return;
    const msgs = [
      { title: 'Medication Alert', message: 'Vikram Singh missed 2PM dose — Erythropoietin injection', type: 'warning' as const },
      { title: 'Report Ready', message: 'Monthly analytics report for March is ready for review', type: 'info' as const },
      { title: 'Critical Vitals', message: 'Rahul Joshi SpO2 at 89% — immediate attention needed', type: 'error' as const },
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i < msgs.length) { addNotification(msgs[i]); i++; }
      else clearInterval(t);
    }, 25000);
    return () => clearInterval(t);
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
