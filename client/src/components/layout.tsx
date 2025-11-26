import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Video, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(auth === 'true');
    };
    
    checkAuth();
    // Add event listener for storage changes (in case login happens in another tab/component)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                  <Video size={24} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold font-display tracking-tight">SLVIDEO</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/creators">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                For Creators
              </span>
            </Link>
            <Link href="/admin/dashboard">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Admin Demo
              </span>
            </Link>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link href="/creator/dashboard">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button size="sm" className="font-semibold shadow-lg shadow-primary/20">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/creators" onClick={() => setIsOpen(false)}>
                    <span className="text-lg font-medium">For Creators</span>
                  </Link>
                  <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                    <span className="text-lg font-medium">Admin Demo</span>
                  </Link>
                  <div className="h-px bg-border my-2" />
                  {isLoggedIn ? (
                    <>
                      <Link href="/creator/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="secondary" className="w-full justify-start">Dashboard</Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-destructive border-destructive/20"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">Log in</Button>
                      </Link>
                      <Link href="/auth" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-start">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1 rounded text-primary-foreground">
                <Video size={16} strokeWidth={3} />
              </div>
              <span className="text-lg font-bold font-display">SLVIDEO</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The professional platform for creators to monetize their expertise through seamless video consultations.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">For Creators</li>
              <li className="hover:text-foreground cursor-pointer">Pricing</li>
              <li className="hover:text-foreground cursor-pointer">Features</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">About Us</li>
              <li className="hover:text-foreground cursor-pointer">Careers</li>
              <li className="hover:text-foreground cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">Privacy Policy</li>
              <li className="hover:text-foreground cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 SLVIDEO Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
