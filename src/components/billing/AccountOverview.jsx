import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Store,
  User,
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  HelpCircle
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AccountOverview({ 
  user, 
  store, 
  subscription, 
  totalCommissionOwed, 
  isLoading 
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Account Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Account Information
              </div>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your account details and membership information</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Full Name</label>
              <p className="text-slate-900 font-medium">{user?.full_name || "Loading..."}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Email Address</label>
              <p className="text-slate-900">{user?.email || "Loading..."}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Account Type</label>
              <Badge className="ml-2 bg-blue-100 text-blue-800 capitalize">
                {user?.role || "Admin"}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Member Since</label>
              <p className="text-slate-900">
                {user?.created_date ? format(new Date(user.created_date), "MMMM yyyy") : "January 2024"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Store Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-600" />
                Connected Store
              </div>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Details about your connected Shopify store</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Store Name</label>
              <p className="text-slate-900 font-medium">{store.store_name || "Sample Store"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Shopify Domain</label>
              <p className="text-slate-900 font-mono text-sm">{store.shop_domain || "sample-store.myshopify.com"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Connection Status</label>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <Badge className="bg-emerald-100 text-emerald-800">Connected</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Widget Status</label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 font-medium">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Summary */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-blue-900">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscription Summary
              </div>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-blue-600 cursor-help hover:text-blue-700" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your current subscription plan and billing details</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-blue-800">Current Plan</span>
              <Badge className="bg-blue-600 text-white capitalize">
                {subscription?.plan_name || "Professional"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-800">Monthly Cost</span>
              <span className="font-bold text-blue-900">
                ${subscription?.plan_price || 49}/month
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-800">Next Billing</span>
              <span className="font-medium text-blue-900">
                {subscription?.next_billing_date ? 
                  format(new Date(subscription.next_billing_date), "MMM d, yyyy") : 
                  "Jan 15, 2025"
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-800">Auto-Renewal</span>
              <Badge className={subscription?.auto_renew !== false ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}>
                {subscription?.auto_renew !== false ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Commission Status */}
        <Card className={totalCommissionOwed > 0 ? "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200" : "bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200"}>
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${totalCommissionOwed > 0 ? "text-amber-900" : "text-emerald-900"}`}>
              <div className="flex items-center gap-2">
                {totalCommissionOwed > 0 ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                Commission Status
              </div>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <HelpCircle className={`w-4 h-4 cursor-help ${totalCommissionOwed > 0 ? "text-amber-700 hover:text-amber-800" : "text-emerald-700 hover:text-emerald-800"}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Commission fees owed to Gimmie AI based on your sales</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${totalCommissionOwed > 0 ? "text-amber-900" : "text-emerald-900"}`}>
                ${totalCommissionOwed.toFixed(2)}
              </div>
              <p className={`text-sm ${totalCommissionOwed > 0 ? "text-amber-700" : "text-emerald-700"}`}>
                {totalCommissionOwed > 0 ? "Amount Due to Gimmie AI" : "All Caught Up!"}
              </p>
            </div>
            {totalCommissionOwed > 0 && (
              <div className="space-y-2">
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      Pay Commission Now
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pay your outstanding commission fees immediately</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Setup Auto-Payments
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Automatically pay commission fees each month</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}