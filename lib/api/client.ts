/**
 * Chakula Poa API Client
 * 
 * This is the main API client that connects to your Django backend.
 * 
 * HOW TO CONNECT TO YOUR DJANGO BACKEND:
 * 1. Set the NEXT_PUBLIC_API_URL environment variable to your Django server URL
 *    Example: NEXT_PUBLIC_API_URL=https://api.chakulapoa.co.tz
 * 
 * 2. For local development, your Django server should run on a different port
 *    Example: NEXT_PUBLIC_API_URL=http://localhost:8000
 * 
 * 3. Make sure Django has CORS headers enabled for your frontend domain
 *    Install: pip install django-cors-headers
 *    Add to CORS_ALLOWED_ORIGINS in settings.py
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

// Token management
const TOKEN_KEY = 'chakula_poa_access_token';
const REFRESH_TOKEN_KEY = 'chakula_poa_refresh_token';

export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  
  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  
  clearTokens: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

/**
 * Main API request function
 * Use this for all API calls to your Django backend
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    requiresAuth = true,
  } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add JWT token if authenticated request
  if (requiresAuth) {
    const token = tokenManager.getAccessToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && requiresAuth) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry the original request with new token
        const newToken = tokenManager.getAccessToken();
        requestHeaders['Authorization'] = `Bearer ${newToken}`;
        
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          headers: requestHeaders,
          body: body ? JSON.stringify(body) : undefined,
        });
        
        const retryData = await retryResponse.json().catch(() => null);
        return {
          data: retryData,
          status: retryResponse.status,
          error: retryResponse.ok ? undefined : retryData?.detail || 'Request failed',
        };
      } else {
        // Refresh failed, clear tokens
        tokenManager.clearTokens();
        return {
          status: 401,
          error: 'Session expired. Please login again.',
        };
      }
    }

    const data = await response.json().catch(() => null);
    
    return {
      data: response.ok ? data : undefined,
      status: response.status,
      error: response.ok ? undefined : data?.detail || data?.message || 'Request failed',
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      status: 0,
      error: 'Network error. Please check your connection.',
    };
  }
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      tokenManager.setTokens(data.access, refreshToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * API Helper functions for common operations
 */
export const api = {
  get: <T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: Record<string, unknown>, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),
  put: <T>(endpoint: string, body?: Record<string, unknown>, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),
  patch: <T>(endpoint: string, body?: Record<string, unknown>, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),
  delete: <T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
