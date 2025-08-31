import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Webhook,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Shield,
  Zap
} from "lucide-react";

export default function WebhookSetup({ status, shopDomain }) {
  const webhooks = [
    {
      topic: "orders/create",
      description: "Track new orders and conversions",
      endpoint: "https://api.gimmie.ai/shopify/webhooks/order-create",
      status: status
    },
    {
      topic: "orders/updated", 
      description: "Monitor order changes and refunds",
      endpoint: "https://api.gimmie.ai/shopify/webhooks/order-update",
      status: status
    },
    {
      topic: "app/uninstalled",
      description: "Clean up data when app is removed",
      endpoint: "https://api.gimmie.ai/shopify/webhooks/app-uninstall",
      status: status
    }
  ];

  const testWebhook = () => {
    alert("Webhook test will be sent to verify connection...");
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="w-5 h-5 text-indigo-600" />
          Conversion Tracking Setup
          <Badge 
            className={
              status === "connected" 
                ? "bg-emerald-100 text-emerald-800" 
                : "bg-amber-100 text-amber-800"
            }
          >
            {status === "connected" ? "Active" : "Configuring"}
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
                {status === "connected" ? "Tracking Successfully Configured!" : "Setting Up Conversion Tracking"}
              </h4>
              <p className={`text-sm ${
                status === "connected" ? "text-emerald-700" : "text-amber-700"
              }`}>
                {status === "connected" 
                  ? "All webhooks are active and tracking customer interactions."
                  : "Webhooks will be automatically configured after OAuth completion."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Tracking Features */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">What We Track</h3>
          <div className="grid gap-4">
            
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Order Conversions</h4>
                <p className="text-sm text-slate-600">Track purchases made through gift recommendations</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Widget Interactions</h4>
                <p className="text-sm text-slate-600">Monitor clicks, searches, and user engagement</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Revenue Attribution</h4>
                <p className="text-sm text-slate-600">Measure ROI and conversion value from recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Webhook Details */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Configured Webhooks</h3>
          <div className="space-y-3">
            {webhooks.map((webhook, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-xs bg-slate-200 px-2 py-1 rounded font-mono">
                      {webhook.topic}
                    </code>
                    <Badge 
                      size="sm"
                      className={
                        webhook.status === "connected" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : "bg-slate-100 text-slate-600"
                      }
                    >
                      {webhook.status === "connected" ? "Active" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{webhook.description}</p>
                  <p className="text-xs text-slate-400 font-mono mt-1">{webhook.endpoint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test & Verification */}
        {status === "connected" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Test Your Tracking</h4>
            <p className="text-blue-800 text-sm mb-3">
              Verify that webhooks are working correctly by running a test order.
            </p>
            <Button size="sm" onClick={testWebhook} className="bg-blue-600 hover:bg-blue-700">
              Send Test Webhook
            </Button>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Privacy & Security</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• All webhook data is encrypted in transit and at rest</li>
                <li>• We only collect data necessary for gift recommendations</li>
                <li>• Customer personal information is anonymized</li>
                <li>• Full GDPR and CCPA compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}