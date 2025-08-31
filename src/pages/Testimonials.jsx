import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingUp, Users, DollarSign } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    title: "E-commerce Manager",
    company: "Boutique Home Decor",
    image: "S",
    rating: 5,
    quote: "Gimmie AI increased our gift sales by 40% during the holiday season. Customers love how easy it is to find the perfect gift, and we love the additional revenue stream.",
    metrics: {
      salesIncrease: "40%",
      avgOrderValue: "+$32",
      conversionRate: "+15%"
    }
  },
  {
    name: "Mike Rodriguez", 
    title: "Founder",
    company: "Tech Gadgets Plus",
    image: "M",
    rating: 5,
    quote: "Setup took literally 5 minutes. The AI recommendations are spot-on and our customers actually thank us for making gift shopping easier. It's like having a personal shopping assistant for every visitor.",
    metrics: {
      salesIncrease: "55%",
      avgOrderValue: "+$28",
      conversionRate: "+22%"
    }
  },
  {
    name: "Alex Kim",
    title: "Owner",
    company: "Handmade Jewelry Co",
    image: "A",
    rating: 5,
    quote: "The analytics dashboard shows exactly how much revenue Gimmie is generating. It's been our best investment this year - the ROI is incredible and our customers are happier.",
    metrics: {
      salesIncrease: "65%",
      avgOrderValue: "+$45",
      conversionRate: "+18%"
    }
  },
  {
    name: "Jennifer Walsh",
    title: "Marketing Director", 
    company: "Organic Baby Products",
    image: "J",
    rating: 5,
    quote: "What I love most is how Gimmie helps customers discover products they might not have found otherwise. It's not just increasing sales - it's improving the customer experience.",
    metrics: {
      salesIncrease: "38%",
      avgOrderValue: "+$22", 
      conversionRate: "+12%"
    }
  },
  {
    name: "David Park",
    title: "CEO",
    company: "Outdoor Gear Store",
    image: "D",
    rating: 5,
    quote: "During Black Friday, Gimmie helped us serve 3x more customers without adding staff. The AI handled gift recommendations while our team focused on other tasks. Game changer.",
    metrics: {
      salesIncrease: "85%",
      avgOrderValue: "+$67",
      conversionRate: "+31%"
    }
  },
  {
    name: "Lisa Thompson",
    title: "Store Manager",
    company: "Artisan Crafts Collective",
    image: "L", 
    rating: 5,
    quote: "Small business owners wear many hats. Gimmie AI handles gift recommendations so I can focus on other aspects of the business. Plus, the commission structure is very reasonable.",
    metrics: {
      salesIncrease: "42%",
      avgOrderValue: "+$19",
      conversionRate: "+16%"
    }
  }
];

const stats = [
  {
    icon: TrendingUp,
    metric: "Average Sales Increase",
    value: "54%",
    description: "Across all stores using Gimmie AI"
  },
  {
    icon: DollarSign,
    metric: "Additional Monthly Revenue",
    value: "$3,200",
    description: "Average per store with active widget"
  },
  {
    icon: Users,
    metric: "Customer Satisfaction",
    value: "94%",
    description: "Rate Gimmie recommendations as helpful"
  }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[--gimmie-grey-sky] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green] border-[--gimmie-green]/20 mb-6">
            <Quote className="w-4 h-4 mr-2" />
            Customer Success Stories
          </Badge>
          <h1 className="text-5xl font-bold text-[--gimmie-dark] mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina]">500+</span> Shopify Stores
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how stores like yours are using Gimmie AI to boost sales, delight customers, and streamline gift recommendations.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200/60 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[--gimmie-green] to-[--gimmie-carolina] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[--gimmie-dark] mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-slate-700 mb-2">{stat.metric}</div>
                <div className="text-sm text-slate-500">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200/60 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-slate-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[--gimmie-green]">{testimonial.metrics.salesIncrease}</div>
                    <div className="text-xs text-slate-500">Sales Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[--gimmie-carolina]">{testimonial.metrics.avgOrderValue}</div>
                    <div className="text-xs text-slate-500">AOV Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-600">{testimonial.metrics.conversionRate}</div>
                    <div className="text-xs text-slate-500">Conversion</div>
                  </div>
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="w-10 h-10 bg-[--gimmie-green] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.title}</div>
                    <div className="text-sm font-medium text-[--gimmie-green]">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-16 bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] text-white border-0 shadow-xl">
          <CardContent className="text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Join These Success Stories?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial today and see how Gimmie AI can transform your store's gift sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-lg">
                ✨ 14-Day Free Trial
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-lg">
                🚀 5-Minute Setup  
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-lg">
                💰 No Setup Fees
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}