/**
 * Chakula Poa Type Definitions
 * Types that match your Django backend models
 */

export type UserRole = 'student' | 'staff' | 'admin' | 'super_admin';

export interface User {
  id: string;
  phone_number: string;
  email?: string;
  full_name: string;
  role: UserRole;
  university_id?: string;
  university_name?: string;
  registration_number?: string;
  cps_number?: string;
  profile_photo?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface University {
  id: string;
  name: string;
  code: string;
  location: string;
  is_active: boolean;
  logo?: string;
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  meals_per_day: number;
  university_id: string;
  is_active: boolean;
  features: string[];
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  plan?: SubscriptionPlan;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  meals_remaining: number;
  created_at: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner';
  image?: string;
  available_date: string;
  university_id: string;
  is_available: boolean;
  max_orders: number;
  current_orders: number;
}

export interface MealOrder {
  id: string;
  user_id: string;
  meal_id: string;
  meal?: Meal;
  order_date: string;
  collection_date: string;
  status: 'pending' | 'ready' | 'collected' | 'cancelled' | 'expired';
  qr_code?: string;
  collected_at?: string;
  served_by?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  subscription_id?: string;
  amount: number;
  payment_method: 'mpesa' | 'airtel' | 'bank';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reference_number: string;
  created_at: string;
  completed_at?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginCredentials {
  phone_number: string;
  password: string;
}

export interface RegisterData {
  phone_number: string;
  password: string;
  full_name: string;
  email?: string;
  university_id: string;
  registration_number: string;
}

export interface StudentDashboardStats {
  subscription: Subscription | null;
  meals_remaining: number;
  days_remaining: number;
  upcoming_meals: MealOrder[];
  recent_collections: MealOrder[];
  qr_code: string;
  cps_number: string;
}

export interface AdminDashboardStats {
  total_students: number;
  active_subscriptions: number;
  meals_served_today: number;
  revenue_this_month: number;
  meal_demand_report: {
    meal_id: string;
    meal_name: string;
    orders: number;
  }[];
  recent_transactions: Transaction[];
}

export interface VerificationRequest {
  cps_number?: string;
  qr_code?: string;
}

export interface VerificationResponse {
  valid: boolean;
  student?: User;
  order?: MealOrder;
  message: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
