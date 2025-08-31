import React, { useState, useEffect } from "react";
import { User, Store, Subscription, PaymentMethod, Commission, Invoice } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard,
  User as UserIcon,
  Receipt,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Settings,
  LogOut,
  Edit3,
  Download,
  Plus
} from "lucide-react";
import { format } from "date-fns";

import AccountOverview from "../components/billing/AccountOverview";
import SubscriptionManagement from "../components/billing/SubscriptionManagement";
import PaymentMethods from "../components/billing/PaymentMethods";
import CommissionTracking from "../components/billing/CommissionTracking";
import InvoiceHistory from "../components/billing/InvoiceHistory";
import AccountSettings from "../components/billing/AccountSettings";
import CancellationFlow from "../components/billing/CancellationFlow";

export default function AccountBilling() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAccountData();
  }, []);

  const loadAccountData = async () => {
    setIsLoading(true);
    try {
      const userData = await User.me();
      const storeData = await Store.list();
      const subscriptionData = await Subscription.list();
      const paymentData = await PaymentMethod.list();
      const commissionData = await Commission.list("-created_date");
      const invoiceData = await Invoice.list("-created_date");
      
      setUser(userData);
      setStores(storeData);
      setSubscription(subscriptionData[0] || null);
      setPaymentMethods(paymentData);
      setCommissions(commissionData);
      setInvoices(invoiceData);
    } catch (error) {
      console.error("Error loading account data:", error);
    }
    setIsLoading(false);
  };

  const currentStore = stores[0] || {};
  const pendingCommissions = commissions.filter(c => c.status === "pending");
  const totalCommissionOwed = pendingCommissions.reduce((sum, c) => sum + c.commission_amount, 0);

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Account & Billing</h1>
            <p className="text-slate-600 text-lg">
              Manage your subscription, payments, and account settings
            </p>
          </div>
          {subscription?.status === "trialing" && (
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              {subscription.trial_ends_at ? 
                `Trial ends ${format(new Date(subscription.trial_ends_at), "MMM d, yyyy")}` : 
                "Free Trial Active"
              }
            </Badge>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900 capitalize">
                {subscription?.status || "Active"}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-600">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 capitalize">
                {subscription?.plan_name || "Professional"}
              </div>
              <p className="text-sm text-slate-500">
                ${subscription?.plan_price || 49}/month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-600">Next Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-slate-900">
                {subscription?.next_billing_date ? 
                  format(new Date(subscription.next_billing_date), "MMM d") : 
                  "Jan 15"
                }
              </div>
              <p className="text-sm text-slate-500">
                Auto-renew {subscription?.auto_renew !== false ? "ON" : "OFF"}
              </p>
            </CardContent>
          </Card>

          <Card className={totalCommissionOwed > 0 ? "bg-amber-50 border-amber-200" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Commission Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                ${totalCommissionOwed.toFixed(2)}
              </div>
              {totalCommissionOwed > 0 && (
                <p className="text-sm text-amber-600">Payment pending</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-slate-200">
            <TabsTrigger value="overview" className="gap-2">
              <UserIcon className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Plan
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <Receipt className="w-4 h-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="commissions" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Commissions
            </TabsTrigger>
            <TabsTrigger value="invoices" className="gap-2">
              <Receipt className="w-4 h-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">
              <AccountOverview 
                user={user}
                store={currentStore}
                subscription={subscription}
                totalCommissionOwed={totalCommissionOwed}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="subscription">
              <SubscriptionManagement 
                subscription={subscription}
                store={currentStore}
                onSubscriptionUpdate={loadAccountData}
              />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentMethods 
                paymentMethods={paymentMethods}
                onPaymentMethodUpdate={loadAccountData}
              />
            </TabsContent>

            <TabsContent value="commissions">
              <CommissionTracking 
                commissions={commissions}
                totalOwed={totalCommissionOwed}
                paymentMethods={paymentMethods}
                onCommissionUpdate={loadAccountData}
              />
            </TabsContent>

            <TabsContent value="invoices">
              <InvoiceHistory 
                invoices={invoices}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <AccountSettings 
                  user={user}
                  store={currentStore}
                  onAccountUpdate={loadAccountData}
                />
                <CancellationFlow 
                  subscription={subscription}
                  store={currentStore}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}