export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  avatar?: string;
  hospital?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  condition: string;
  status: 'Active' | 'Inactive' | 'Critical' | 'Discharged';
  doctor: string;
  admittedDate: string;
  lastVisit: string;
  avatar?: string;
  diagnosis: string;
  medications: string[];
  allergies: string[];
  vitals: {
    bp: string;
    pulse: number;
    temp: string;
    oxygen: number;
  };
  ward: string;
  insuranceId: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
}

export interface AnalyticsData {
  totalPatients: number;
  activePatients: number;
  criticalPatients: number;
  dischargedThisMonth: number;
  avgStayDays: number;
  bedOccupancy: number;
  monthlyAdmissions: { month: string; admissions: number; discharges: number }[];
  departmentLoad: { dept: string; patients: number; capacity: number }[];
  conditionBreakdown: { name: string; value: number; color: string }[];
  revenueData: { month: string; revenue: number; expenses: number }[];
}

export type ViewMode = 'grid' | 'list';
