import React from "react";
import { 
  DollarSign,
  TrendingUp,
  Percent,
  MousePointer,
  ShoppingBag
} from "lucide-react";
import AnalyticsMetricCard from "./AnalyticsMetricCard";

const metricConfig = {
  gimmie_revenue: {
    title: "Total Gimmie Revenue",
    icon: DollarSign,
    tooltip: "Total revenue generated from customers who clicked through Gimmie recommendations."
  },
  gimmie_sales: {
    title: "Total Gimmie Sales", 
    icon: TrendingUp,
    tooltip: "Number of completed purchases from customers who used Gimmie recommendations."
  },
  conversion_rate: {
    title: "Conversion Rate",
    icon: Percent,
    tooltip: "Percentage of widget clicks that resulted in a purchase."
  },
  average_order_value: {
    title: "Average Order Value",
    icon: DollarSign,
    tooltip: "Average value of orders placed via Gimmie AI recommendations."
  },
  widget_clicks: {
    title: "Widget Clicks",
    icon: MousePointer,
    tooltip: "Total clicks on the gift recommendation widget."
  },
  revenue_per_click: {
    title: "Revenue per Click",
    icon: DollarSign,
    tooltip: "Average revenue generated per widget click."
  },
  products_sold: {
    title: "Products Sold via Gimmie",
    icon: ShoppingBag,
    tooltip: "Total number of individual products sold through Gimmie recommendations."
  }
};

const sampleChanges = {
  gimmie_revenue: "+18.7%",
  gimmie_sales: "+12.3%", 
  conversion_rate: "+2.1%",
  average_order_value: "-1.5%",
  widget_clicks: "+8.2%",
  revenue_per_click: "+6.8%",
  products_sold: "+15.2%"
};

export default function CustomizableMetrics({ 
  visibleMetrics, 
  gimmieRevenue,
  gimmieSales,
  conversionRate,
  aov,
  totalClicks,
  gimmieProducts
}) {
  const metricValues = {
    gimmie_revenue: `$${gimmieRevenue.toLocaleString()}`,
    gimmie_sales: gimmieSales.toLocaleString(),
    conversion_rate: `${conversionRate.toFixed(1)}%`,
    average_order_value: `$${aov.toFixed(2)}`,
    widget_clicks: totalClicks.toLocaleString(),
    revenue_per_click: `$${totalClicks > 0 ? (gimmieRevenue / totalClicks).toFixed(2) : '0.00'}`,
    products_sold: gimmieProducts.toLocaleString()
  };

  const visibleMetricsData = visibleMetrics.map(metricId => ({
    id: metricId,
    ...metricConfig[metricId],
    value: metricValues[metricId],
    change: sampleChanges[metricId]
  }));

  // Determine grid layout based on number of visible metrics
  const getGridClass = (count) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 md:grid-cols-2";
    if (count === 3) return "grid-cols-1 md:grid-cols-3";
    if (count <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    if (count <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  if (visibleMetrics.length === 0) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
        <p className="text-slate-500 mb-2">No metrics selected</p>
        <p className="text-sm text-slate-400">Use the "Customize Metrics" button to select which metrics to display</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClass(visibleMetrics.length)} gap-6`}>
      {visibleMetricsData.map((metric) => (
        <AnalyticsMetricCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          tooltip={metric.tooltip}
        />
      ))}
    </div>
  );
}