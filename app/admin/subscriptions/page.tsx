"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Search, Download, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Loading = () => null;

export default function AdminSubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const stats = [
    { title: "Active Subscriptions", value: "1,892", icon: CheckCircle2, color: "text-green-600" },
    { title: "Expiring Soon", value: "45", icon: AlertTriangle, color: "text-amber-600" },
    { title: "This Month Revenue", value: "TSh 45.2M", icon: TrendingUp, color: "text-primary" },
  ];

  const subscriptions = [
    { id: 1, student: "John Makundi", cps: "CPS-2024-001", plan: "Monthly", amount: "TSh 180,000", startDate: "2024-01-01", endDate: "2024-01-31", status: "active" },
    { id: 2, student: "Mary Kessy", cps: "CPS-2024-042", plan: "Semester", amount: "TSh 650,000", startDate: "2024-01-01", endDate: "2024-06-30", status: "active" },
    { id: 3, student: "Peter Mwanga", cps: "CPS-2024-089", plan: "Weekly", amount: "TSh 50,000", startDate: "2024-01-15", endDate: "2024-01-22", status: "expiring" },
    { id: 4, student: "Grace Mushi", cps: "CPS-2024-156", plan: "Monthly", amount: "TSh 180,000", startDate: "2023-12-01", endDate: "2023-12-31", status: "expired" },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Subscriptions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <CreditCard className="h-8 w-8" />
                Subscriptions
              </h1>
              <p className="text-muted-foreground">Manage student meal subscriptions</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Subscriptions</CardTitle>
                  <CardDescription>View and manage all meal plan subscriptions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-[250px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expiring">Expiring</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sub.student}</p>
                          <p className="text-sm text-muted-foreground">{sub.cps}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{sub.plan}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{sub.amount}</TableCell>
                      <TableCell>{sub.startDate}</TableCell>
                      <TableCell>{sub.endDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sub.status === "active"
                              ? "default"
                              : sub.status === "expiring"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </>
    </Suspense>
  );
}
