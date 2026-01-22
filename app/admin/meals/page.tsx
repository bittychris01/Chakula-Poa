"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, UtensilsCrossed, Clock, Users } from "lucide-react";

export default function AdminMealsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const meals = [
    { id: 1, name: "Rice with Beans", type: "Lunch", price: 3500, available: true, servings: 150, description: "White rice served with kidney beans stew" },
    { id: 2, name: "Ugali with Fish", type: "Dinner", price: 5000, available: true, servings: 100, description: "Traditional ugali with grilled tilapia" },
    { id: 3, name: "Chapati with Beans", type: "Breakfast", price: 2500, available: true, servings: 200, description: "Soft chapati with bean curry" },
    { id: 4, name: "Pilau", type: "Lunch", price: 4500, available: false, servings: 0, description: "Spiced rice with meat" },
    { id: 5, name: "Wali Maharage", type: "Dinner", price: 3000, available: true, servings: 180, description: "Rice with coconut beans" },
    { id: 6, name: "Mandazi with Tea", type: "Breakfast", price: 1500, available: true, servings: 250, description: "Fried dough with chai" },
  ];

  const mealStats = [
    { type: "Breakfast", count: 2, color: "bg-amber-500" },
    { type: "Lunch", count: 2, color: "bg-green-500" },
    { type: "Dinner", count: 2, color: "bg-blue-500" },
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Meal Management</h1>
      </header>

      <main className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meals</h1>
            <p className="text-muted-foreground">Manage daily meals and menu items</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Meal</DialogTitle>
                <DialogDescription>Add a new meal to the menu</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Meal Name</Label>
                  <Input placeholder="e.g., Rice with Beans" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of the meal" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Meal Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Price (TZS)</Label>
                    <Input type="number" placeholder="3500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Available Servings</Label>
                  <Input type="number" placeholder="150" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Available for ordering</Label>
                  <Switch defaultChecked />
                </div>
                <Button className="w-full" onClick={() => setShowAddDialog(false)}>
                  Add Meal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {mealStats.map((stat) => (
            <Card key={stat.type}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.type} Meals</CardTitle>
                <div className={`h-3 w-3 rounded-full ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <p className="text-xs text-muted-foreground">items available</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <Card key={meal.id} className={!meal.available ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{meal.name}</CardTitle>
                    <CardDescription>{meal.description}</CardDescription>
                  </div>
                  <Badge variant={meal.type === "Breakfast" ? "secondary" : meal.type === "Lunch" ? "default" : "outline"}>
                    {meal.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold">TZS {meal.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Servings
                    </span>
                    <span className="font-semibold">{meal.servings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={meal.available ? "default" : "secondary"}>
                      {meal.available ? "Available" : "Unavailable"}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
