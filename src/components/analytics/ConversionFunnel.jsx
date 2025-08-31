import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointer, ShoppingCart, CheckCircle } from "lucide-react";

const funnelData = [
  {
    stage: "Widget Clicks",
    value: 1253,
    icon: MousePointer,
    color: "bg-blue-500"
  },
  {
    stage: "Products Viewed",
    value: 842,
    icon: ShoppingCart,
    color: "bg-purple-500"
  },
  {
    stage: "Purchases",
    value: 127,
    icon: CheckCircle,
    color: "bg-emerald-500"
  }
];

export default function ConversionFunnel() {
  const maxVal = funnelData[0].value;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {funnelData.map((item, index) => {
            const conversionRate = index > 0 
              ? (item.value / funnelData[index - 1].value * 100).toFixed(1)
              : null;
            
            return (
              <div key={item.stage}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.color.replace('bg-', 'text-')}`} />
                    <span className="text-sm font-medium text-slate-700">{item.stage}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4">
                  <div
                    className={`${item.color} h-4 rounded-full transition-all duration-500`}
                    style={{ width: `${(item.value / maxVal) * 100}%` }}
                  ></div>
                </div>
                {conversionRate && (
                  <div className="text-right text-xs text-slate-500 mt-1">
                    {conversionRate}% from previous step
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}