import { create } from 'zustand';
import type { User, Patient, AppNotification, ViewMode } from '../types';
import { mockPatients } from '../utils/mockData';

interface AppStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  patients: Patient[];
  selectedPatient: Patient | null;
  patientSearch: string;
  viewMode: ViewMode;
  statusFilter: string;
  setSelectedPatient: (p: Patient | null) => void;
  setPatientSearch: (q: string) => void;
  setViewMode: (m: ViewMode) => void;
  setStatusFilter: (s: string) => void;

  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const VALID = [
  { email: 'admin@medcore.health', password: 'admin123', name: 'Dr. Admin User', role: 'admin' as const },
  { email: 'doctor@medcore.health', password: 'doctor123', name: 'Dr. Priya Sharma', role: 'doctor' as const },
  { email: 'demo@medcore.health', password: 'demo123', name: 'Dr. Demo User', role: 'staff' as const },
];

let nid = 1;

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  authError: null,

  login: async (email, password) => {
    set({ isLoading: true, authError: null });
    await new Promise(r => setTimeout(r, 1000));
    const match = VALID.find(c => c.email === email && c.password === password);
    if (match) {
      const user: User = { id: 'u1', email: match.email, name: match.name, role: match.role, hospital: 'MedCore City Hospital' };
      set({ user, isAuthenticated: true, isLoading: false, authError: null });
      setTimeout(() => {
        get().addNotification({ title: 'Welcome back', message: `Signed in as ${match.name}. You have 3 alerts today.`, type: 'info' });
      }, 800);
    } else {
      set({ isLoading: false, authError: 'Invalid email or password. Try admin@medcore.health / admin123' });
    }
  },

  logout: () => set({ user: null, isAuthenticated: false, authError: null, selectedPatient: null, notifications: [], unreadCount: 0 }),

  patients: mockPatients,
  selectedPatient: null,
  patientSearch: '',
  viewMode: 'grid',
  statusFilter: 'All',
  setSelectedPatient: p => set({ selectedPatient: p }),
  setPatientSearch: q => set({ patientSearch: q }),
  setViewMode: m => set({ viewMode: m }),
  setStatusFilter: s => set({ statusFilter: s }),

  notifications: [],
  unreadCount: 0,
  addNotification: n => {
    const notif: AppNotification = { id: `n${nid++}`, ...n, timestamp: new Date(), read: false };
    set(s => ({ notifications: [notif, ...s.notifications].slice(0, 20), unreadCount: s.unreadCount + 1 }));
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notif.title, { body: notif.message });
    }
  },
  markAllRead: () => set(s => ({ notifications: s.notifications.map(n => ({ ...n, read: true })), unreadCount: 0 })),
  markRead: id => set(s => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: Math.max(0, s.unreadCount - 1),
  })),

  sidebarOpen: true,
  setSidebarOpen: open => set({ sidebarOpen: open }),
}));
