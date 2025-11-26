import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Clock, User, Phone, Copy, LogOut } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  clientMobile: string;
  clientEmail?: string;
  scheduledAt: string;
  duration: number;
  meetingLink: string;
  status: string;
  price: string;
}

export default function MeetingPage() {
  const [match, params] = useRoute("/meeting/:bookingId");
  const [_, setLocation] = useLocation();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!match || !params?.bookingId) return;

    // In production, fetch booking details from API
    // For now, using mock data
    const mockBooking: Booking = {
      id: params.bookingId,
      clientMobile: "+1 (555) 123-4567",
      clientEmail: "client@example.com",
      scheduledAt: new Date().toISOString(),
      duration: 60,
      meetingLink: `https://meet.google.com/${params.bookingId}`,
      status: "confirmed",
      price: "$300",
    };

    setBooking(mockBooking);
    setIsLoading(false);
  }, [match, params]);

  const handleJoinCall = () => {
    if (!booking) return;
    setHasJoined(true);
    // Open the meeting link in new tab
    window.open(booking.meetingLink, "_blank");
    toast({
      title: "Joining call...",
      description: "Opening your meeting link in a new tab",
    });
  };

  const handleCopyLink = () => {
    if (booking?.meetingLink) {
      navigator.clipboard.writeText(booking.meetingLink);
      toast({
        title: "Copied!",
        description: "Meeting link copied to clipboard",
      });
    }
  };

  const handleEndCall = () => {
    setHasJoined(false);
    toast({
      title: "Call ended",
      description: "Redirecting to dashboard...",
    });
    setTimeout(() => setLocation("/creator/dashboard"), 1500);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading call details...</p>
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Card>
            <CardContent className="pt-6">
              <p className="text-destructive mb-4">Booking not found</p>
              <Button onClick={() => setLocation("/creator/dashboard")}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Video size={24} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Video Consultation</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Booking ID: {booking.id}</p>
                  </div>
                </div>
                {hasJoined && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Active Call
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Client Info */}
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <h3 className="font-semibold mb-4 text-sm">Client Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Mobile</p>
                      <p className="font-medium">{booking.clientMobile}</p>
                    </div>
                  </div>
                  {booking.clientEmail && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium text-sm break-all">{booking.clientEmail}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Call Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <p className="font-semibold">{booking.duration} minutes</p>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="font-semibold text-lg text-primary">{booking.price}</p>
                </div>
              </div>

              {/* Meeting Link */}
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 border border-blue-200 dark:border-blue-900/50">
                <h3 className="font-semibold mb-3 text-sm">Meeting Link</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={booking.meetingLink}
                    readOnly
                    className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm font-mono"
                    data-testid="meeting-link-input"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    data-testid="button-copy-link"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Share this link with your client to join the meeting
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {!hasJoined ? (
                  <>
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80"
                      onClick={handleJoinCall}
                      data-testid="button-join-call"
                    >
                      <Video className="mr-2 h-5 w-5" />
                      Join Call Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setLocation("/creator/dashboard")}
                    >
                      Back to Dashboard
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1"
                      onClick={handleEndCall}
                      data-testid="button-end-call"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      End Call
                    </Button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900/50">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        Call Active
                      </span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Both you and the client need to join the meeting. The meeting link is secure and unique to this booking.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
