import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Eye,
  Target,
  Clock,
  Zap,
  ArrowRight,
  MousePointer,
  ShoppingCart,
  Heart
} from "lucide-react";

const analyticsFeatures = [
  {
    icon: DollarSign,
    title: "Revenue Attribution",
    description: "Track exactly how much revenue Gimmie AI generates for your store",
    example: "$3,247 generated this month"
  },
  {
    icon: TrendingUp,
    title: "Conversion Metrics",
    description: "See conversion rates from widget interactions to purchases",
    example: "15.3% conversion rate"
  },
  {
    icon: Users,
    title: "Customer Insights",
    description: "Understand your gift-buying customers and their behaviors",
    example: "Gift buyers spend 40% more"
  },
  {
    icon: Target,
    title: "Product Performance",
    description: "Discover which products are recommended most and perform best",
    example: "Wireless headphones: Top performer"
  },
  {
    icon: Clock,
    title: "Time to Purchase",
    description: "Measure how quickly customers buy after seeing recommendations",
    example: "Average: 2.3 minutes to cart"
  },
  {
    icon: MousePointer,
    title: "Interaction Analytics",
    description: "Track widget clicks, engagement rates, and user journey",
    example: "156 widget clicks this week"
  }
];

const sampleMetrics = [
  {
    metric: "Revenue Generated",
    value: "$47,832",
    change: "+23.5%",
    changeType: "positive",
    icon: DollarSign,
    description: "Total revenue from Gimmie recommendations this month"
  },
  {
    metric: "Gift Sales",
    value: "234",
    change: "+18.2%", 
    changeType: "positive",
    icon: ShoppingCart,
    description: "Number of successful gift purchases via Gimmie"
  },
  {
    metric: "Widget Conversion",
    value: "15.3%",
    change: "+2.1%",
    changeType: "positive", 
    icon: Target,
    description: "Conversion rate from widget click to purchase"
  },
  {
    metric: "Avg Order Value",
    value: "$89.50",
    change: "+12.8%",
    changeType: "positive",
    icon: TrendingUp,
    description: "Average order value for Gimmie-generated sales"
  }
];

const useCases = [
  {
    title: "Holiday Performance Tracking",
    description: "Monitor your gift sales performance during peak seasons like Black Friday and Christmas",
    icon: Heart,
    stats: ["300% increase in gift sales", "60% higher AOV", "2.5x more repeat customers"]
  },
  {
    title: "Product Recommendation Optimization",  
    description: "Identify your best-performing products and optimize inventory for gift sales",
    icon: Eye,
    stats: ["Top 20% products drive 80% of gift revenue", "Seasonal trends identification", "Inventory optimization"]
  },
  {
    title: "Customer Behavior Analysis",
    description: "Understand gift-buying patterns and customer preferences to improve targeting",
    icon: Users,
    stats: ["Gift buyers more likely to return", "Higher lifetime value customers", "Cross-sell opportunities identified"]
  }
];

export default function AnalyticsLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[--gimmie-grey-sky] to-white">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green] border-[--gimmie-green]/20 mb-6">
            <BarChart3 className="w-4 h-4 mr-2" />
            Advanced Analytics
          </Badge>
          <h1 className="text-5xl font-bold text-[--gimmie-dark] mb-6">
            Measure Your 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina]"> AI Impact</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Get detailed insights into how Gimmie AI drives revenue, improves conversions, and enhances 
            customer experience with comprehensive analytics and reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white px-8 py-4 text-lg">
                <Eye className="w-5 h-5 mr-2" />
                View Live Demo
              </Button>
            </Link>
            <Link to={createPageUrl("Testimonials")}>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg">
                Success Stories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Metrics Dashboard */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Real-Time Performance Metrics
            </h2>
            <p className="text-xl text-slate-600">
              Track the metrics that matter most to your business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleMetrics.map((metric, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {metric.metric}
                  </CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-medium ${metric.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Features */}
      <section className="py-16 bg-gradient-to-b from-white to-[--gimmie-grey-sky]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Comprehensive Analytics Suite
            </h2>
            <p className="text-xl text-slate-600">
              Every metric you need to optimize your gift recommendation strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analyticsFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-[--gimmie-green]/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[--gimmie-green]" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-slate-700">Example:</p>
                    <p className="text-sm text-[--gimmie-green]">{feature.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Analytics in Action
            </h2>
            <p className="text-xl text-slate-600">
              See how successful merchants use Gimmie analytics to grow their business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-[--gimmie-carolina]/10 rounded-xl flex items-center justify-center mb-4">
                    <useCase.icon className="w-6 h-6 text-[--gimmie-carolina]" />
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">{useCase.description}</p>
                  <div className="space-y-3">
                    {useCase.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-slate-700">{stat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Preview */}
      <section className="py-16 bg-[--gimmie-grey-sky]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-6">
            Calculate Your Potential ROI
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Based on our average performance metrics across 500+ stores
          </p>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[--gimmie-green] mb-2">+54%</div>
                  <div className="text-slate-600">Average Gift Sales Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[--gimmie-carolina] mb-2">$3,200</div>
                  <div className="text-slate-600">Additional Monthly Revenue</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">15.3%</div>
                  <div className="text-slate-600">Widget Conversion Rate</div>
                </div>
              </div>
              <div className="mt-8">
                <Link to={createPageUrl("Pricing")}>
                  <Button size="lg" className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90">
                    Calculate Your ROI
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Tracking Your Success?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get detailed analytics and insights into your gift recommendation performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-white text-[--gimmie-green] hover:bg-slate-100 px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("B2BContact")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}