import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Gift } from "lucide-react";

export default function ReferralStats({ referralCode, creditBalance, totalEarnings, isLoading }) {

  const referralLink = `https://gimmie.ai/signup?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-36" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-emerald-600" />
          Your Referral Link
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2 bg-slate-100 p-3 rounded-lg">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-grow bg-transparent text-sm text-slate-700 focus:outline-none"
          />
          <Button size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-slate-600">Available Credit</p>
            <p className="text-2xl font-bold text-slate-900">${creditBalance.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Total Earnings</p>
            <p className="text-2xl font-bold text-emerald-600">${totalEarnings.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-xs text-center text-slate-500">
          Credits are automatically applied to your next subscription or commission invoice.
        </p>
      </CardContent>
    </Card>
  );
}