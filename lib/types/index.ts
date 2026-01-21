/**
 * Chakula Poa TypeScript Types
 * 
 * These types match your Django/PostgreSQL database schema.
 * Share these with your backend team to ensure consistency.
 */

// User Roles
export type UserRole = 'student' | 'staff' | 'admin' | 'super_admin' | 'developer';

// Subscription Duration Types
export type DurationType = 'day' | 'week' | 'month' | 'semester';

// Meal Types
export type MealType = 'breakfast' | 'lunch' | 'dinner';

// Status Types
export type SubscriptionStatus = 'pending' | 'active' | 'expired' | 'cancelled';
export type OrderStatus = 'pending' | 'confirmed' | 'served' | 'cancelled';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'mpesa' | 'airtel_money' | 'selcom' | 'bank';

// Base entity with common fields
interface BaseEntity {
  id: string;
  created_at: string;
}

// University
export interface University extends BaseEntity {
  name: string;
  code: string; // e.g., "UDSM", "UDOM"
  address?: string;
  city?: string;
  contact_email?: string;
  contact_phone?: string;
  is_active: boolean;
}

// User
export interface User extends BaseEntity {
  cps_number: string; // CPS#XXXX
  full_name: string;
  email?: string;
  phone_number: string;
  registration_number?: string; // University reg number
  university_id: string;
  university?: University;
  role: UserRole;
  is_active: boolean;
  qr_code_data?: string;
}

// Subscription Plan
export interface SubscriptionPlan extends BaseEntity {
  university_id: string;
  name: string; // "1 Month", "Full Semester"
  duration_type: DurationType;
  duration_days: number;
  price: number; // Price in TZS
  meals_per_day: number;
  is_active: boolean;
}

// Subscription
export interface Subscription extends BaseEntity {
  user_id: string;
  plan_id: string;
  plan?: SubscriptionPlan;
  start_date: string;
  end_date: string;
  status: SubscriptionStatus;
  remaining_meals: number;
  payment_reference?: string;
}

// Meal
export interface Meal extends BaseEntity {
  university_id: string;
  name: string;
  meal_type: MealType;
  description?: string;
  available_date: string;
  max_servings: number;
  current_orders: number;
  image_url?: string;
}

// Meal Order
export interface MealOrder extends BaseEntity {
  user_id: string;
  meal_id: string;
  meal?: Meal;
  subscription_id: string;
  order_date: string;
  status: OrderStatus;
  served_at?: string;
  served_by?: string;
}

// Transaction
export interface Transaction extends BaseEntity {
  user_id: string;
  subscription_id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  payment_reference?: string;
  external_reference?: string;
  status: TransactionStatus;
  metadata?: Record<string, unknown>;
  completed_at?: string;
}

// API Response Types
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
  full_name: string;
  phone_number: string;
  registration_number?: string;
  university_id: string;
  password: string;
}

// Dashboard Stats
export interface StudentDashboardStats {
  subscription: Subscription | null;
  remaining_meals: number;
  days_remaining: number;
  upcoming_meals: MealOrder[];
  recent_transactions: Transaction[];
}

export interface AdminDashboardStats {
  total_students: number;
  active_subscriptions: number;
  total_revenue: number;
  todays_orders: number;
  meal_demand_report: MealDemandReport[];
}

export interface MealDemandReport {
  meal_id: string;
  meal_name: string;
  meal_type: MealType;
  total_orders: number;
  date: string;
}

// Staff Verification
export interface VerificationRequest {
  cps_number?: string;
  qr_code?: string;
}

export interface VerificationResponse {
  valid: boolean;
  student: User | null;
  subscription: Subscription | null;
  todays_order: MealOrder | null;
  message: string;
}

// Pagination
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
