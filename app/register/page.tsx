"use client";

import React from "react"

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/context/auth-context";
import { universities as universitiesAPI } from "@/lib/api/endpoints";
import type { University } from "@/lib/types";
import {
  Loader2,
  Phone,
  Lock,
  User,
  Mail,
  GraduationCap,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  Building2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loadingUniversities, setLoadingUniversities] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    registration_number: "",
    university_id: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState<{ cps_number: string } | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await universitiesAPI.getAll();
        if (response.data) {
          setUniversities(response.data);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch {
        // Use demo universities if API fails
        setUniversities([
          { id: "1", name: "University of Dar es Salaam (UDSM)", code: "UDSM", location: "Dar es Salaam", is_active: true, created_at: new Date().toISOString() },
          { id: "2", name: "University of Dodoma (UDOM)", code: "UDOM", location: "Dodoma", is_active: true, created_at: new Date().toISOString() },
          { id: "3", name: "Muhimbili University (MUHAS)", code: "MUHAS", location: "Dar es Salaam", is_active: true, created_at: new Date().toISOString() },
          { id: "4", name: "Ardhi University", code: "ARU", location: "Dar es Salaam", is_active: true, created_at: new Date().toISOString() },
          { id: "5", name: "Sokoine University of Agriculture", code: "SUA", location: "Morogoro", is_active: true, created_at: new Date().toISOString() },
        ]);
      } finally {
        setLoadingUniversities(false);
      }
    };
    fetchUniversities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.full_name || !formData.phone_number || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const result = await register({
      full_name: formData.full_name,
      phone_number: formData.phone_number,
      email: formData.email || undefined,
      registration_number: formData.registration_number || undefined,
      university_id: formData.university_id || undefined,
      password: formData.password,
    });

    if (result.success) {
      setSuccess({ cps_number: result.cps_number || "CPS#0000" });
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Registration Successful!</CardTitle>
            <CardDescription>Welcome to Chakula Poa</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Your CPS Number has been generated. Please save it for future reference.
            </p>
            <div className="rounded-xl bg-primary/10 p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Your CPS Number</p>
              <p className="text-3xl font-bold text-primary">{success.cps_number}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation SMS has been sent to your phone number.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full h-11 font-semibold"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/subscription")}
              className="w-full h-11 font-semibold"
            >
              Subscribe to a Plan
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/images/meals-preview.jpg"
          alt="Delicious meals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <h2 className="text-3xl font-bold text-background mb-4">
            Join 5,000+ Students
          </h2>
          <ul className="space-y-3 text-background/90">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Affordable meal plans starting from TSh 14,000/week</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Pre-order meals 24 hours in advance</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Pay easily with M-Pesa or Airtel Money</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>No more long queues at the canteen</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-8 lg:w-1/2 lg:px-8">
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
          <div className="mt-6 flex items-center gap-3">
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
          <Card className="mt-6 border-border/50 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign up to start enjoying delicious campus meals
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="full_name"
                      type="text"
                      placeholder="Chedy Amar"
                      className="pl-10 h-11"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0620 636 892"
                      className="pl-10 h-11"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({ ...formData, phone_number: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="chedy@example.com"
                      className="pl-10 h-11"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* University */}
                <div className="space-y-2">
                  <Label htmlFor="university" className="text-sm font-medium">
                    University
                  </Label>
                  <Select
                    value={formData.university_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, university_id: value })
                    }
                    disabled={loadingUniversities}
                  >
                    <SelectTrigger className="h-11">
                      <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select your university" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni.id} value={uni.id}>
                          {uni.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Registration Number */}
                <div className="space-y-2">
                  <Label htmlFor="reg_number" className="text-sm font-medium">
                    Registration Number <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg_number"
                      type="text"
                      placeholder="BCS/18869/2101/DT"
                      className="pl-10 h-11"
                      value={formData.registration_number}
                      onChange={(e) =>
                        setFormData({ ...formData, registration_number: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10 h-11"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm_password" className="text-sm font-medium">
                    Confirm Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 h-11"
                      value={formData.confirm_password}
                      onChange={(e) =>
                        setFormData({ ...formData, confirm_password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
