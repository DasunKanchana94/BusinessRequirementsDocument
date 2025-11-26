import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Calendar, 
  Video, 
  DollarSign, 
  Users, 
  Settings, 
  Clock, 
  MoreHorizontal,
  ArrowUpRight,
  Link as LinkIcon,
  Copy
} from "lucide-react";
import { Link } from "wouter";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Mock Data
const data = [
  { name: "Mon", total: 150 },
  { name: "Tue", total: 300 },
  { name: "Wed", total: 150 },
  { name: "Thu", total: 450 },
  { name: "Fri", total: 300 },
  { name: "Sat", total: 600 },
  { name: "Sun", total: 450 },
];

const bookings = [
  { id: 1, client: "Sarah Jenkins", package: "Growth Strategy", time: "Today, 2:00 PM", status: "upcoming", price: "$300" },
  { id: 2, client: "Mike Ross", package: "Marketing Audit", time: "Tomorrow, 10:00 AM", status: "upcoming", price: "$150" },
  { id: 3, client: "Emily Chen", package: "Consultation", time: "Yesterday", status: "completed", price: "$150" },
  { id: 4, client: "David Kim", package: "Monthly Retainer", time: "Nov 22, 2025", status: "completed", price: "$200" },
];

export default function CreatorDashboard() {
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] bg-muted/30">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-background hidden lg:block">
          <div className="p-6">
             <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                 <img src="https://i.pravatar.cc/150?img=11" alt="Profile" />
               </div>
               <div>
                 <p className="font-medium text-sm">Alex Rivera</p>
                 <p className="text-xs text-muted-foreground">Creator</p>
               </div>
             </div>
             
             <nav className="space-y-1">
               <Button variant="secondary" className="w-full justify-start font-medium">
                 <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Calendar className="mr-2 h-4 w-4" /> Schedule
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Video className="mr-2 h-4 w-4" /> Bookings
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <DollarSign className="mr-2 h-4 w-4" /> Earnings
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Users className="mr-2 h-4 w-4" /> Clients
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Settings className="mr-2 h-4 w-4" /> Settings
               </Button>
             </nav>
          </div>
          
          <div className="p-6 mt-auto border-t border-border">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <p className="text-xs font-medium text-primary mb-2">Your Booking Link</p>
              <div className="flex items-center gap-2 bg-background p-1.5 rounded border text-xs text-muted-foreground">
                <span className="truncate">slvideo.com/creators/alex-rivera</span>
                <Copy size={12} className="cursor-pointer hover:text-foreground" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
            </div>
            <div className="flex gap-3">
               <Button variant="outline">Share Profile</Button>
               <Button>
                 <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
               </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,231.89</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight size={12} className="mr-1" /> +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+24</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight size={12} className="mr-1" /> +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sessions this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,329</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight size={12} className="mr-1" /> +8% from last week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <XAxis
                          dataKey="name"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Bar
                          dataKey="total"
                          fill="currentColor"
                          radius={[4, 4, 0, 0]}
                          className="fill-primary"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                   <CardTitle>Recent Bookings</CardTitle>
                   <CardDescription>You have 2 sessions today.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${booking.status === 'upcoming' ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <div>
                            <p className="font-medium text-sm leading-none">{booking.client}</p>
                            <p className="text-xs text-muted-foreground mt-1">{booking.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{booking.price}</span>
                          {booking.status === 'upcoming' ? (
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-primary">
                              <Video size={16} />
                            </Button>
                          ) : (
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                              <MoreHorizontal size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">View All Bookings</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
