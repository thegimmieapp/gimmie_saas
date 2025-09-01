import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Check, 
  Zap, 
  Star, 
  ArrowRight,
  MessageCircle,
  Shield,
  TrendingUp,
  Users
} from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with AI gift recommendations",
    features: [
      "Up to 50 widget interactions/month",
      "Basic AI gift recommendations", 
      "Standard widget customization",
      "Email support",
      "10% commission on sales"
    ],
    cta: "Start Free",
    ctaVariant: "outline",
    popular: false,
    interactions: "50"
  },
  {
    name: "Starter", 
    price: "$29.99",
    period: "per month",
    description: "Ideal for small to medium stores ready to boost gift sales",
    features: [
      "Up to 250 widget interactions/month",
      "Advanced AI recommendations",
      "Full widget customization", 
      "Priority email support",
      "Detailed analytics dashboard",
      "10% commission on sales"
    ],
    cta: "Start Trial",
    ctaVariant: "default",
    popular: false,
    interactions: "250"
  },
  {
    name: "Professional",
    price: "$69.99", 
    period: "per month",
    description: "For growing stores that need advanced features and better margins",
    features: [
      "Up to 1,000 widget interactions/month",
      "Premium AI recommendations",
      "Advanced analytics & reporting",
      "Custom integration support",
      "Phone & chat support",
      "7% commission on sales"
    ],
    cta: "Start Trial",
    ctaVariant: "default",
    popular: true,
    interactions: "1,000"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For high-volume stores requiring enterprise-level features",
    features: [
      "Unlimited widget interactions",
      "Custom AI model training",
      "White-label options",
      "Dedicated account manager", 
      "24/7 phone support",
      "4% commission on sales"
    ],
    cta: "Contact Sales",
    ctaVariant: "outline",
    popular: false,
    interactions: "Unlimited"
  }
];

const features = [
  {
    icon: Zap,
    title: "Performance-Based Pricing",
    description: "Only pay for actual widget interactions. No hidden fees or surprise charges."
  },
  {
    icon: TrendingUp,
    title: "Lower Commission at Scale", 
    description: "As you grow, our commission rates decrease - aligning our success with yours."
  },
  {
    icon: Shield,
    title: "Risk-Free Trial",
    description: "All paid plans include a 14-day free trial. Cancel anytime, no questions asked."
  },
  {
    icon: Users,
    title: "No Setup Fees",
    description: "Get started immediately with zero setup costs or implementation fees."
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[--gimmie-grey-sky] to-white">
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green] border-[--gimmie-green]/20 mb-6">
            <Star className="w-4 h-4 mr-2" />
            Transparent Pricing
          </Badge>
          <h1 className="text-5xl font-bold text-[--gimmie-dark] mb-6">
            Pricing That
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina]"> Grows With You</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Start free and scale up as your gift sales grow. Our commission rates decrease as you process more orders, ensuring our success is aligned with yours.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all ${
                plan.popular ? 'ring-2 ring-[--gimmie-green] scale-105' : ''
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[--gimmie-green] text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-slate-500 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{plan.description}</p>
                  
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700">
                      {plan.interactions} interactions/month
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.name === "Enterprise" ? (
                    <Link to={createPageUrl("B2BContact")}>
                      <Button 
                        className={`w-full ${plan.ctaVariant === 'outline' ? '' : 'bg-[--gimmie-green] hover:bg-[--gimmie-green]/90'}`}
                        variant={plan.ctaVariant}
                      >
                        {plan.cta}
                        <MessageCircle className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to={createPageUrl("Dashboard")}>
                      <Button 
                        className={`w-full ${plan.ctaVariant === 'outline' ? '' : 'bg-[--gimmie-green] hover:bg-[--gimmie-green]/90'}`}
                        variant={plan.ctaVariant}
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Why Choose Our Pricing Model?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We believe in transparent, performance-based pricing that aligns our success with your business growth.
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

      {/* FAQ Section */}
      <section className="py-16 bg-[--gimmie-grey-sky]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What counts as a widget interaction?</h3>
                <p className="text-slate-600">An interaction occurs when a customer clicks your gift finder widget and receives AI recommendations. Browse actions and simple page views don't count.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How does the commission work?</h3>
                <p className="text-slate-600">We only charge commission on sales that are directly attributed to Gimmie AI recommendations. The commission rate decreases as you upgrade to higher tiers.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-slate-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-slate-600">No setup fees, ever. We believe in transparent pricing with no hidden costs or surprise charges.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Boost Your Gift Sales?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start with our free plan and scale up as your business grows. No risk, no commitments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-white text-[--gimmie-green] hover:bg-slate-100 px-8 py-4 text-lg">
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("B2BContact")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Talk to Sales
                <MessageCircle className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}