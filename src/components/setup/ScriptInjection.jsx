import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code,
  Copy,
  CheckCircle,
  ExternalLink,
  AlertTriangle,
  Zap
} from "lucide-react";

export default function ScriptInjection({ status, shopDomain }) {
  const [copied, setCopied] = useState(false);

  const scriptCode = `<!-- Gimmie AI Widget Script -->
<script 
  src="https://cdn.gimmie.ai/widget.js" 
  data-shop="${shopDomain}"
  defer>
</script>`;

  const themeCode = `<!-- Add to theme.liquid before </head> -->
{{ 'gimmie-widget.js' | asset_url | script_tag }}

<!-- Or use app blocks in sections -->
{% render 'gimmie-widget' %}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const testWidget = () => {
    if (shopDomain) {
      window.open(`https://${shopDomain}`, "_blank");
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5 text-purple-600" />
          Widget Script Injection
          <Badge 
            className={
              status === "connected" 
                ? "bg-emerald-100 text-emerald-800" 
                : "bg-amber-100 text-amber-800"
            }
          >
            {status === "connected" ? "Active" : "Pending"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Status Overview */}
        <div className={`p-4 rounded-lg border ${
          status === "connected" 
            ? "bg-emerald-50 border-emerald-200" 
            : "bg-amber-50 border-amber-200"
        }`}>
          <div className="flex items-center gap-3">
            {status === "connected" ? (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            )}
            <div>
              <h4 className={`font-semibold ${
                status === "connected" ? "text-emerald-900" : "text-amber-900"
              }`}>
                {status === "connected" ? "Widget Successfully Installed!" : "Widget Installation Pending"}
              </h4>
              <p className={`text-sm ${
                status === "connected" ? "text-emerald-700" : "text-amber-700"
              }`}>
                {status === "connected" 
                  ? "Your gift recommendation widget is live and ready to help customers."
                  : "Complete the OAuth connection to automatically inject the widget script."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Installation Methods */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Installation Methods</h3>
          
          <Tabs defaultValue="automatic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="automatic" className="gap-2">
                <Zap className="w-4 h-4" />
                Automatic
              </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2">
                <Code className="w-4 h-4" />
                Manual
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="automatic" className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">🚀 Recommended: Automatic Installation</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Our app automatically injects the widget script into your theme after you complete the OAuth connection. 
                  This is the easiest and most reliable method.
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={status === "connected"}
                  >
                    {status === "connected" ? "Already Connected" : "Complete OAuth Setup"}
                  </Button>
                  {status === "connected" && (
                    <Button variant="outline" size="sm" onClick={testWidget}>
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Test Widget
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Script Tag Method</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(scriptCode)}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto">
                    <code>{scriptCode}</code>
                  </pre>
                  <p className="text-xs text-slate-600 mt-2">
                    Add this script to your theme.liquid file before the closing &lt;/head&gt; tag.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">Theme Integration</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(themeCode)}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto">
                    <code>{themeCode}</code>
                  </pre>
                  <p className="text-xs text-slate-600 mt-2">
                    For Shopify 2.0 themes, you can use app blocks or liquid includes.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Manual Installation Notes</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Manual installation requires theme file editing</li>
                      <li>• Changes may be lost during theme updates</li>
                      <li>• Automatic method is recommended for easier maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Verification Steps */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Verify Installation</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">1</div>
              <span className="text-sm text-slate-700">Visit your storefront in a new tab</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">2</div>
              <span className="text-sm text-slate-700">Look for the "🎁 Searching for a Gift?" button in the bottom-right corner</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">3</div>
              <span className="text-sm text-slate-700">Click the button to test the gift recommendation modal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}