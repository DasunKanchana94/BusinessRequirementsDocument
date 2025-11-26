import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar, CreditCard, Video, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/professional_consult_da0822d3.jpg";
import creatorImage from "@assets/stock_images/happy_content_creato_da81d039.jpg";
import bgPattern from "@assets/stock_images/modern_abstract_tech_6ed1e668.jpg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/15 px-4 py-1.5 text-sm font-medium rounded-full border-none shadow-none">
                Now in Beta Access
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-foreground">
                Monetize your <br/>
                <span className="text-primary relative inline-block">
                  expertise
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                The all-in-one platform for creators to schedule, book, and conduct paid video consultations with zero friction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/auth">
                  <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                    Start Earning Today
                  </Button>
                </Link>
                <Link href="/creators/alex-rivera">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background hover:bg-muted/50">
                    View Demo Profile
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <p>Trusted by 1,000+ experts</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 aspect-[4/3] bg-muted">
                <img 
                  src={heroImage} 
                  alt="Consultant on call" 
                  className="w-full h-full object-cover"
                />
                {/* Floating UI Elements */}
                <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Video size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Strategy Session</p>
                        <p className="text-xs text-muted-foreground">Started 2 mins ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Live</Badge>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-lg border border-border shadow-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium font-mono">$150.00 Earned</span>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute -z-10 bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[100px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display mb-4">Everything you need to run your business</h2>
            <p className="text-muted-foreground text-lg">Focus on your clients, not the logistics. We handle the scheduling, payments, and video hosting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">Smart Scheduling</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Set your availability, buffer times, and holidays. Clients book slots that work for you, automatically synced to your timezone.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">Secure Payments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Payments are held in escrow until the session is complete. Get paid automatically via Stripe Connect.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                  <Video size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">Seamless Video</h3>
                <p className="text-muted-foreground leading-relaxed">
                  No downloads required. Clients join directly from their browser with a secure, unique link for every session.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Creator Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <img src={creatorImage} alt="Creator" className="w-full" />
              </div>
              <div className="absolute inset-0 bg-primary rounded-2xl rotate-[2deg] -z-10 opacity-10 scale-[1.02]" />
            </div>
            
            <div className="w-full md:w-1/2">
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Success Stories</Badge>
              <h2 className="text-4xl font-bold font-display mb-6">"SLVIDEO transformed how I consult."</h2>
              <p className="text-xl text-muted-foreground italic mb-8">
                "I used to spend hours emailing back and forth to find a time. Now, clients just book a slot, pay upfront, and we meet. My revenue doubled in the first month."
              </p>
              
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-bold text-lg">Alex Rivera</h4>
                  <p className="text-muted-foreground">Marketing Consultant</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <Link href="/creators/alex-rivera">
                  <Button variant="link" className="p-0 h-auto text-primary font-semibold">
                    View Profile <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={bgPattern} className="w-full h-full object-cover" alt="bg" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to share your knowledge?</h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
            Join thousands of experts earning on SLVIDEO. Set up your profile in less than 5 minutes.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-base font-bold shadow-xl">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
