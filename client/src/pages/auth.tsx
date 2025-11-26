import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, ArrowRight, Loader2, CheckCircle2, Smartphone, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Form State
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const mobileRegex = /^\+?[1-9]\d{1,14}$/; // Basic E.164 format check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobile.replace(/[\s-]/g, ''))) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must contain at least 1 uppercase, 1 lowercase and 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `We sent a verification code to ${formData.mobile}`,
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (formData.otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit code" });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Set simple auth flag in local storage for mockup purposes
      localStorage.setItem('isLoggedIn', 'true');
      toast({
        title: "Account Verified!",
        description: "Redirecting to your dashboard...",
      });
      setLocation("/creator/dashboard");
    }, 1500);
  };

  const handleLogin = () => {
    // Basic login simulation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Set simple auth flag in local storage for mockup purposes
      localStorage.setItem('isLoggedIn', 'true');
      toast({
        title: "Welcome back!",
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

          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.div
                key="auth-forms"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Tabs defaultValue="register" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Create Account</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
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
                          onClick={handleLogin}
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Sign In
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="register">
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
                            <Input 
                              id="first-name" 
                              placeholder="Alex" 
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              className={errors.firstName ? "border-destructive" : ""}
                            />
                            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input 
                              id="last-name" 
                              placeholder="Doe" 
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              className={errors.lastName ? "border-destructive" : ""}
                            />
                            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <div className="relative">
                             <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                             <Input 
                               id="mobile" 
                               type="tel" 
                               placeholder="+1 (555) 000-0000" 
                               className={`pl-9 ${errors.mobile ? "border-destructive" : ""}`}
                               value={formData.mobile}
                               onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                             />
                          </div>
                          {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password</Label>
                          <Input 
                            id="register-password" 
                            type="password" 
                            className={errors.password ? "border-destructive" : ""}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                          />
                          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                          <p className="text-xs text-muted-foreground">Must contain 1 uppercase, 1 lowercase, and 1 number.</p>
                        </div>

                        <Button 
                          className="w-full" 
                          size="lg" 
                          onClick={handleRegister}
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Create Account <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="otp-verification"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <Button 
                      variant="ghost" 
                      className="mb-4 pl-0 hover:bg-transparent w-fit" 
                      onClick={() => setStep('form')}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <CardTitle className="text-2xl font-display">Verify Mobile Number</CardTitle>
                    <CardDescription>
                      Enter the 6-digit code sent to <strong>{formData.mobile}</strong>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 space-y-6">
                    <div className="flex justify-center">
                      <InputOTP 
                        maxLength={6} 
                        value={formData.otp}
                        onChange={(value) => setFormData({...formData, otp: value})}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <div className="w-4" /> {/* Spacer */}
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    {errors.otp && <p className="text-center text-sm text-destructive">{errors.otp}</p>}

                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={handleVerifyOtp}
                      disabled={isLoading || formData.otp.length !== 6}
                    >
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Verify & Continue
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground">
                      Didn't receive code? <button className="text-primary hover:underline font-medium" onClick={() => toast({title: "Code Resent", description: "Please check your messages."})}>Resend</button>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-muted-foreground mt-8">
            By clicking continue, you agree to our <br/>
            <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
