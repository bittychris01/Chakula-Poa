/**
 * Chakula Poa API Endpoints
 * 
 * All API endpoints that connect to your Django backend.
 * These match the endpoints defined in your API documentation.
 */

import api, { tokenManager } from './client';
import type {
  User,
  University,
  SubscriptionPlan,
  Subscription,
  Meal,
  MealOrder,
  Transaction,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  StudentDashboardStats,
  AdminDashboardStats,
  VerificationRequest,
  VerificationResponse,
  PaginatedResponse,
} from '../types';

/**
 * Authentication Endpoints
 */
export const auth = {
  /**
   * Register a new student
   * Django endpoint: POST /api/auth/register/
   */
  register: async (data: RegisterData) => {
    const response = await api.post<AuthResponse>('/api/auth/register/', data as unknown as Record<string, unknown>, { requiresAuth: false });
    if (response.data) {
      tokenManager.setTokens(response.data.access, response.data.refresh);
    }
    return response;
  },

  /**
   * Login with phone number and password
   * Django endpoint: POST /api/auth/login/
   */
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('/api/auth/login/', credentials as unknown as Record<string, unknown>, { requiresAuth: false });
    if (response.data) {
      tokenManager.setTokens(response.data.access, response.data.refresh);
    }
    return response;
  },

  /**
   * Logout - clear tokens
   */
  logout: () => {
    tokenManager.clearTokens();
  },

  /**
   * Get current user profile
   * Django endpoint: GET /api/users/me/
   */
  getCurrentUser: () => api.get<User>('/api/users/me/'),

  /**
   * Update user profile
   * Django endpoint: PATCH /api/users/me/
   */
  updateProfile: (data: Partial<User>) => api.patch<User>('/api/users/me/', data as unknown as Record<string, unknown>),
};

/**
 * University Endpoints
 */
export const universities = {
  /**
   * Get all universities
   * Django endpoint: GET /api/universities/
   */
  getAll: () => api.get<University[]>('/api/universities/', { requiresAuth: false }),

  /**
   * Get university by ID
   * Django endpoint: GET /api/universities/:id/
   */
  getById: (id: string) => api.get<University>(`/api/universities/${id}/`, { requiresAuth: false }),
};

/**
 * Subscription Plan Endpoints
 */
export const plans = {
  /**
   * Get all subscription plans for a university
   * Django endpoint: GET /api/plans/
   */
  getAll: (universityId?: string) => {
    const query = universityId ? `?university_id=${universityId}` : '';
    return api.get<SubscriptionPlan[]>(`/api/plans/${query}`, { requiresAuth: false });
  },

  /**
   * Get plan by ID
   * Django endpoint: GET /api/plans/:id/
   */
  getById: (id: string) => api.get<SubscriptionPlan>(`/api/plans/${id}/`),
};

/**
 * Subscription Endpoints
 */
export const subscriptions = {
  /**
   * Get user's active subscription
   * Django endpoint: GET /api/subscriptions/me/
   */
  getCurrent: () => api.get<Subscription>('/api/subscriptions/me/'),

  /**
   * Create a new subscription
   * Django endpoint: POST /api/subscriptions/
   */
  create: (planId: string) => api.post<Subscription>('/api/subscriptions/', { plan_id: planId }),

  /**
   * Get subscription history
   * Django endpoint: GET /api/subscriptions/history/
   */
  getHistory: () => api.get<Subscription[]>('/api/subscriptions/history/'),
};

/**
 * Meal Endpoints
 */
export const meals = {
  /**
   * Get available meals for tomorrow
   * Django endpoint: GET /api/meals/
   */
  getAvailable: (date?: string) => {
    const query = date ? `?date=${date}` : '';
    return api.get<Meal[]>(`/api/meals/${query}`);
  },

  /**
   * Select a meal for tomorrow
   * Django endpoint: POST /api/meals/select/
   */
  select: (mealId: string) => api.post<MealOrder>('/api/meals/select/', { meal_id: mealId }),

  /**
   * Cancel meal selection
   * Django endpoint: DELETE /api/meals/orders/:id/
   */
  cancelSelection: (orderId: string) => api.delete(`/api/meals/orders/${orderId}/`),

  /**
   * Get user's meal orders
   * Django endpoint: GET /api/meals/orders/
   */
  getOrders: (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return api.get<MealOrder[]>(`/api/meals/orders/${query}`);
  },
};

