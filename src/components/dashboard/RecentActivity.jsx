import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Activity, DollarSign, ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentActivity({ conversions, isLoading }) {
  const sampleActivity = conversions.length > 0 ? conversions : [
    {
      id: "1",
      order_value: 89.99,
      conversion_type: "widget_click",
      customer_email: "customer1@example.com",
      created_date: new Date().toISOString(),
      products: [{ title: "Wireless Headphones", price: 89.99 }]
    },
    {
      id: "2", 
      order_value: 156.50,
      conversion_type: "direct_recommendation",
      customer_email: "customer2@example.com",
      created_date: new Date(Date.now() - 86400000).toISOString(),
      products: [{ title: "Smart Watch", price: 156.50 }]
    }
  ];

  const getConversionBadgeColor = (type) => {
    switch (type) {
      case "widget_click": return "bg-emerald-100 text-emerald-800";
      case "direct_recommendation": return "bg-blue-100 text-blue-800";
      case "search_result": return "bg-purple-100 text-purple-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-slate-600" />
          Recent Conversions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sampleActivity.slice(0, 5).map((conversion) => (
              <div 
                key={conversion.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-emerald-100">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {conversion.products?.[0]?.title || "Product Purchase"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {format(new Date(conversion.created_date), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getConversionBadgeColor(conversion.conversion_type)}>
                    {conversion.conversion_type?.replace("_", " ")}
                  </Badge>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      ${conversion.order_value?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {sampleActivity.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No conversions yet</p>
                <p className="text-sm">Conversions will appear here once customers start using your widget</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}