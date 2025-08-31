import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Eye, EyeOff } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const availableMetrics = [
  {
    id: "gimmie_revenue",
    title: "Total Gimmie Revenue",
    description: "Revenue from Gimmie recommendations"
  },
  {
    id: "gimmie_sales", 
    title: "Total Gimmie Sales",
    description: "Number of sales via Gimmie"
  },
  {
    id: "conversion_rate",
    title: "Conversion Rate",
    description: "Widget clicks to purchase rate"
  },
  {
    id: "average_order_value",
    title: "Average Order Value", 
    description: "Avg value per Gimmie order"
  },
  {
    id: "widget_clicks",
    title: "Widget Clicks",
    description: "Total widget interactions"
  },
  {
    id: "revenue_per_click",
    title: "Revenue per Click",
    description: "Efficiency metric per click"
  },
  {
    id: "products_sold",
    title: "Products Sold via Gimmie",
    description: "Individual products recommended"
  }
];

export default function MetricSelector({ visibleMetrics, onMetricToggle }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings className="w-4 h-4" />
          Customize Metrics ({visibleMetrics.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-600" />
            <h4 className="font-semibold text-slate-900">Select Metrics to Display</h4>
          </div>
          
          <div className="space-y-3">
            {availableMetrics.map((metric) => (
              <div key={metric.id} className="flex items-start space-x-3">
                <Checkbox
                  id={metric.id}
                  checked={visibleMetrics.includes(metric.id)}
                  onCheckedChange={(checked) => onMetricToggle(metric.id, checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label 
                    htmlFor={metric.id}
                    className="text-sm font-medium text-slate-900 cursor-pointer"
                  >
                    {metric.title}
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-3 border-t">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  // Select default metrics
                  const defaults = ['gimmie_revenue', 'gimmie_sales', 'conversion_rate'];
                  defaults.forEach(id => onMetricToggle(id, true));
                  availableMetrics.forEach(metric => {
                    if (!defaults.includes(metric.id)) {
                      onMetricToggle(metric.id, false);
                    }
                  });
                }}
                className="flex-1"
              >
                Reset to Defaults
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => {
                  // Show all metrics
                  availableMetrics.forEach(metric => onMetricToggle(metric.id, true));
                }}
                className="flex-1"
              >
                Show All
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}