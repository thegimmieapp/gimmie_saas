import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function ReferralsTable({ referrals, isLoading }) {
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "credited":
        return <Badge className="bg-emerald-100 text-emerald-800">Credited</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const maskEmail = (email) => {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    return `${user.substring(0, 3)}***@${domain}`;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle>Your Referrals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Friend's Email</TableHead>
              <TableHead>Sign Up Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Reward</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : referrals.length > 0 ? (
              referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{maskEmail(referral.referred_email)}</TableCell>
                  <TableCell>{format(new Date(referral.created_date), "MMM d, yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(referral.status)}</TableCell>
                  <TableCell className="text-right font-semibold text-emerald-600">
                    {referral.status === "credited" ? `$${referral.credit_amount.toFixed(2)}` : "$0.00"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No referrals yet. Share your link to start earning!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}