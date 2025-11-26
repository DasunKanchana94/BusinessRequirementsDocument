import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Landmark, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CreatorPayouts() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectStripe = () => {
    setIsLoading(true);
    // Simulate Stripe Connect flow
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      toast({
        title: "Stripe Connected!",
        description: "You can now receive payouts directly to your bank account.",
      });
    }, 2000);
  };

  return (
    <Layout>
       <div className="flex min-h-[calc(100vh-4rem)] bg-muted/30">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border bg-background hidden lg:block p-6">
          <h2 className="font-bold text-lg mb-6 px-2">Settings</h2>
          <nav className="space-y-1">
            <Link href="/creator/settings">
              <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                Profile & Packages
              </Button>
            </Link>
            <Link href="/creator/payouts">
              <Button variant="secondary" className="w-full justify-start font-medium">
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

        <main className="flex-1 p-8 overflow-y-auto max-w-3xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display tracking-tight">Payout Settings</h1>
            <p className="text-muted-foreground">Manage how you get paid.</p>
          </div>

          <div className="space-y-6">
            {/* Stripe Connect Status */}
            <Card className={`${isConnected ? 'border-green-200 bg-green-50/30' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded text-white">
                      <span className="font-bold">S</span>
                    </div>
                    <div>
                      <CardTitle>Stripe Connect</CardTitle>
                      <CardDescription>We use Stripe to ensure you get paid securely and on time.</CardDescription>
                    </div>
                  </div>
                  {isConnected && (
                     <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">Active</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="space-y-4">
                    <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
                      <AlertCircle className="h-4 w-4 stroke-blue-800" />
                      <AlertTitle>Action Required</AlertTitle>
                      <AlertDescription>
                        You need to connect a bank account to start receiving payouts from your bookings.
                      </AlertDescription>
                    </Alert>
                    <p className="text-sm text-muted-foreground">
                      By connecting your account, you agree to Stripe's Connected Account Agreement.
                      Standard payout timing is rolling 2-day deposits.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="text-green-600 h-5 w-5" />
                      <span>Your account is connected and ready to receive payouts.</span>
                    </div>
                    <div className="bg-background border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Connected Account</span>
                        <span className="text-sm font-mono">acct_1M...4J9</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-sm text-muted-foreground">Bank Account</span>
                         <span className="text-sm font-medium">**** 4242</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!isConnected ? (
                  <Button onClick={handleConnectStripe} disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    {isLoading ? "Connecting..." : "Setup Payouts with Stripe"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="outline" className="text-destructive hover:text-destructive">Disconnect Account</Button>
                )}
              </CardFooter>
            </Card>

            {/* Manual Bank Details (Fallback/Alternative) */}
            <Card className={isConnected ? "opacity-50 pointer-events-none" : ""}>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Landmark size={20} /> Manual Bank Entry
                 </CardTitle>
                 <CardDescription>Only use this if Stripe Connect is not supported in your region.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label>Account Holder Name</Label>
                   <Input placeholder="Full Legal Name" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Routing Number</Label>
                     <Input placeholder="123456789" />
                   </div>
                   <div className="space-y-2">
                     <Label>Account Number</Label>
                     <Input type="password" placeholder="••••••••••" />
                   </div>
                 </div>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <ShieldCheck size={12} />
                    <span>Banking data is encrypted and stored securely.</span>
                 </div>
               </CardContent>
               <CardFooter>
                 <Button variant="outline" disabled>Save Bank Details</Button>
               </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  );
}
