
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Gift, 
  Sparkles, 
  TrendingUp, 
  Users, 
  DollarSign,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Zap
} from "lucide-react";

// Note: The <nav> and <footer> elements that were previously here have been removed.
// They will now be provided by the PublicLayout component wrapper.

export default function LandingPage() {
  return (
    <div className="min-h-screen feminine-gradient">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green] border-[--gimmie-green]/20 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Gift Recommendations
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-[--gimmie-dark] mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina]">
                Gifting Made Easy
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Gimmie AI helps your Shopify customers find perfect gifts through intelligent conversations. 
              Boost conversions, increase AOV, and make gift-giving effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white px-8 py-4 text-lg">
                <Gift className="w-5 h-5 mr-2" />
                Install Free on Shopify
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">15%</div>
              <div className="text-slate-600">Average Conversion Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">$47</div>
              <div className="text-slate-600">Higher Average Order Value</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">2.3x</div>
              <div className="text-slate-600">More Gift Purchases</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[--gimmie-green] mb-2">500+</div>
              <div className="text-slate-600">Happy Shopify Stores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[--gimmie-dark] mb-4">
              Why Customers Love Shopping with Gimmie
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transform the gift-buying experience with AI that understands what people actually want.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-[--gimmie-green]/10 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[--gimmie-green]" />
                </div>
                <CardTitle>Intelligent Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our AI asks the right questions to understand exactly who they're shopping for and what would make the perfect gift.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-[--gimmie-carolina]/10 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-[--gimmie-carolina]" />
                </div>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Every suggestion is tailored to the recipient's interests, budget, and the occasion - no more generic gift guides.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle>Budget-Friendly Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Set a budget and get amazing recommendations that won't break the bank. Great gifts at every price point.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481437156560-3205f6a85705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2151&q=80')"}}>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[--gimmie-dark] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple for customers, powerful for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[--gimmie-green] rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer Clicks Widget</h3>
              <p className="text-slate-600">
                A friendly "🎁 Need a Gift?" button appears on your store, inviting customers to get personalized help.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[--gimmie-carolina] rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Conversation</h3>
              <p className="text-slate-600">
                Gimmie asks smart questions about the recipient, occasion, and budget to understand exactly what they need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Perfect Recommendations</h3>
              <p className="text-slate-600">
                Customers get 3-5 curated product suggestions that match perfectly, leading to more sales and happy customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[--gimmie-dark] mb-4">
              Loved by Store Owners Worldwide
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">
                  "Gimmie AI increased our gift sales by 40% during the holiday season. Customers love how easy it is to find the perfect gift!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[--gimmie-green] rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-slate-500">Boutique Home Decor</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">
                  "Setup took 5 minutes. The AI recommendations are spot-on and our customers actually thank us for making gift shopping easier."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[--gimmie-carolina] rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold">Mike Rodriguez</div>
                    <div className="text-sm text-slate-500">Tech Gadgets Plus</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">
                  "The analytics dashboard shows exactly how much revenue Gimmie is generating. It's like having a personal shopping assistant for every customer."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold">Alex Kim</div>
                    <div className="text-sm text-slate-500">Handmade Jewelry Co</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Gift Sales?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Shopify stores using Gimmie AI to boost conversions and delight customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[--gimmie-green] hover:bg-slate-100 px-8 py-4 text-lg font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Link to={createPageUrl("CreatorPartner")}>
              <Button size="lg" variant="outline" className="border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 text-lg transition-colors">
                Become a Partner
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
