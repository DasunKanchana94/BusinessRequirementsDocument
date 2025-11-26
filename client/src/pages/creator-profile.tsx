import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Globe, Video, Calendar as CalendarIcon } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CreatorProfile() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, params] = useRoute("/creators/:slug");

  // Mock Data
  const creator = {
    name: "Alex Rivera",
    role: "Digital Marketing Strategist",
    bio: "Helping SaaS founders scale from $0 to $1M ARR through organic growth strategies and content marketing. Former VP of Marketing at TechFlow.",
    image: "https://i.pravatar.cc/150?img=11",
    website: "alexrivera.marketing",
    rating: 4.9,
    reviews: 128,
    packages: [
      {
        id: 1,
        title: "Marketing Audit",
        duration: 30,
        price: 150,
        description: "A quick 30-minute review of your current marketing channels and immediate improvement suggestions.",
        popular: false
      },
      {
        id: 2,
        title: "Growth Strategy Deep Dive",
        duration: 60,
        price: 300,
        description: "Comprehensive 1-hour session to build your quarterly growth roadmap. Includes recording.",
        popular: true
      },
      {
        id: 3,
        title: "Monthly Retainer Call",
        duration: 45,
        price: 200,
        description: "Ongoing support for existing clients. Review metrics and adjust strategy.",
        popular: false
      }
    ]
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen pb-20">
        {/* Profile Header */}
        <div className="bg-background border-b border-border">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-8 gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl border-4 border-background bg-background overflow-hidden shadow-xl">
                  <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-background rounded-full" title="Available for booking"></div>
              </div>
              
              <div className="flex-1 pt-4 md:pt-0">
                <h1 className="text-3xl font-bold font-display flex items-center gap-2">
                  {creator.name} 
                  <Badge variant="secondary" className="rounded-full text-xs px-2 bg-blue-50 text-blue-700 border-blue-100">Verified</Badge>
                </h1>
                <p className="text-lg text-muted-foreground mb-2">{creator.role}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="font-medium text-foreground">{creator.rating}</span>
                    <span>({creator.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                    <Globe size={16} />
                    <span>{creator.website}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                 <Button variant="outline">Share Profile</Button>
                 <Button>Contact Me</Button>
              </div>
            </div>
            
            <div className="max-w-3xl mb-8">
              <h3 className="font-bold mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{creator.bio}</p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Packages List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold font-display mb-4">Select a Session</h2>
              
              {creator.packages.map((pkg) => (
                <Card key={pkg.id} className={`transition-all hover:border-primary/50 hover:shadow-md group ${pkg.popular ? 'border-primary ring-1 ring-primary/10' : ''}`}>
                  <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{pkg.title}</h3>
                        {pkg.popular && (
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-none">Most Popular</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{pkg.description}</p>
                      <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-md">
                          <Clock size={14} />
                          <span>{pkg.duration} mins</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-md">
                          <Video size={14} />
                          <span>Google Meet</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 min-w-[140px] border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                      <div className="text-left md:text-right">
                        <span className="text-2xl font-bold font-display block">${pkg.price}</span>
                        <span className="text-xs text-muted-foreground">USD / session</span>
                      </div>
                      <Link href={`/booking/${creator.name.toLowerCase().replace(' ', '-')}/${pkg.id}`}>
                        <Button className="w-full md:w-auto font-semibold shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-all">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Availability Preview */}
            <div>
              <Card className="sticky top-24">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Availability Preview</CardTitle>
                  <CardDescription>Select a package to see specific slots</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-none w-full flex justify-center"
                    classNames={{
                      head_row: "flex w-full justify-between",
                      row: "flex w-full mt-2 justify-between",
                      cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    }}
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Timezone</span>
                      <span className="font-medium">America/New_York</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 py-3 border-t border-border">
                   <p className="text-xs text-muted-foreground text-center w-full">
                     <CalendarIcon className="inline w-3 h-3 mr-1" />
                     Next available: Tomorrow, 10:00 AM
                   </p>
                </CardFooter>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
