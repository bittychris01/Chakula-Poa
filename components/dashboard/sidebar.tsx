"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/context/auth-context";
import {
  LayoutDashboard,
  Utensils,
  CreditCard,
  History,
  Settings,
  LogOut,
  QrCode,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const studentNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Select Meals", href: "/dashboard/meals", icon: Utensils },
  { label: "My Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { label: "Order History", href: "/dashboard/history", icon: History },
  { label: "My QR Code", href: "/dashboard/qr-code", icon: QrCode },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const staffNavItems = [
  { label: "Dashboard", href: "/staff", icon: LayoutDashboard },
  { label: "Verify Students", href: "/staff/verify", icon: QrCode },
  { label: "Today's Orders", href: "/staff/orders", icon: Utensils },
  { label: "History", href: "/staff/history", icon: History },
];

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Meal Management", href: "/admin/meals", icon: Utensils },
  { label: "Students", href: "/admin/students", icon: User },
  { label: "Staff", href: "/admin/staff", icon: User },
  { label: "Reports", href: "/admin/reports", icon: History },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Determine which nav items to show based on user role
  const getNavItems = () => {
    switch (user?.role) {
      case "admin":
      case "super_admin":
        return adminNavItems;
      case "staff":
        return staffNavItems;
      default:
        return studentNavItems;
    }
  };

  const navItems = getNavItems();

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <Image
          src="/logo.jpg"
          alt="Chakula Poa"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="text-lg font-bold text-sidebar-foreground">
          Chakula <span className="text-sidebar-primary">Poa</span>
        </span>
      </div>

      {/* User Info */}
      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
            {user?.full_name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {user?.full_name || "User"}
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              {user?.cps_number || "CPS#0000"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-sidebar-border p-4">
        <button
          type="button"
          onClick={() => {
            logout();
            setIsMobileOpen(false);
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Chakula Poa"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="font-bold text-foreground">Chakula Poa</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsMobileOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-sidebar transition-transform duration-200 lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <SidebarContent />
      </aside>
    </>
  );
}
