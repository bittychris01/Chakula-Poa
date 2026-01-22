"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { Users, UtensilsCrossed, CreditCard, TrendingUp, Building, AlertTriangle, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Students", value: "2,456", change: "+12%", trend: "up", icon: Users },
    { title: "Active Subscriptions", value: "1,892", change: "+8%", trend: "up", icon: CreditCard },
    { title: "Meals Served Today", value: "856", change: "+5%", trend: "up", icon: UtensilsCrossed },
    { title: "Revenue This Month", value: "TSh 45.2M", change: "+15%", trend: "up", icon: TrendingUp },
  ];

  const recentStudents = [
    { name: "John Makundi", cps: "CPS-2024-001", plan: "Monthly", status: "active" },
    { name: "Mary Kessy", cps: "CPS-2024-042", plan: "Semester", status: "active" },
    { name: "Peter Mwanga", cps: "CPS-2024-089", plan: "Weekly", status: "expiring" },
    { name: "Grace Mushi", cps: "CPS-2024-156", plan: "Monthly", status: "expired" },
  ];

  const mealStats = [
    { meal: "Breakfast", served: 234, capacity: 400, percentage: 58 },
    { meal: "Lunch", served: 412, capacity: 500, percentage: 82 },
    { meal: "Dinner", served: 210, capacity: 450, percentage: 47 },
  ];

  const alerts = [
    { type: "warning", message: "15 subscriptions expiring tomorrow", time: "2h ago" },
    { type: "info", message: "New staff member pending approval", time: "4h ago" },
    { type: "success", message: "Weekly report generated successfully", time: "6h ago" },
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your canteen operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent" asChild>
              <Link href="/admin/reports">View Reports</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/students/new">Add Student</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-600" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Students</CardTitle>
              <CardDescription>Latest registered students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.cps}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{student.plan}</Badge>
                      <Badge
                        variant={
                          student.status === "active"
                            ? "default"
                            : student.status === "expiring"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
                <Link href="/admin/students">View All Students</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Capacity</CardTitle>
                <CardDescription>Today's serving progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mealStats.map((meal) => (
                  <div key={meal.meal} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{meal.meal}</span>
                      <span className="text-muted-foreground">
                        {meal.served}/{meal.capacity}
                      </span>
                    </div>
                    <Progress value={meal.percentage} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                    {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                    {alert.type === "info" && <Clock className="h-5 w-5 text-blue-500" />}
                    {alert.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
