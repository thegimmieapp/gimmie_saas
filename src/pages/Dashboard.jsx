import React, { useState, useEffect } from "react";
import { Store, WidgetConfig, Conversion } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  MousePointer,
  Settings,
  BarChart3,
  Gift,
  ArrowRight,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import MetricCard from "../components/dashboard/MetricCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import FeedbackModal from "../components/feedback/FeedbackModal";
import { useTutorial } from "../components/onboarding/TutorialProvider";

export default function Dashboard() {
  const [stores, setStores] = useState([]);
  const [conversions, setConversions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { startTutorial } = useTutorial();

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    // Start dashboard tutorial after data loads with a longer delay
    if (!isLoading && stores.length >= 0) {
      const tutorialSteps = [
        {
          title: "Welcome to your Dashboard! 🎉",
          description: "This is your command center. Here you can see how your AI gift recommendations are performing.",
          targetSelector: "[data-tutorial='dashboard-header']",
          position: "bottom"
        },
        {
          title: "Key Performance Metrics",
          description: "These cards show your most important metrics - revenue generated, sales made, and conversion rates from Gimmie AI.",
          targetSelector: "[data-tutorial='metrics-grid']",
          position: "bottom"
        },
        {
          title: "Customize Your Widget",
          description: "Click here to change colors, text, and positioning of your gift recommendation widget.",
          targetSelector: "[data-tutorial='customize-button']",
          position: "left"
        },
        {
          title: "Widget Status Monitor",
          description: "Keep track of your widget's health and performance. Green means everything is working perfectly!",
          targetSelector: "[data-tutorial='widget-status']",
          position: "left"
        }
      ];
      
      // Use a longer timeout to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        startTutorial(tutorialSteps, "dashboard-intro");
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, stores.length, startTutorial]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const storeData = await Store.list();
      const conversionData = await Conversion.list("-created_date", 10);
      setStores(storeData);
      setConversions(conversionData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const currentStore = stores[0] || {};
  
  // B2B Key Metrics - Direct Gimmie Impact
  const gimmieRevenue = conversions.reduce((sum, conv) => sum + (conv.order_value || 0), 0);
  const gimmieSales = conversions.length;
  const monthlyClicks = currentStore.monthly_clicks || 156;
  const conversionRate = monthlyClicks > 0 ? (conversions.length / monthlyClicks * 100) : 0;

  return (
    <div className="p-6 lg:p-8 bg-[--gimmie-grey-sky] min-h-screen">
      <FeedbackModal />
      <TooltipProvider>
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6" data-tutorial="dashboard-header">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-slate-600 text-lg">
                Here's how your gift recommendation engine is performing
              </p>
            </div>
            <div className="flex gap-3">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link to={createPageUrl("Analytics")}>
                    <Button variant="outline" className="gap-2">
                      <BarChart3 className="w-4 h-4" />
                      View Analytics
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dive deep into your performance data and trends.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link to={createPageUrl("WidgetSettings")}>
                    <Button className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white gap-2" data-tutorial="customize-button">
                      <Settings className="w-4 h-4" />
                      Customize Widget
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change the look and feel of your gift finder widget.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Metrics Grid - Updated with B2B focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-tutorial="metrics-grid">
            <MetricCard
              title="Gimmie Revenue"
              value={`$${gimmieRevenue.toLocaleString()}`}
              change="+18.7%"
              changeType="positive"
              icon={DollarSign}
              color="emerald"
              tooltipText="Total revenue generated from orders that used the Gimmie gift finder."
            />
            <MetricCard
              title="Gimmie Sales"
              value={gimmieSales.toLocaleString()}
              change="+12.3%"
              changeType="positive"
              icon={TrendingUp}
              color="blue"
              tooltipText="Total number of sales completed through the Gimmie gift finder."
            />
            <MetricCard
              title="Widget Clicks"
              value={monthlyClicks.toLocaleString()}
              change="+8.2%"
              changeType="positive"
              icon={MousePointer}
              color="purple"
              tooltipText="How many times customers have clicked on your gift finder widget."
            />
            <MetricCard
              title="Conversion Rate"
              value={`${conversionRate.toFixed(1)}%`}
              change="+2.1%"
              changeType="positive"
              icon={Users}
              color="orange"
              tooltipText="The percentage of customers who made a purchase after clicking the widget."
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <PerformanceChart />
              <RecentActivity conversions={conversions} isLoading={isLoading} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <QuickActions />
              
              {/* Store Status Card */}
              <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200/60 shadow-lg" data-tutorial="widget-status">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Gift className="w-5 h-5 text-emerald-600" />
                    Store Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div>
                      <p className="font-medium text-emerald-900">Widget Status</p>
                      <p className="text-sm text-emerald-600">Active & Running</p>
                    </div>
                    <Badge className="bg-emerald-500 text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Script Injection</span>
                      <span className="text-emerald-600 font-medium">✓ Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Webhook Tracking</span>
                      <span className="text-emerald-600 font-medium">✓ Connected</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Theme Integration</span>
                      <span className="text-emerald-600 font-medium">✓ Embedded</span>
                    </div>
                  </div>

                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link to={createPageUrl("Setup")}>
                        <Button variant="outline" className="w-full mt-4 group">
                          Manage Integration
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View detailed setup and troubleshooting options.</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Performance Insights - Updated */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200/60">
                <CardHeader>
                  <CardTitle className="text-blue-900">🎯 Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <div className="p-3 bg-white/60 rounded-lg cursor-help">
                        <p className="text-sm text-blue-800 mb-1">Revenue per click</p>
                        <p className="font-semibold text-blue-900">
                          ${monthlyClicks > 0 ? (gimmieRevenue / monthlyClicks).toFixed(2) : '0.00'}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average revenue generated per widget click</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <div className="p-3 bg-white/60 rounded-lg cursor-help">
                        <p className="text-sm text-blue-800 mb-1">Best performing category</p>
                        <p className="font-semibold text-blue-900">Electronics & Gadgets</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Product category with highest conversion rate</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <div className="p-3 bg-white/60 rounded-lg cursor-help">
                        <p className="text-sm text-blue-800 mb-1">Average order value</p>
                        <p className="font-semibold text-blue-900">
                          ${gimmieSales > 0 ? (gimmieRevenue / gimmieSales).toFixed(2) : '0.00'}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average value of orders that used Gimmie recommendations</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}