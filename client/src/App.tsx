import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CreatorProfile from "@/pages/creator-profile";
import BookingPage from "@/pages/booking";
import CreatorDashboard from "@/pages/dashboard-creator";
import AdminDashboard from "@/pages/dashboard-admin";
import CreatorSettings from "@/pages/creator-settings";
import CreatorPayouts from "@/pages/creator-payouts";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/creators/:slug" component={CreatorProfile} />
      <Route path="/creators" component={Home} /> {/* Fallback/Demo */}
      <Route path="/booking/:creator/:packageId" component={BookingPage} />
      <Route path="/creator/dashboard" component={CreatorDashboard} />
      <Route path="/creator/settings" component={CreatorSettings} />
      <Route path="/creator/payouts" component={CreatorPayouts} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
