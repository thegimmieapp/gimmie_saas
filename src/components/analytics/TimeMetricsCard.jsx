import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Zap, ShoppingCart } from "lucide-react";

export default function TimeMetricsCard({ conversions }) {
  const validCartTimes = conversions.filter(conv => conv.time_to_cart > 0);
  const validCheckoutTimes = conversions.filter(conv => conv.time_to_checkout > 0);
  
  const avgTimeToCart = validCartTimes.length > 0 
    ? validCartTimes.reduce((sum, conv) => sum + conv.time_to_cart, 0) / validCartTimes.length 
    : 0;
    
  const avgTimeToCheckout = validCheckoutTimes.length > 0 
    ? validCheckoutTimes.reduce((sum, conv) => sum + conv.time_to_checkout, 0) / validCheckoutTimes.length 
    : 0;

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Clock className="w-5 h-5" />
          Customer Journey Timing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Time to Cart */}
        <div className="bg-white/60 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Average Time to Cart</h4>
              <p className="text-sm text-slate-600">From recommendation to add-to-cart</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {avgTimeToCart > 0 ? formatTime(avgTimeToCart) : "No data yet"}
          </div>
          {avgTimeToCart > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((60 - avgTimeToCart) / 60 * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">vs 60s benchmark</span>
            </div>
          )}
        </div>

        {/* Time to Checkout */}
        <div className="bg-white/60 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Average Time to Checkout</h4>
              <p className="text-sm text-slate-600">From recommendation to purchase</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {avgTimeToCheckout > 0 ? formatTime(avgTimeToCheckout) : "No data yet"}
          </div>
          {avgTimeToCheckout > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((600 - avgTimeToCheckout) / 600 * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">vs 10m benchmark</span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-white/40 rounded-lg">
            <div className="text-lg font-bold text-blue-900">{validCartTimes.length}</div>
            <div className="text-xs text-blue-700">Cart Events Tracked</div>
          </div>
          <div className="text-center p-3 bg-white/40 rounded-lg">
            <div className="text-lg font-bold text-blue-900">{validCheckoutTimes.length}</div>
            <div className="text-xs text-blue-700">Checkout Events Tracked</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}