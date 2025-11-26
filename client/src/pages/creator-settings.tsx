import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function CreatorSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock State for Packages
  const [packages, setPackages] = useState([
    { id: 1, title: "Marketing Audit", duration: 30, price: 150, description: "Quick review of your current strategy." },
    { id: 2, title: "Growth Strategy Deep Dive", duration: 60, price: 300, description: "Comprehensive roadmap session." }
  ]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Changes Saved",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  const handleAddPackage = () => {
    const newId = Math.max(...packages.map(p => p.id), 0) + 1;
    setPackages([...packages, { id: newId, title: "New Session", duration: 30, price: 100, description: "" }]);
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] bg-muted/30">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border bg-background hidden lg:block p-6">
          <h2 className="font-bold text-lg mb-6 px-2">Settings</h2>
          <nav className="space-y-1">
            <Link href="/creator/settings">
              <Button variant="secondary" className="w-full justify-start font-medium">
                Profile & Packages
              </Button>
            </Link>
            <Link href="/creator/payouts">
              <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                Payouts & Banking
              </Button>
            </Link>
            <Link href="/creator/dashboard">
              <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground mt-8">
                ← Back to Dashboard
              </Button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Profile Setup</h1>
              <p className="text-muted-foreground">Manage how you appear to your clients.</p>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <span className="animate-spin mr-2">⏳</span> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-8">
            <TabsList>
              <TabsTrigger value="general">General Info</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            {/* General Info Tab */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>This information will be displayed on your booking page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="space-y-4">
                      <Label>Profile Photo</Label>
                      <div className="relative w-32 h-32 rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=11" className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-50 transition-opacity" alt="Profile" />
                        <div className="z-10 flex flex-col items-center text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload size={24} className="mb-2" />
                          <span className="text-xs font-medium">Change</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 w-full space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Display Name</Label>
                          <Input id="name" defaultValue="Alex Rivera" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Professional Title</Label>
                          <Input id="role" defaultValue="Digital Marketing Strategist" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          className="min-h-[120px]"
                          defaultValue="Helping SaaS founders scale from $0 to $1M ARR through organic growth strategies and content marketing. Former VP of Marketing at TechFlow." 
                        />
                        <p className="text-xs text-muted-foreground text-right">140/500 characters</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="url">Custom URL</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            slvideo.com/creators/
                          </span>
                          <Input id="url" defaultValue="alex-rivera" className="rounded-l-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Packages Tab */}
            <TabsContent value="packages">
              <div className="grid gap-6">
                {packages.map((pkg, index) => (
                  <Card key={pkg.id} className="relative group">
                    <CardContent className="p-6">
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeletePackage(pkg.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 space-y-4">
                          <div className="space-y-2">
                            <Label>Package Title</Label>
                            <Input defaultValue={pkg.title} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Price ($)</Label>
                              <Input type="number" defaultValue={pkg.price} />
                            </div>
                            <div className="space-y-2">
                              <Label>Duration (min)</Label>
                              <Input type="number" defaultValue={pkg.duration} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:col-span-8 space-y-4">
                           <div className="space-y-2">
                             <Label>Description</Label>
                             <Textarea defaultValue={pkg.description} />
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="flex items-center space-x-2">
                                <input type="checkbox" id={`popular-${pkg.id}`} className="rounded border-gray-300" />
                                <Label htmlFor={`popular-${pkg.id}`} className="text-sm font-normal">Mark as Popular</Label>
                             </div>
                           </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button variant="outline" className="border-dashed h-24 w-full hover:bg-muted/50" onClick={handleAddPackage}>
                  <Plus className="mr-2 h-5 w-5" /> Add New Package
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="availability">
              <Card>
                <CardHeader>
                   <CardTitle>Weekly Schedule</CardTitle>
                   <CardDescription>Set the hours you are available for bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <div key={day} className="flex items-center justify-between py-2 border-b last:border-0">
                           <div className="flex items-center gap-4">
                             <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                             <span className="font-medium w-24">{day}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <Input className="w-32" defaultValue="09:00" type="time" />
                             <span className="text-muted-foreground">-</span>
                             <Input className="w-32" defaultValue="17:00" type="time" />
                           </div>
                        </div>
                      ))}
                      {['Saturday', 'Sunday'].map(day => (
                        <div key={day} className="flex items-center justify-between py-2 border-b last:border-0 opacity-60">
                           <div className="flex items-center gap-4">
                             <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                             <span className="font-medium w-24">{day}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="text-sm text-muted-foreground">Unavailable</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Layout>
  );
}
