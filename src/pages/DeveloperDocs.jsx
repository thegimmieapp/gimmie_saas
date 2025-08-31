
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Code, 
  Copy, 
  CheckCircle, 
  ExternalLink,
  Book,
  Zap,
  Settings,
  Webhook
} from "lucide-react";

export default function DeveloperDocsPage() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const installationCode = `<!-- Step 1: Add to theme.liquid before </head> -->
<script 
  src="https://cdn.gimmie.ai/widget.js" 
  data-shop="{{ shop.permanent_domain }}"
  defer>
</script>

<!-- Step 2: Optional - Custom styling -->
<style>
  .gimmie-widget-button {
    background: #385B65 !important;
    color: white !important;
  }
</style>`;

  const apiExample = `// Gimmie AI API Example
const gimmieAPI = {
  // Initialize widget with custom config
  init: function(config) {
    window.GimmieWidget.configure({
      position: 'bottom-right',
      primaryColor: '#385B65',
      buttonText: '🎁 Need a Gift?',
      ...config
    });
  },
  
  // Track custom events
  trackEvent: function(eventName, data) {
    window.GimmieWidget.track(eventName, data);
  },
  
  // Get recommendations programmatically
  getRecommendations: async function(query) {
    const response = await fetch('/api/gimmie/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    return response.json();
  }
};`;

  const webhookExample = `// Webhook endpoint for order tracking
app.post('/webhooks/gimmie/order-created', (req, res) => {
  const order = req.body;
  
  // Track conversion if Gimmie session exists
  if (order.note_attributes) {
    const gimmieSession = order.note_attributes
      .find(attr => attr.name === 'gimmie_session_id');
    
    if (gimmieSession) {
      // Report conversion to Gimmie AI
      fetch('https://api.gimmie.ai/conversions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: gimmieSession.value,
          order_id: order.id,
          order_value: order.total_price,
          products: order.line_items
        })
      });
    }
  }
  
  res.status(200).send('OK');
});`;

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
              <Link to={createPageUrl("Pricing")} className="text-slate-600 hover:text-[--gimmie-green]">
                Pricing
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
          <div className="w-16 h-16 bg-[--gimmie-green]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Book className="w-8 h-8 text-[--gimmie-green]" />
          </div>
          <h1 className="text-5xl font-bold text-[--gimmie-dark] mb-6">
            Developer Documentation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to integrate Gimmie AI into your Shopify store or custom application.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] text-white mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="w-6 h-6" />
              Quick Start - 5 Minutes Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div>
                <span>Install the Shopify app</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div>
                <span>Complete OAuth connection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div>
                <span>Widget goes live automatically!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Documentation */}
        <Tabs defaultValue="installation" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border">
            <TabsTrigger value="installation" className="gap-2">
              <Code className="w-4 h-4" />
              Installation
            </TabsTrigger>
            <TabsTrigger value="customization" className="gap-2">
              <Settings className="w-4 h-4" />
              Customization
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Zap className="w-4 h-4" />
              API Reference
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="gap-2">
              <Webhook className="w-4 h-4" />
              Webhooks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="installation" className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Installation Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800">Recommended</Badge>
                    Automatic Installation
                  </h3>
                  <p className="text-slate-600 mb-4">
                    The easiest way to get started. Install our Shopify app and we'll handle the rest.
                  </p>
                  <Button className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Install from Shopify App Store
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">Manual Installation</h3>
                  <p className="text-slate-600 mb-4">
                    For developers who want more control or are working with custom themes.
                  </p>
                  
                  <div className="bg-slate-900 text-slate-100 rounded-lg p-4 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(installationCode, 'install')}
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                    >
                      {copied === 'install' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <pre className="text-sm overflow-x-auto pr-12">
                      <code>{installationCode}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">🔧 Requirements</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Shopify store (any plan)</li>
                    <li>• Theme file editing access</li>
                    <li>• Basic HTML/JavaScript knowledge</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Widget Styling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Customize the appearance to match your brand using CSS variables or our dashboard.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Button colors and positioning</li>
                    <li>• Custom fonts and typography</li>
                    <li>• Animation and hover effects</li>
                    <li>• Mobile responsiveness</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Behavior Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Control when and how the widget appears to customers.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Page targeting rules</li>
                    <li>• Visitor behavior triggers</li>
                    <li>• A/B testing variants</li>
                    <li>• Custom messaging</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>JavaScript API</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-600">
                  Programmatically control the Gimmie widget and access recommendation data.
                </p>
                
                <div className="bg-slate-900 text-slate-100 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(apiExample, 'api')}
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                  >
                    {copied === 'api' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <pre className="text-sm overflow-x-auto pr-12">
                    <code>{apiExample}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Available Methods</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• <code>GimmieWidget.init()</code></li>
                      <li>• <code>GimmieWidget.show()</code></li>
                      <li>• <code>GimmieWidget.hide()</code></li>
                      <li>• <code>GimmieWidget.track()</code></li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Event Listeners</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• <code>widget:loaded</code></li>
                      <li>• <code>conversation:started</code></li>
                      <li>• <code>product:recommended</code></li>
                      <li>• <code>conversion:tracked</code></li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Webhook Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-600">
                  Track conversions and gather analytics by setting up webhooks for order events.
                </p>
                
                <div className="bg-slate-900 text-slate-100 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(webhookExample, 'webhook')}
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                  >
                    {copied === 'webhook' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <pre className="text-sm overflow-x-auto pr-12">
                    <code>{webhookExample}</code>
                  </pre>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-900 mb-2">⚡ Automatic Setup</h4>
                  <p className="text-amber-800 text-sm">
                    When you install the Shopify app, webhooks are configured automatically. 
                    Manual setup is only needed for custom implementations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Support Section */}
        <Card className="bg-gradient-to-r from-slate-50 to-slate-100 mt-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-600">
              Our developer support team is here to help with integration questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("PublicContact")}>
                <Button variant="outline" className="gap-2">
                  📧 Contact Support
                </Button>
              </Link>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Join Discord Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
