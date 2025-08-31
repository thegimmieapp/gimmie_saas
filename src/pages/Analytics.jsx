
import React, { useState, useEffect } from "react";
import { Conversion, Store } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download,
  Calendar as CalendarIcon,
  TrendingUp,
  DollarSign,
  MousePointer,
  Percent
} from "lucide-react";
import { useTutorial } from "../components/onboarding/TutorialProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import AnalyticsMetricCard from "../components/analytics/AnalyticsMetricCard";
import AnalyticsChart from "../components/analytics/AnalyticsChart";
import TopProductsTable from "../components/analytics/TopProductsTable";
import ConversionFunnel from "../components/analytics/ConversionFunnel";
import CategoryPerformance from "../components/analytics/CategoryPerformance";
import MetricSelector from "../components/analytics/MetricSelector";
import CustomizableMetrics from "../components/analytics/CustomizableMetrics";

export default function Analytics() {
  const [conversions, setConversions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30days");
  
  // Default visible metrics: total revenue, total sales, and conversion rate
  const [visibleMetrics, setVisibleMetrics] = useState([
    'gimmie_revenue', 
    'gimmie_sales', 
    'conversion_rate'
  ]);

  const { startTutorial } = useTutorial();

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  useEffect(() => {
    // Start analytics tutorial
    const tutorialSteps = [
      {
        title: "Performance Dashboard 📊",
        description: "Track your Gimmie AI success! These metrics show revenue and sales generated directly from gift recommendations.",
        targetSelector: "[data-tutorial='analytics-metrics']",
        position: "bottom"
      },
      {
        title: "Customize Your View",
        description: "Toggle metrics on/off and change time periods to focus on what matters most to your business.",
        targetSelector: "[data-tutorial='analytics-controls']",
        position: "bottom"
      },
      {
        title: "Revenue Trends",
        description: "This chart shows your Gimmie revenue over time. Look for upward trends as customers discover your widget!",
        targetSelector: "[data-tutorial='performance-chart']",
        position: "top"
      },
      {
        title: "Product Performance",
        description: "See which products are being recommended most and generating the highest revenue through gift suggestions.",
        targetSelector: "[data-tutorial='top-products']",
        position: "top"
      }
    ];
    
    setTimeout(() => {
      startTutorial(tutorialSteps, "analytics-intro");
    }, 500);
  }, [startTutorial]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    const conversionData = await Conversion.list("-created_date", 50);
    setConversions(conversionData);
    setIsLoading(false);
  };
  
  // Core B2B Metrics - Revenue and Sales directly from Gimmie
  const gimmieRevenue = conversions.reduce((sum, conv) => sum + (conv.order_value || 0), 0);
  const gimmieSales = conversions.length;
  const gimmieProducts = conversions.reduce((sum, conv) => sum + (conv.products?.length || 0), 0);
  
  // Additional metrics
  const totalClicks = 156 * (conversions.length / 2); // Sample calculation
  const conversionRate = totalClicks > 0 ? (conversions.length / totalClicks * 100) : 0;
  const aov = conversions.length > 0 ? gimmieRevenue / conversions.length : 0;
  
  // Calculate average time metrics
  const avgTimeToCart = conversions
    .filter(conv => conv.time_to_cart > 0)
    .reduce((sum, conv) => sum + conv.time_to_cart, 0) / 
    conversions.filter(conv => conv.time_to_cart > 0).length || 0;
    
  const avgTimeToCheckout = conversions
    .filter(conv => conv.time_to_checkout > 0)
    .reduce((sum, conv) => sum + conv.time_to_checkout, 0) / 
    conversions.filter(conv => conv.time_to_checkout > 0).length || 0;

  const exportData = () => {
    alert("Export functionality would download CSV data here");
  };

  const handleMetricToggle = (metricId, isVisible) => {
    if (isVisible) {
      // Add metricId if it's not already there
      setVisibleMetrics(prev => [...new Set([...prev, metricId])]);
    } else {
      // Remove metricId
      setVisibleMetrics(prev => prev.filter(id => id !== metricId));
    }
  };

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Performance</h1>
            <p className="text-slate-600 text-lg">
              Measure the impact of AI-powered gift recommendations
            </p>
          </div>
          <TooltipProvider>
            <div className="flex gap-3 items-center" data-tutorial="analytics-controls">
              <MetricSelector 
                visibleMetrics={visibleMetrics}
                onMetricToggle={handleMetricToggle}
              />
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="12months">Last 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change the time period for the analytics data.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="gap-2" onClick={exportData}>
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download the current analytics view as a CSV file.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        {/* Customizable Key Metrics Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">📊 Key Performance Metrics</h2>
            {/* Assuming there are 7 available metrics in total (3 original B2B + 4 original Supporting) */}
            <div className="text-sm text-slate-500">
              {visibleMetrics.length} of 7 metrics displayed
            </div>
          </div>
          <div data-tutorial="analytics-metrics">
            <CustomizableMetrics 
              visibleMetrics={visibleMetrics}
              gimmieRevenue={gimmieRevenue}
              gimmieSales={gimmieSales}
              conversionRate={conversionRate}
              aov={aov}
              totalClicks={totalClicks}
              gimmieProducts={gimmieProducts}
            />
          </div>
        </div>

        {/* B2B Performance Metrics - Timing */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🎯 B2B Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyticsMetricCard
              title="Avg Time to Cart"
              value={avgTimeToCart > 0 ? `${Math.round(avgTimeToCart)}s` : "N/A"}
              change="-8.3%"
              icon={MousePointer}
              tooltip="Average time from seeing recommendations to adding items to cart."
            />
            <AnalyticsMetricCard
              title="Avg Time to Checkout"
              value={avgTimeToCheckout > 0 ? `${Math.floor(avgTimeToCheckout / 60)}m ${Math.round(avgTimeToCheckout % 60)}s` : "N/A"}
              change="-12.1%"
              icon={TrendingUp}
              tooltip="Average time from seeing recommendations to completing purchase."
            />
          </div>
        </div>

        {/* Main Analytics Chart */}
        <div data-tutorial="performance-chart">
          <AnalyticsChart />
        </div>

        {/* Data Breakdown */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Top Products */}
          <div className="lg:col-span-2" data-tutorial="top-products">
            <TopProductsTable conversions={conversions} isLoading={isLoading} />
          </div>

          {/* Right Column - Funnel & Categories */}
          <div className="space-y-6">
            <ConversionFunnel />
            <CategoryPerformance />
          </div>
        </div>

      </div>
    </div>
  );
}