/**
 * Payment Endpoints
 */
export const payments = {
  /**
   * Initiate payment via Selcom
   * Django endpoint: POST /api/payments/initiate/
   */
  initiate: (subscriptionId: string, paymentMethod: string) =>
    api.post<{ order_id: string; checkout_url?: string }>('/api/payments/initiate/', {
      subscription_id: subscriptionId,
      payment_method: paymentMethod,
    }),

  /**
   * Check payment status
   * Django endpoint: GET /api/payments/:id/status/
   */
  checkStatus: (paymentId: string) =>
    api.get<Transaction>(`/api/payments/${paymentId}/status/`),

  /**
   * Get transaction history
   * Django endpoint: GET /api/transactions/
   */
  getTransactions: () => api.get<PaginatedResponse<Transaction>>('/api/transactions/'),
};

/**
 * Staff Endpoints
 */
export const staff = {
  /**
   * Verify student by CPS number or QR code
   * Django endpoint: POST /api/staff/verify/
   */
  verifyStudent: (data: VerificationRequest) =>
    api.post<VerificationResponse>('/api/staff/verify/', data as unknown as Record<string, unknown>),

  /**
   * Mark meal as served
   * Django endpoint: POST /api/staff/serve/
   */
  serveMeal: (orderId: string) =>
    api.post<MealOrder>('/api/staff/serve/', { order_id: orderId }),

  /**
   * Get today's orders for serving
   * Django endpoint: GET /api/staff/orders/today/
   */
  getTodaysOrders: () => api.get<MealOrder[]>('/api/staff/orders/today/'),
};

/**
 * Admin Endpoints
 */
export const admin = {
  /**
   * Get dashboard stats
   * Django endpoint: GET /api/admin/dashboard/
   */
  getDashboardStats: () => api.get<AdminDashboardStats>('/api/admin/dashboard/'),

  /**
   * Get meal demand report
   * Django endpoint: GET /api/admin/reports/demand/
   */
  getMealDemandReport: (date?: string) => {
    const query = date ? `?date=${date}` : '';
    return api.get<AdminDashboardStats['meal_demand_report']>(`/api/admin/reports/demand/${query}`);
  },

  /**
   * Get revenue report
   * Django endpoint: GET /api/admin/reports/revenue/
   */
  getRevenueReport: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return api.get<{ total: number; by_day: Record<string, number> }>(`/api/admin/reports/revenue/${query}`);
  },

  /**
   * Manage meals (CRUD)
   */
  meals: {
    create: (data: Partial<Meal>) => api.post<Meal>('/api/admin/meals/', data as unknown as Record<string, unknown>),
    update: (id: string, data: Partial<Meal>) => api.patch<Meal>(`/api/admin/meals/${id}/`, data as unknown as Record<string, unknown>),
    delete: (id: string) => api.delete(`/api/admin/meals/${id}/`),
  },

  /**
   * Manage staff
   */
  staff: {
    getAll: () => api.get<User[]>('/api/admin/staff/'),
    create: (data: Partial<User>) => api.post<User>('/api/admin/staff/', data as unknown as Record<string, unknown>),
    update: (id: string, data: Partial<User>) => api.patch<User>(`/api/admin/staff/${id}/`, data as unknown as Record<string, unknown>),
    deactivate: (id: string) => api.patch<User>(`/api/admin/staff/${id}/`, { is_active: false }),
  },
};

/**
 * Student Dashboard
 */
export const studentDashboard = {
  /**
   * Get student dashboard stats
   * Django endpoint: GET /api/students/dashboard/
   */
  getStats: () => api.get<StudentDashboardStats>('/api/students/dashboard/'),
};

// Export all endpoints
export const chakulaPoaApi = {
  auth,
  universities,
  plans,
  subscriptions,
  meals,
  payments,
  staff,
  admin,
  studentDashboard,
};

export default chakulaPoaApi;
