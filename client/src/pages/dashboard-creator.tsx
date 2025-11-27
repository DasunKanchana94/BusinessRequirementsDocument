import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Copy,
  Loader2,
  X
} from "lucide-react";
import { Link } from "wouter";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

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

interface Booking {
  id: string;
  clientMobile: string;
  clientEmail?: string;
  scheduledAt: string;
  duration: number;
  status: string;
  price: string;
  packageId: string;
}

export default function CreatorDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([
    { 
      id: "b1", 
      clientMobile: "+1 (555) 123-4567", 
      clientEmail: "sarah@example.com",
      packageId: "pkg1",
      scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      duration: 60, 
      status: "upcoming", 
      price: "$300" 
    },
    { 
      id: "b2", 
      clientMobile: "+1 (555) 234-5678",
      packageId: "pkg2", 
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      duration: 30, 
      status: "upcoming", 
      price: "$150" 
    },
    { 
      id: "b3", 
      clientMobile: "+1 (555) 345-6789",
      clientEmail: "john@example.com",
      packageId: "pkg1",
      scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 45, 
      status: "upcoming", 
      price: "$250" 
    },
    { 
      id: "b4", 
      clientMobile: "+1 (555) 456-7890",
      packageId: "pkg3",
      scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 60, 
      status: "upcoming", 
      price: "$400" 
    },
    { 
      id: "b5", 
      clientMobile: "+1 (555) 567-8901",
      clientEmail: "emma@example.com",
      packageId: "pkg2",
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 30, 
      status: "upcoming", 
      price: "$150" 
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingDialogOpen, setUpcomingDialogOpen] = useState(false);

  const upcomingSessions = bookings
    .filter(b => b.status === 'upcoming')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 10);

  const upcomingCount = upcomingSessions.length;

  // Calculate today's stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todaysBookings = bookings.filter(b => {
    const bookingDate = new Date(b.scheduledAt);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate.getTime() === today.getTime();
  });

  const todaysRevenue = todaysBookings.reduce((sum, b) => {
    const amount = parseFloat(b.price.replace('$', ''));
    return sum + amount;
  }, 0);

  useEffect(() => {
    // In production, fetch real bookings from API
    // setIsLoading(true);
    // fetch('/api/bookings/creator/[userId]')
    //   .then(r => r.json())
    //   .then(data => setBookings(data))
    //   .finally(() => setIsLoading(false));
  }, []);
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
               <Link href="/creator/dashboard">
                 <Button variant="secondary" className="w-full justify-start font-medium">
                   <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                 </Button>
               </Link>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Calendar className="mr-2 h-4 w-4" /> Schedule
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Video className="mr-2 h-4 w-4" /> Bookings
               </Button>
               <Link href="/creator/payouts">
                 <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                   <DollarSign className="mr-2 h-4 w-4" /> Earnings & Payouts
                 </Button>
               </Link>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Users className="mr-2 h-4 w-4" /> Clients
               </Button>
               <Link href="/creator/settings">
                 <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                   <Settings className="mr-2 h-4 w-4" /> Settings
                 </Button>
               </Link>
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
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${todaysRevenue.toFixed(2)}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight size={12} className="mr-1" /> Today's earnings
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todaysBookings.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sessions scheduled today
                </p>
              </CardContent>
            </Card>
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => setUpcomingDialogOpen(true)}
              data-testid="card-upcoming"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to view sessions
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
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${booking.status === 'upcoming' ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <div>
                              <p className="font-medium text-sm leading-none">{booking.clientMobile}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(booking.scheduledAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{booking.price}</span>
                            {booking.status === 'upcoming' ? (
                              <Link href={`/meeting/${booking.id}`}>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-8 w-8 text-primary"
                                  data-testid={`button-join-${booking.id}`}
                                >
                                  <Video size={16} />
                                </Button>
                              </Link>
                            ) : (
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                                <MoreHorizontal size={16} />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button variant="outline" className="w-full mt-6" data-testid="button-view-all">View All Bookings</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Upcoming Sessions Dialog */}
      <Dialog open={upcomingDialogOpen} onOpenChange={setUpcomingDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]" data-testid="dialog-upcoming-sessions">
          <DialogHeader>
            <DialogTitle className="text-2xl">Upcoming Sessions</DialogTitle>
            <DialogDescription>
              You have {upcomingCount} upcoming sessions. Click "Join" to start a session.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    data-testid={`session-item-${session.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <p className="font-medium text-sm">{session.clientMobile}</p>
                        {session.clientEmail && (
                          <span className="text-xs text-muted-foreground">({session.clientEmail})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(session.scheduledAt).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {session.duration} min
                        </div>
                        <div className="font-medium text-foreground">{session.price}</div>
                      </div>
                    </div>
                    <Link href={`/meeting/${session.id}`}>
                      <Button 
                        size="sm"
                        className="ml-4"
                        data-testid={`button-join-session-${session.id}`}
                      >
                        <Video size={14} className="mr-1" />
                        Join
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <p>No upcoming sessions</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
