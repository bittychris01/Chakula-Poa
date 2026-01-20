"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Loader2, Phone, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, user } = useAuth();
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.phone_number || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(formData);

    if (result.success) {
      // Redirect based on user role (will be handled after user data is loaded)
      router.push("/dashboard");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  // Redirect after successful login based on role
  if (user) {
    switch (user.role) {
      case "super_admin":
        router.push("/super-admin");
        break;
      case "admin":
        router.push("/admin");
        break;
      case "staff":
        router.push("/staff");
        break;
      default:
        router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="mt-8 flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Chakula Poa"
              width={80}
              height={80}
              className="rounded-xl"
            />
            <span className="text-2xl font-bold text-foreground">
              Chakula <span className="text-primary">Poa</span>
            </span>
          </div>

          {/* Form Card */}
          <Card className="mt-8 border-border/50 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your phone number and password to access your account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">
                {error && (
                  <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0712 345 678"
                      className="pl-10 h-11"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({ ...formData, phone_number: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-11"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {"Don't have an account? "}
                  <Link href="/register" className="font-semibold text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* USSD Alternative */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              No smartphone? Dial{" "}
              <span className="font-bold text-primary">*148*93#</span> to
              access your account via USSD
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/images/hero-students.jpg"
          alt="Students at canteen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary-foreground">Trusted by 5,000+ students</span>
          </div>
          <blockquote className="text-xl font-medium text-background leading-relaxed">
            &ldquo;Chakula Poa has made my campus life so much easier. No more
            rushing to the canteen or missing lunch!&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-background/80">
            — Sarah M., UDSM Student
          </p>
        </div>
      </div>
    </div>
  );
}
