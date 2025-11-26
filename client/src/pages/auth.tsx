import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const handleAuth = (type: 'login' | 'register') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: type === 'login' ? "Welcome back!" : "Account created!",
        description: "Redirecting to your dashboard...",
      });
      setLocation("/creator/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-col bg-muted/30 relative overflow-hidden p-12 justify-between border-r border-border">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="z-10">
          <Link href="/">
            <div className="flex items-center gap-2 mb-12 cursor-pointer">
              <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                <Video size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold font-display tracking-tight">SLVIDEO</span>
            </div>
          </Link>
          
          <h1 className="text-4xl font-display font-bold leading-tight mb-6">
            Turn your expertise into <br/>
            <span className="text-primary">recurring revenue.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Join thousands of consultants, coaches, and creators who use SLVIDEO to schedule, book, and get paid for video calls.
          </p>
        </div>

        <div className="z-10 space-y-6">
           <div className="flex items-center gap-4 bg-background/50 backdrop-blur border border-border p-4 rounded-xl shadow-sm max-w-md">
             <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
               <CheckCircle2 size={20} />
             </div>
             <div>
               <p className="font-semibold text-sm">Instant Payouts</p>
               <p className="text-xs text-muted-foreground">Connect Stripe and get paid daily.</p>
             </div>
           </div>
           <div className="flex items-center gap-4 bg-background/50 backdrop-blur border border-border p-4 rounded-xl shadow-sm max-w-md ml-8">
             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
               <Video size={20} />
             </div>
             <div>
               <p className="font-semibold text-sm">Built-in Video</p>
               <p className="text-xs text-muted-foreground">No Zoom links needed. One-click join.</p>
             </div>
           </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © 2025 SLVIDEO Inc.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden mb-8 text-center">
             <div className="flex items-center justify-center gap-2 mb-4">
               <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                 <Video size={24} strokeWidth={2.5} />
               </div>
               <span className="text-xl font-bold font-display tracking-tight">SLVIDEO</span>
             </div>
          </div>

          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-display">Welcome back</CardTitle>
                    <CardDescription>
                      Enter your email below to login to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                      </div>
                      <Input id="password" type="password" />
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={() => handleAuth('login')}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Sign In
                    </Button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" type="button" disabled={isLoading}>
                      <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                      Google
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="register">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-display">Create an account</CardTitle>
                    <CardDescription>
                      Start monetizing your time in less than 2 minutes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="Alex" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" />
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={() => handleAuth('register')}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" type="button" disabled={isLoading}>
                      <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                      Google
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-8">
            By clicking continue, you agree to our <br/>
            <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
