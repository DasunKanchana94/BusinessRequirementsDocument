import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Clock, Calendar as CalendarIcon, CreditCard, ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const packages = {
  1: { id: 1, title: "Marketing Audit", duration: 30, price: 150 },
  2: { id: 2, title: "Growth Strategy Deep Dive", duration: 60, price: 300 },
  3: { id: 3, title: "Monthly Retainer Call", duration: 45, price: 200 }
};

export default function BookingPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [match, params] = useRoute("/booking/:creator/:packageId");
  const packageId = params?.packageId ? parseInt(params.packageId) : 1;
  // @ts-ignore
  const selectedPackage = packages[packageId] || packages[1];
  
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      toast({
        title: "Booking Confirmed!",
        description: "A confirmation email has been sent to your inbox.",
      });
    }, 2000);
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:30 PM", "04:00 PM"
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href={`/creators/${params?.creator}`}>
            <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Summary Card (Always visible) */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="sticky top-24 border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=11" alt="Creator" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">With</p>
                      <p className="font-bold">Alex Rivera</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-1">{selectedPackage.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>{selectedPackage.duration} minutes</span>
                    </div>
                  </div>

                  {date && timeSlot && (
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-2 text-primary font-medium text-sm mb-1">
                        <CalendarIcon size={14} />
                        <span>{date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric'})}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock size={14} />
                        <span>{timeSlot} (EDT)</span>
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold font-display">${selectedPackage.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 py-3 text-xs text-muted-foreground">
                  <ShieldCheck size={12} className="mr-1.5" /> 
                  Secure payment held until completion
                </CardFooter>
              </Card>
            </div>

            {/* Right: Steps */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Select a Date & Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="flex-1">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="rounded-md border shadow-none w-full flex justify-center"
                            />
                          </div>
                          <div className="flex-1">
                            <Label className="mb-3 block">Available Slots</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots.map((slot) => (
                                <Button
                                  key={slot}
                                  variant={timeSlot === slot ? "default" : "outline"}
                                  className={`justify-start ${timeSlot === slot ? "border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : ""}`}
                                  onClick={() => setTimeSlot(slot)}
                                >
                                  {slot}
                                </Button>
                              ))}
                            </div>
                            <div className="mt-6">
                              <Label className="mb-2 block">Timezone</Label>
                              <Select defaultValue="edt">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="edt">Eastern Time (US & Canada)</SelectItem>
                                  <SelectItem value="pdt">Pacific Time (US & Canada)</SelectItem>
                                  <SelectItem value="utc">UTC</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-end border-t pt-6">
                        <Button 
                          onClick={() => setStep(2)} 
                          disabled={!date || !timeSlot}
                          size="lg"
                        >
                          Continue
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Details & Payment</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-4">
                          <Label>Payment Method</Label>
                          <div className="border rounded-lg p-4 space-y-4 bg-muted/10">
                            <RadioGroup defaultValue="card">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                                  <CreditCard size={16} /> Credit Card
                                </Label>
                              </div>
                            </RadioGroup>
                            
                            <div className="grid gap-4 pl-6">
                              <div className="space-y-2">
                                <Input placeholder="Card number" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="MM/YY" />
                                <Input placeholder="CVC" />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                             <ShieldCheck size={12} /> Payment is securely processed by Stripe. Funds are held until the session is complete.
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between border-t pt-6">
                        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <Button onClick={handlePayment} disabled={isProcessing} size="lg">
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                            </>
                          ) : (
                            `Pay $${selectedPackage.price}`
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-green-200 bg-green-50/30">
                      <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                          <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-bold font-display mb-2 text-green-900">Booking Confirmed!</h2>
                        <p className="text-muted-foreground max-w-md mb-8">
                          You're all set for your session with Alex Rivera. We've sent a calendar invite and the meeting link to your email.
                        </p>
                        
                        <div className="w-full max-w-md bg-background rounded-lg border p-4 mb-8 text-left shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                             <span className="text-sm font-medium text-muted-foreground">Meeting Link</span>
                             <Badge variant="outline" className="text-xs">Active 10m before</Badge>
                          </div>
                          <div className="flex gap-2">
                             <Input value="https://meet.google.com/abc-defg-hij" readOnly className="bg-muted" />
                             <Button variant="outline">Copy</Button>
                          </div>
                        </div>

                        <Link href="/">
                          <Button variant="default">Return Home</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
