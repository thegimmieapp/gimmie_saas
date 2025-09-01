
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  CreditCard,
  CheckCircle,
  Star,
  Zap,
  Crown,
  Calendar,
  AlertTriangle,
  Gift
} from "lucide-react";
import { format } from "date-fns";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    icon: Gift,
    color: "green",
    features: [
      "Up to 50 widget interactions/month",
      "Basic AI recommendations",
      "Email support",
      "Standard analytics",
      "10% commission rate"
    ]
  },
  {
    id: "starter",
    name: "Starter", 
    price: 29.99,
    icon: Zap,
    color: "blue",
    features: [
      "Up to 250 widget interactions/month",
      "Advanced AI recommendations",
      "Priority email support",
      "Advanced analytics & insights",
      "Custom widget styling",
      "10% commission rate"
    ]
  },
  {
    id: "professional", 
    name: "Professional",
    price: 69.99,
    icon: Star,
    color: "emerald",
    popular: true,
    features: [
      "Up to 1,000 widget interactions/month",
      "Premium AI recommendations",
      "Priority support + phone",
      "Advanced analytics & insights", 
      "Custom widget styling",
      "A/B testing",
      "Up to 3 Shopify stores",
      "Reduced 7% commission rate"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    icon: Crown,
    color: "purple",
    isCustom: true,
    features: [
      "Unlimited widget interactions",
      "Premium AI recommendations",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
      "Advanced reporting API",
      "Unlimited Shopify stores",
      "Lowest 4% commission rate"
    ]
  }
];

export default function SubscriptionManagement({ subscription, store, onSubscriptionUpdate }) {
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [autoRenew, setAutoRenew] = useState(subscription?.auto_renew !== false);

  const currentPlan = plans.find(p => p.id === subscription?.plan_name) || plans[0]; // Default to free

  const handlePlanChange = async (planId) => {
    setIsChangingPlan(true);
    // In real app, this would call API to change subscription
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Plan changed to ${planId}!`);
    setIsChangingPlan(false);
    onSubscriptionUpdate?.();
  };

  const toggleAutoRenew = async () => {
    setAutoRenew(!autoRenew);
    // In real app, update subscription
    alert(`Auto-renewal ${!autoRenew ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Current Subscription */}
      <Card className="bg-gradient-to-r from-white to-slate-50 border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 capitalize flex items-center gap-2">
                <currentPlan.icon className="w-5 h-5 text-emerald-600" />
                {currentPlan.name} Plan
              </h3>
              <p className="text-slate-600">
                {currentPlan.price === 0 ? "Free Forever" : 
                 currentPlan.isCustom ? "Custom Pricing" : 
                 `$${currentPlan.price}/month`}
              </p>
            </div>
            <Badge className={`${subscription?.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {subscription?.status || "Active"}
            </Badge>
          </div>

          {currentPlan.price > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Next Billing Date</label>
                <p className="text-slate-900">
                  {subscription?.next_billing_date ? 
                    format(new Date(subscription.next_billing_date), "MMMM d, yyyy") : 
                    "January 15, 2025"
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Billing Cycle</label>
                <p className="text-slate-900">Monthly</p>
              </div>
            </div>
          )}

          {currentPlan.price > 0 && (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">Auto-Renewal</p>
                <p className="text-sm text-slate-600">Automatically renew subscription each month</p>
              </div>
              <Switch
                checked={autoRenew}
                onCheckedChange={toggleAutoRenew}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.popular ? 'ring-2 ring-emerald-500 shadow-lg scale-105' : ''} 
                ${currentPlan.id === plan.id ? 'bg-emerald-50 border-emerald-200' : 'bg-white'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-500 text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4
                  ${plan.color === 'green' ? 'bg-green-100' : ''}
                  ${plan.color === 'blue' ? 'bg-blue-100' : ''}
                  ${plan.color === 'emerald' ? 'bg-emerald-100' : ''}
                  ${plan.color === 'purple' ? 'bg-purple-100' : ''}
                `}>
                  <plan.icon className={`w-6 h-6 
                    ${plan.color === 'green' ? 'text-green-600' : ''}
                    ${plan.color === 'blue' ? 'text-blue-600' : ''}
                    ${plan.color === 'emerald' ? 'text-emerald-600' : ''}
                    ${plan.color === 'purple' ? 'text-purple-600' : ''}
                  `} />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-slate-900">
                  {plan.isCustom ? "Custom" : plan.price === 0 ? "Free" : `$${plan.price}`}
                  {!plan.isCustom && plan.price > 0 && <span className="text-base font-normal text-slate-600">/month</span>}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {currentPlan.id === plan.id ? (
                  <Badge className="w-full py-2 bg-emerald-100 text-emerald-800 justify-center">
                    Current Plan
                  </Badge>
                ) : (
                  <Button 
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => plan.isCustom ? alert("Contact sales for custom pricing") : handlePlanChange(plan.id)}
                    disabled={isChangingPlan}
                  >
                    {isChangingPlan ? "Processing..." : 
                     plan.isCustom ? "Contact Sales" : 
                     `Switch to ${plan.name}`}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">💡 Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Prorated Billing</p>
              <p className="text-sm text-blue-700">Plan changes are prorated and reflected on your next bill.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Commission Structure</p>
              <p className="text-sm text-blue-700">Commission rates are based on your current plan and apply to all Gimmie-generated sales.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
