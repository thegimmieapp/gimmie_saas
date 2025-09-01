
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star,
  CheckCircle,
  Gift,
  Handshake,
  Target,
  Trophy
} from "lucide-react";

export default function CreatorPartnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    platform: "",
    followers: "",
    experience: "",
    why_partner: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Partnership application submitted! We'll review and get back to you within 3-5 business days.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[--gimmie-grey-sky] to-white">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("Landing")}>
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e27855254_green.png" alt="Gimmie Logo" className="h-10" />
            </Link>
            <div className="flex items-center space-x-6">
              <Link to={createPageUrl("Landing")} className="text-slate-600 hover:text-[--gimmie-green]">
                Back to Home
              </Link>
              <Button className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white">
                Install App
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green] border-[--gimmie-green]/20 mb-6">
            <Handshake className="w-4 h-4 mr-2" />
            Creator Partner Program
          </Badge>
          <h1 className="text-5xl font-bold text-[--gimmie-dark] mb-6">
            Earn with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina]">
              {" "}Gimmie AI
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive partner program and earn up to 30% commission by promoting the #1 AI gift recommendation tool for Shopify stores.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[--gimmie-dark] mb-12">
            Why Partner with Gimmie AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle>High Commission Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-600 mb-2">Up to 50%</p>
                <p className="text-slate-600">
                  Earn recurring commissions on every referral. Higher rates for top performers and volume.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[--gimmie-carolina]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[--gimmie-carolina]" />
                </div>
                <CardTitle>Growing Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[--gimmie-carolina] mb-2">500K+</p>
                <p className="text-slate-600">
                  Shopify stores need AI solutions. Tap into this rapidly growing market.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle>Marketing Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-600 mb-2">Full Kit</p>
                <p className="text-slate-600">
                  Get access to banners, videos, copy templates, and conversion-tested materials.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Commission Tiers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[--gimmie-dark] mb-12">
            Commission Structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 border-[--gimmie-green] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[--gimmie-green] text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-[--gimmie-green]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-[--gimmie-green]" />
                </div>
                <CardTitle>Creator Partner</CardTitle>
                <p className="text-slate-600">2+ posts/month + 25K+ followers</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-[--gimmie-green] mb-4">30%</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Monthly payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Premium marketing kit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Performance tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle>Volume Partner</CardTitle>
                <p className="text-slate-600">5+ posts/month + 100+ downloads</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-4">50%</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Weekly payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Custom marketing materials
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Volume bonuses
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Application Form */}
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[--gimmie-dark] mb-4">
                Apply to Become a Partner
              </h2>
              <p className="text-xl text-slate-600">
                Ready to start earning? Fill out the application below and we'll get back to you within 3-5 business days.
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[--gimmie-green]" />
                  Partnership Application
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="platform">Primary Platform/Channel *</Label>
                      <Input 
                        id="platform"
                        placeholder="YouTube, TikTok, Blog, Email List, etc."
                        value={formData.platform}
                        onChange={(e) => handleInputChange('platform', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="followers">Audience Size *</Label>
                      <Input 
                        id="followers"
                        placeholder="10K subscribers, 5K email list, etc."
                        value={formData.followers}
                        onChange={(e) => handleInputChange('followers', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Marketing Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Tell us about your experience with affiliate marketing, content creation, or promoting software products..."
                      className="h-24"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="why_partner">Why do you want to partner with Gimmie AI?</Label>
                    <Textarea
                      id="why_partner"
                      placeholder="What excites you about our product and partnership opportunity?"
                      className="h-24"
                      value={formData.why_partner}
                      onChange={(e) => handleInputChange('why_partner', e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">📋 Application Requirements</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Active audience of 1,000+ followers/subscribers</li>
                      <li>• Content focused on ecommerce, marketing, or entrepreneurship</li>
                      <li>• Genuine interest in promoting quality software products</li>
                      <li>• Professional communication and marketing approach</li>
                    </ul>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 w-full md:w-auto text-lg px-8 py-4"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[--gimmie-dark] mb-12">
            Partner Program FAQ
          </h2>
          <div className="max-w-4xl mx-auto grid gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">What are the requirements?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Minimum 25,000 followers on your primary platform, active content creation (2+ posts per month), 
                  and an audience interested in ecommerce, marketing, or business tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">How much can I earn?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Top partners earn $5,000-$25,000+ per month. With our Professional plan at $49/month and 30-50% commission, 
                  consistent promotion can generate significant recurring revenue.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">How do downloads affect my commission?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Partners who drive 100+ app downloads per month qualify for our 50% Volume Partner tier, 
                  which includes weekly payments and additional bonuses.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
