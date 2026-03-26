// Kept for backward compat — SW is now registered in App.tsx
export function useServiceWorker() {}

export function triggerDemoNotification(addNotification: Function) {
  const alerts = [
    { title: 'Critical Vitals', message: 'Ravi Krishnamurthy — SpO2 dropping below 90%', type: 'error' as const },
    { title: 'Lab Results Ready', message: 'Blood panel for Sneha Patel is ready for review', type: 'info' as const },
    { title: 'Discharge Approved', message: 'Lakshmi Nair cleared for discharge today', type: 'success' as const },
    { title: 'Appointment Reminder', message: 'Dr. Priya Sharma — 3 consultations in 30 minutes', type: 'info' as const },
    { title: 'Medication Missed', message: 'Suresh Menon missed 2PM dose — Propranolol 40mg', type: 'warning' as const },
  ];
  addNotification(alerts[Math.floor(Math.random() * alerts.length)]);
}
