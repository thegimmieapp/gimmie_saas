import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function CommissionTracking({ commissions, totalOwed, paymentMethods, onCommissionUpdate }) {
  const [isPaying, setIsPaying] = useState(false);
  
  const handlePayCommission = async () => {
    setIsPaying(true);
    alert(`Paid $${totalOwed.toFixed(2)} in commissions (simulated).`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onCommissionUpdate?.();
    setIsPaying(false);
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Commission Payments
          </CardTitle>
          {totalOwed > 0 && (
             <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Pay ${totalOwed.toFixed(2)} Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Commission Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>You are about to pay <strong>${totalOwed.toFixed(2)}</strong> for outstanding commissions.</p>
                  <Select defaultValue={paymentMethods.find(pm => pm.is_default)?.id}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map(pm => (
                        <SelectItem key={pm.id} value={pm.id}>
                          {pm.brand} ending in {pm.last_four}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button onClick={handlePayCommission} disabled={isPaying}>
                    {isPaying ? "Processing..." : "Confirm & Pay"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Gimmie Revenue</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell>{format(new Date(commission.month_year), "MMMM yyyy")}</TableCell>
                  <TableCell>${commission.total_revenue.toFixed(2)}</TableCell>
                  <TableCell>{commission.commission_rate}%</TableCell>
                  <TableCell>${commission.commission_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={
                      commission.status === "paid" ? "bg-emerald-100 text-emerald-800" :
                      commission.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                    }>{commission.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {commission.paid_date ? format(new Date(commission.paid_date), "MMM d, yyyy") : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autopayout Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">Autopayouts are not yet configured. Set them up to automatically pay your commission fees.</p>
          <Button variant="outline" className="mt-4">Setup Autopayouts</Button>
        </CardContent>
      </Card>
    </div>
  );
}