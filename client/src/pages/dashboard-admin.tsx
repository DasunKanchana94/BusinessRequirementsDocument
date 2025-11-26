import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  AlertCircle,
  MoreHorizontal,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] bg-muted/30">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-background hidden lg:block">
          <div className="p-6">
             <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Admin Panel</h2>
             <nav className="space-y-1">
               <Button variant="secondary" className="w-full justify-start font-medium">
                 <LayoutDashboard className="mr-2 h-4 w-4" /> Overview
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <Users className="mr-2 h-4 w-4" /> Creators
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <DollarSign className="mr-2 h-4 w-4" /> Transactions
               </Button>
               <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
                 <AlertCircle className="mr-2 h-4 w-4" /> Disputes
                 <Badge className="ml-auto bg-red-100 text-red-600 hover:bg-red-100 border-none h-5 px-1.5">2</Badge>
               </Button>
             </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-display tracking-tight">Admin Overview</h1>
            <Button>Download Report</Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Gross Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124,592.00</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 font-medium flex items-center mr-1">
                    <TrendingUp size={12} className="mr-1"/> +18%
                  </span>
                  vs last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 font-medium flex items-center mr-1">
                    <TrendingUp size={12} className="mr-1"/> +12
                  </span>
                  new this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Fees (15%)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$18,688.80</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Net earnings
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
             <Card>
               <CardHeader>
                 <CardTitle>Recent Transactions</CardTitle>
                 <CardDescription>Monitoring payments and holds.</CardDescription>
               </CardHeader>
               <CardContent>
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>Transaction ID</TableHead>
                       <TableHead>Creator</TableHead>
                       <TableHead>Amount</TableHead>
                       <TableHead>Platform Fee</TableHead>
                       <TableHead>Status</TableHead>
                       <TableHead>Date</TableHead>
                       <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {[1,2,3,4,5].map((i) => (
                       <TableRow key={i}>
                         <TableCell className="font-mono text-xs">#TRX-{8392 + i}</TableCell>
                         <TableCell>Alex Rivera</TableCell>
                         <TableCell>${(150 * i).toFixed(2)}</TableCell>
                         <TableCell className="text-green-600">+${(150 * i * 0.15).toFixed(2)}</TableCell>
                         <TableCell>
                           <Badge variant={i === 1 ? "outline" : "secondary"} className={i === 1 ? "text-amber-600 bg-amber-50 border-amber-200" : "bg-green-100 text-green-700"}>
                             {i === 1 ? "Held (Escrow)" : "Released"}
                           </Badge>
                         </TableCell>
                         <TableCell className="text-muted-foreground">Nov {27 - i}, 2025</TableCell>
                         <TableCell className="text-right">
                           <Button variant="ghost" size="icon" className="h-8 w-8">
                             <MoreHorizontal size={16} />
                           </Button>
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </CardContent>
             </Card>
          </div>
        </main>
      </div>
    </Layout>
  );
}
