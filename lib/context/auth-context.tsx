"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api/endpoints";
import { tokenManager } from "@/lib/api/client";
import type { User, LoginCredentials, RegisterData } from "@/lib/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string; cps_number?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const refreshUser = useCallback(async () => {
    const token = tokenManager.getAccessToken();
    if (!token) {
      setState({ user: null, isLoading: false, isAuthenticated: false });
      return;
    }

    const response = await auth.getCurrentUser();
    if (response.data) {
      setState({ user: response.data, isLoading: false, isAuthenticated: true });
    } else {
      tokenManager.clearTokens();
      setState({ user: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const response = await auth.login(credentials);
    
    if (response.data) {
      setState({ user: response.data.user, isLoading: false, isAuthenticated: true });
      return { success: true };
    }
    
    setState((prev) => ({ ...prev, isLoading: false }));
    return { success: false, error: response.error || "Login failed" };
  };

  const register = async (data: RegisterData) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const response = await auth.register(data);
    
    if (response.data) {
      setState({ user: response.data.user, isLoading: false, isAuthenticated: true });
      return { success: true, cps_number: response.data.user.cps_number };
    }
    
    setState((prev) => ({ ...prev, isLoading: false }));
    return { success: false, error: response.error || "Registration failed" };
  };

  const logout = useCallback(() => {
    auth.logout();
    setState({ user: null, isLoading: false, isAuthenticated: false });
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Route protection HOC
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: User["role"][]
) {
  return function ProtectedRoute(props: P) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      } else if (!isLoading && isAuthenticated && allowedRoles && user) {
        if (!allowedRoles.includes(user.role)) {
          // Redirect to appropriate dashboard based on role
          switch (user.role) {
            case "student":
              router.push("/dashboard");
              break;
            case "staff":
              router.push("/staff");
              break;
            case "admin":
              router.push("/admin");
              break;
            case "super_admin":
              router.push("/super-admin");
              break;
            default:
              router.push("/dashboard");
          }
        }
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <Component {...props} />;
  };
}
