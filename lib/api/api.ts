// API Configuration and Utilities for Chakula Poa
// This file provides all API utilities for communicating with the Django backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Types for API responses
export interface User {
  id: string;
  cps_number: string;
  full_name: string;
  email: string;
  phone_number: string;
  registration_number?: string;
  university_id?: string;
  university_name?: string;
  role: "student" | "staff" | "admin" | "super_admin" | "developer";
  is_active: boolean;
  qr_code_data?: string;
  created_at: string;
}

export interface University {
  id: string;
  name: string;
  code: string;
  address?: string;
  city?: string;
  contact_email?: string;
  contact_phone?: string;
  is_active: boolean;
}

export interface SubscriptionPlan {
  id: string;
  university_id: string;
  name: string;
  duration_type: "day" | "week" | "month" | "semester";
  duration_days: number;
  price: number;
  meals_per_day: number;
  is_active: boolean;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  plan?: SubscriptionPlan;
  start_date: string;
  end_date: string;
  status: "pending" | "active" | "expired" | "cancelled";
  remaining_meals: number;
  payment_reference?: string;
}

export interface Meal {
  id: string;
  university_id: string;
  name: string;
  meal_type: "breakfast" | "lunch" | "dinner";
  description?: string;
  available_date: string;
  max_servings: number;
  current_orders: number;
}

export interface MealOrder {
  id: string;
  user_id: string;
  meal_id: string;
  meal?: Meal;
  subscription_id: string;
  order_date: string;
  status: "pending" | "confirmed" | "served" | "cancelled";
  served_at?: string;
  served_by?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  subscription_id?: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_reference?: string;
  external_reference?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  created_at: string;
  completed_at?: string;
}

export interface DemandReport {
  meal_type: string;
  meal_name: string;
  total_orders: number;
  served: number;
  pending: number;
}

export interface RevenueReport {
  total_revenue: number;
  period: string;
  transactions_count: number;
  by_payment_method: { method: string; amount: number; count: number }[];
}

// API Error handling
export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }
}

// Token management
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setTokens(access: string, refresh: string): void {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

export function clearTokens(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

// Base fetch function with auth
async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new APIError(
      response.status,
      data.detail || data.message || "An error occurred",
      data
    );
  }

  return response;
}

