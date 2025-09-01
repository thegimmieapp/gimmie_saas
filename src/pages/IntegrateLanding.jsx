import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plug, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Code,
  MousePointer,
  Settings,
  Globe,
  Smartphone,
  Monitor,
  Clock
} from "lucide-react";

const integrationMethods = [
  {
    title: "Shopify App Store",
    description: "One-click installation directly from the Shopify App Store",
    time: "2 minutes",
    difficulty: "Beginner",
    icon: Plug,
    color: "emerald",
    steps: [
      "Visit Shopify App Store",
      "Click 'Install App'", 
      "Authorize permissions",
      "Widget automatically active"
    ]
  },
  {
    title: "WooCommerce Plugin",
    description: "WordPress plugin for WooCommerce stores",
    time: "5 minutes", 
    difficulty: "Beginner",
    icon: Globe,
    color: "blue",
    steps: [
      "Download plugin from WordPress.org",
      "Upload via WordPress admin",
      "Activate plugin",
      "Configure widget settings"
    ]
  },
  {
    title: "Manual Installation",
    description: "Custom integration for any e-commerce platform",
    time: "15 minutes",
    difficulty: "Intermediate", 
    icon: Code,
    color: "purple",
    steps: [
      "Copy provided JavaScript snippet",
      "Add to your website's header",
      "Configure API endpoints",
      "Test widget functionality"
    ]
  }
];

const features = [
  {
    icon: MousePointer,
    title: "Smart Widget Positioning",
    description: "Automatically places the gift finder button in optimal locations based on your theme"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Responsive design that works perfectly on all devices and screen sizes"
  },
  {
    icon: Monitor,
    title: "Theme Compatibility",
    description: "Works with any theme - automatically adapts to your store's design language"
  },
  {
    icon: Settings,
    title: "Customization Options", 
    description: "Full control over colors, positioning, text, and behavior to match your brand"
  }
];

export default function IntegrateLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[--gimmie-grey-sky] to-white">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green] border-[--gimmie-green]/20 mb-6">
            <Plug className="w-4 h-4 mr-2" />
            Easy Integration
          </Badge>
          <h1 className="text-5xl font-bold text-[--gimmie-dark] mb-6">
            Get Up and Running in 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina]"> Minutes</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Choose your platform and follow our simple setup guide. No technical expertise required - 
            most merchants are live within 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white px-8 py-4 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Integration
              </Button>
            </Link>
            <Link to={createPageUrl("DeveloperDocs")}>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg">
                <Code className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Integration Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Choose Your Integration Method
            </h2>
            <p className="text-xl text-slate-600">
              We support all major e-commerce platforms with optimized installation flows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {integrationMethods.map((method, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                    ${method.color === 'emerald' ? 'bg-emerald-100' : ''}
                    ${method.color === 'blue' ? 'bg-blue-100' : ''}  
                    ${method.color === 'purple' ? 'bg-purple-100' : ''}
                  `}>
                    <method.icon className={`w-8 h-8 
                      ${method.color === 'emerald' ? 'text-emerald-600' : ''}
                      ${method.color === 'blue' ? 'text-blue-600' : ''}
                      ${method.color === 'purple' ? 'text-purple-600' : ''}
                    `} />
                  </div>
                  <CardTitle className="text-xl mb-2">{method.title}</CardTitle>
                  <p className="text-slate-600 mb-4">{method.description}</p>
                  <div className="flex justify-center gap-4">
                    <Badge className={`
                      ${method.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' : ''}
                      ${method.color === 'blue' ? 'bg-blue-100 text-blue-800' : ''}
                      ${method.color === 'purple' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      <Clock className="w-3 h-3 mr-1" />
                      {method.time}
                    </Badge>
                    <Badge variant="outline">
                      {method.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Setup Steps:</h4>
                  <ol className="space-y-2">
                    {method.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium">
                          {stepIndex + 1}
                        </div>
                        <span className="text-slate-600 text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <Button className="w-full mt-6" variant="outline">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[--gimmie-grey-sky]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Built for Your Success
            </h2>
            <p className="text-xl text-slate-600">
              Our widget integrates seamlessly with your existing store design and workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-[--gimmie-green]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-[--gimmie-green]" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Trusted Integration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">500+</div>
              <div className="text-slate-600">Successful Integrations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">99.9%</div>
              <div className="text-slate-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">&lt; 5min</div>
              <div className="text-slate-600">Average Setup Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">24/7</div>
              <div className="text-slate-600">Technical Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Integrate Gimmie AI?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of stores that have successfully integrated our AI gift finder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-white text-[--gimmie-green] hover:bg-slate-100 px-8 py-4 text-lg">
                Start Free Integration
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