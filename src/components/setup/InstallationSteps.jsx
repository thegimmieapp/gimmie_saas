import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  Plug,
  Key,
  Download,
  Settings
} from "lucide-react";

const installationSteps = [
  {
    step: 1,
    title: "Connect to Shopify",
    description: "Authorize Gimmie AI to access your store",
    action: "Connect Store",
    icon: Plug,
    status: "oauth"
  },
  {
    step: 2,
    title: "Install Widget Script",
    description: "Add the gift recommendation widget to your storefront",
    action: "Install Widget", 
    icon: Download,
    status: "script"
  },
  {
    step: 3,
    title: "Configure Tracking",
    description: "Enable conversion tracking and analytics",
    action: "Setup Tracking",
    icon: Settings,
    status: "webhook"  
  },
  {
    step: 4,
    title: "Test Integration",
    description: "Verify everything is working correctly",
    action: "Run Tests",
    icon: CheckCircle,
    status: "theme"
  }
];

export default function InstallationSteps({ connectionStatus, currentStore }) {
  const getStepStatus = (statusKey) => {
    return connectionStatus[statusKey] || "pending";
  };

  const handleStepAction = (step) => {
    switch (step.step) {
      case 1:
        // OAuth flow would be handled here
        window.open("https://example.myshopify.com/admin/oauth/authorize?client_id=YOUR_CLIENT_ID", "_blank");
        break;
      case 2:
        // Widget installation
        alert("Widget installation will be handled automatically after OAuth");
        break;
      case 3:
        // Webhook setup
        alert("Webhook tracking will be configured automatically");
        break;
      case 4:
        // Testing
        alert("Running integration tests...");
        break;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5 text-blue-600" />
          Installation Steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Welcome to Gimmie AI! 🎉</h3>
            <p className="text-blue-800 text-sm">
              Follow these simple steps to add AI-powered gift recommendations to your Shopify store. 
              The entire process takes less than 5 minutes.
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {installationSteps.map((step, index) => {
              const stepStatus = getStepStatus(step.status);
              const isCompleted = stepStatus === "connected";
              const isActive = !isCompleted && index === 0; // First incomplete step is active
              const Icon = step.icon;

              return (
                <div 
                  key={step.step}
                  className={`relative flex items-center p-4 rounded-lg border transition-all duration-200 ${
                    isCompleted 
                      ? "bg-emerald-50 border-emerald-200" 
                      : isActive
                      ? "bg-blue-50 border-blue-200 shadow-sm"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  
                  {/* Step Number/Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isActive
                      ? "bg-blue-500 text-white" 
                      : "bg-slate-300 text-slate-600"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{step.step}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`font-semibold ${
                        isCompleted ? "text-emerald-900" : isActive ? "text-blue-900" : "text-slate-700"
                      }`}>
                        {step.title}
                      </h4>
                      <Badge 
                        className={
                          isCompleted 
                            ? "bg-emerald-100 text-emerald-800" 
                            : isActive
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-600"
                        }
                      >
                        {isCompleted ? "Complete" : isActive ? "Active" : "Pending"}
                      </Badge>
                    </div>
                    <p className={`text-sm ${
                      isCompleted ? "text-emerald-700" : isActive ? "text-blue-700" : "text-slate-600"
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <div className="flex items-center text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    ) : (
                      <Button
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStepAction(step)}
                        className={isActive ? "bg-blue-600 hover:bg-blue-700" : ""}
                        disabled={!isActive && !isCompleted}
                      >
                        {step.action}
                        {isActive && <ArrowRight className="w-4 h-4 ml-1" />}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Steps */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">What happens after installation?</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• The gift widget will appear on your storefront</li>
              <li>• Customer interactions will be tracked automatically</li>
              <li>• You can customize the widget appearance anytime</li>
              <li>• Analytics will be available in your dashboard</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}