// Auth API
export const authAPI = {
  login: async (phone_number: string, password: string) => {
    const response = await fetchWithAuth("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ phone_number, password }),
    });
    return response.json();
  },

  register: async (data: {
    full_name: string;
    phone_number: string;
    email?: string;
    registration_number?: string;
    university_id?: string;
    password: string;
  }) => {
    const response = await fetchWithAuth("/auth/register/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getMe: async (): Promise<User> => {
    const response = await fetchWithAuth("/users/me/");
    return response.json();
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await fetchWithAuth("/users/me/", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  changePassword: async (old_password: string, new_password: string) => {
    const response = await fetchWithAuth("/auth/change-password/", {
      method: "POST",
      body: JSON.stringify({ old_password, new_password }),
    });
    return response.json();
  },

  forgotPassword: async (phone_number: string) => {
    const response = await fetchWithAuth("/auth/forgot-password/", {
      method: "POST",
      body: JSON.stringify({ phone_number }),
    });
    return response.json();
  },
};

// Universities API
export const universitiesAPI = {
  list: async (): Promise<University[]> => {
    const response = await fetchWithAuth("/universities/");
    return response.json();
  },

  get: async (id: string): Promise<University> => {
    const response = await fetchWithAuth(`/universities/${id}/`);
    return response.json();
  },

  create: async (data: Partial<University>): Promise<University> => {
    const response = await fetchWithAuth("/universities/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: string, data: Partial<University>): Promise<University> => {
    const response = await fetchWithAuth(`/universities/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetchWithAuth(`/universities/${id}/`, { method: "DELETE" });
  },
};

// Plans API
export const plansAPI = {
  list: async (university_id?: string): Promise<SubscriptionPlan[]> => {
    const params = university_id ? `?university_id=${university_id}` : "";
    const response = await fetchWithAuth(`/plans/${params}`);
    return response.json();
  },

  get: async (id: string): Promise<SubscriptionPlan> => {
    const response = await fetchWithAuth(`/plans/${id}/`);
    return response.json();
  },

  create: async (data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> => {
    const response = await fetchWithAuth("/plans/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> => {
    const response = await fetchWithAuth(`/plans/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetchWithAuth(`/plans/${id}/`, { method: "DELETE" });
  },
};

// Subscriptions API
export const subscriptionsAPI = {
  getMySubscription: async (): Promise<Subscription | null> => {
    const response = await fetchWithAuth("/subscriptions/me/");
    return response.json();
  },

  create: async (plan_id: string): Promise<Subscription> => {
    const response = await fetchWithAuth("/subscriptions/", {
      method: "POST",
      body: JSON.stringify({ plan_id }),
    });
    return response.json();
  },

  list: async (): Promise<Subscription[]> => {
    const response = await fetchWithAuth("/subscriptions/");
    return response.json();
  },
};

// Meals API
export const mealsAPI = {
  list: async (date?: string): Promise<Meal[]> => {
    const params = date ? `?date=${date}` : "";
    const response = await fetchWithAuth(`/meals/${params}`);
    return response.json();
  },

  get: async (id: string): Promise<Meal> => {
    const response = await fetchWithAuth(`/meals/${id}/`);
    return response.json();
  },

  create: async (data: Partial<Meal>): Promise<Meal> => {
    const response = await fetchWithAuth("/meals/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: string, data: Partial<Meal>): Promise<Meal> => {
    const response = await fetchWithAuth(`/meals/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetchWithAuth(`/meals/${id}/`, { method: "DELETE" });
  },

  select: async (meal_id: string): Promise<MealOrder> => {
    const response = await fetchWithAuth("/meals/select/", {
      method: "POST",
      body: JSON.stringify({ meal_id }),
    });
    return response.json();
  },
};

// Orders API
export const ordersAPI = {
  list: async (params?: { date?: string; status?: string }): Promise<MealOrder[]> => {
    const queryParams = new URLSearchParams();
    if (params?.date) queryParams.append("date", params.date);
    if (params?.status) queryParams.append("status", params.status);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetchWithAuth(`/meals/orders/${query}`);
    return response.json();
  },

  getMyOrders: async (): Promise<MealOrder[]> => {
    const response = await fetchWithAuth("/meals/orders/me/");
    return response.json();
  },
};

// Staff API
export const staffAPI = {
  verify: async (cps_number: string): Promise<{ valid: boolean; user?: User; subscription?: Subscription }> => {
    const response = await fetchWithAuth("/staff/verify/", {
      method: "POST",
      body: JSON.stringify({ cps_number }),
    });
    return response.json();
  },

  serve: async (order_id: string): Promise<MealOrder> => {
    const response = await fetchWithAuth("/staff/serve/", {
      method: "POST",
      body: JSON.stringify({ order_id }),
    });
    return response.json();
  },

  getTodayOrders: async (): Promise<MealOrder[]> => {
    const response = await fetchWithAuth("/staff/orders/today/");
    return response.json();
  },
};

// Admin API
export const adminAPI = {
  getStudents: async (params?: { search?: string; status?: string }): Promise<User[]> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.status) queryParams.append("status", params.status);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetchWithAuth(`/admin/students/${query}`);
    return response.json();
  },

  getStaff: async (): Promise<User[]> => {
    const response = await fetchWithAuth("/admin/staff/");
    return response.json();
  },

  createStaff: async (data: Partial<User>): Promise<User> => {
    const response = await fetchWithAuth("/admin/staff/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateStaff: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await fetchWithAuth(`/admin/staff/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getDemandReport: async (date?: string): Promise<DemandReport[]> => {
    const params = date ? `?date=${date}` : "";
    const response = await fetchWithAuth(`/admin/reports/demand/${params}`);
    return response.json();
  },

  getRevenueReport: async (params?: { start_date?: string; end_date?: string }): Promise<RevenueReport> => {
    const queryParams = new URLSearchParams();
    if (params?.start_date) queryParams.append("start_date", params.start_date);
    if (params?.end_date) queryParams.append("end_date", params.end_date);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetchWithAuth(`/admin/reports/revenue/${query}`);
    return response.json();
  },

  getDashboardStats: async () => {
    const response = await fetchWithAuth("/admin/dashboard/stats/");
    return response.json();
  },
};

// Super Admin API
export const superAdminAPI = {
  getSystemStats: async () => {
    const response = await fetchWithAuth("/super-admin/stats/");
    return response.json();
  },

  getAllUsers: async (params?: { role?: string; university_id?: string }): Promise<User[]> => {
    const queryParams = new URLSearchParams();
    if (params?.role) queryParams.append("role", params.role);
    if (params?.university_id) queryParams.append("university_id", params.university_id);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetchWithAuth(`/super-admin/users/${query}`);
    return response.json();
  },

  createAdmin: async (data: Partial<User> & { university_id: string }): Promise<User> => {
    const response = await fetchWithAuth("/super-admin/admins/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getTransactions: async (params?: { university_id?: string; status?: string }): Promise<Transaction[]> => {
    const queryParams = new URLSearchParams();
    if (params?.university_id) queryParams.append("university_id", params.university_id);
    if (params?.status) queryParams.append("status", params.status);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetchWithAuth(`/super-admin/transactions/${query}`);
    return response.json();
  },

  getSystemConfig: async () => {
    const response = await fetchWithAuth("/super-admin/config/");
    return response.json();
  },

  updateSystemConfig: async (data: Record<string, unknown>) => {
    const response = await fetchWithAuth("/super-admin/config/", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Payments API
export const paymentsAPI = {
  initiate: async (data: { subscription_id: string; payment_method: string; phone_number: string }) => {
    const response = await fetchWithAuth("/payments/initiate/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  checkStatus: async (reference: string) => {
    const response = await fetchWithAuth(`/payments/status/${reference}/`);
    return response.json();
  },

  getHistory: async (): Promise<Transaction[]> => {
    const response = await fetchWithAuth("/payments/history/");
    return response.json();
  },
};
