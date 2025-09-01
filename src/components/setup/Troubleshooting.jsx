import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const troubleshootingItems = [
  {
    id: "widget-not-showing",
    question: "Widget button not showing on my store",
    answer: [
      "Check that the OAuth connection is completed successfully",
      "Verify that the widget script is injected into your theme",
      "Clear your browser cache and check again",
      "Make sure your theme supports script injection",
      "Check browser console for any JavaScript errors"
    ],
    severity: "high"
  },
  {
    id: "modal-not-opening",
    question: "Gift recommendation modal won't open",
    answer: [
      "Ensure there are no JavaScript conflicts with other apps",
      "Check if Content Security Policy (CSP) is blocking the modal",
      "Verify that the Gimmie AI script loaded correctly",
      "Try disabling other apps temporarily to isolate the issue",
      "Check the browser's developer console for error messages"
    ],
    severity: "high"
  },
  {
    id: "tracking-issues",
    question: "Conversion tracking not working",
    answer: [
      "Confirm that webhooks are properly configured in Shopify",
      "Check webhook delivery status in your Shopify admin",
      "Verify that test orders are being created correctly",
      "Ensure the Gimmie AI app has proper permissions",
      "Review the webhook payload format for any errors"
    ],
    severity: "medium"
  },
  {
    id: "styling-problems",
    question: "Widget styling looks broken",
    answer: [
      "Check if your theme CSS is conflicting with widget styles",
      "Try different widget positions in the customization settings",
      "Verify that custom colors are set correctly",
      "Clear browser cache to see latest styling changes",
      "Test on different browsers to identify browser-specific issues"
    ],
    severity: "low"
  },
  {
    id: "performance-issues",
    question: "Widget is slowing down my store",
    answer: [
      "The widget script is loaded asynchronously and shouldn't block page rendering",
      "Check your store's overall performance using tools like PageSpeed Insights",
      "Disable other apps temporarily to identify the actual cause",
      "Contact support if issues persist - we can optimize for your specific setup",
      "Consider using the 'defer' loading option for the script"
    ],
    severity: "medium"
  },
  {
    id: "mobile-issues", 
    question: "Problems on mobile devices",
    answer: [
      "Test the widget on different mobile browsers (Safari, Chrome, Firefox)",
      "Check that the widget position works well on smaller screens",
      "Verify that touch interactions work properly",
      "Ensure the modal is responsive and scrollable on mobile",
      "Test on both iOS and Android devices"
    ],
    severity: "medium"
  }
];

export default function Troubleshooting() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (itemId) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-slate-600";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      case "low":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-orange-600" />
          Troubleshooting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Quick Help */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Need immediate help?</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start gap-2">
              <ExternalLink className="w-4 h-4" />
              Check System Status
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start gap-2">
              📖 View Full Documentation
            </Button>
          </div>
        </div>

        {/* Common Issues */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Common Issues</h3>
          <div className="space-y-2">
            {troubleshootingItems.map((item) => (
              <Collapsible key={item.id} open={openItems.has(item.id)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto hover:bg-slate-50"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-center gap-3 text-left">
                      {getSeverityIcon(item.severity)}
                      <span className="font-medium text-slate-900">{item.question}</span>
                    </div>
                    {openItems.has(item.id) ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-3">
                  <div className="bg-slate-50 rounded-lg p-3 ml-7">
                    <ul className="space-y-1">
                      {item.answer.map((step, index) => (
                        <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                          <span className="text-slate-400 mt-1 text-xs">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Support Escalation */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="font-semibold text-emerald-900 mb-2">Still need help?</h4>
          <p className="text-emerald-700 text-sm mb-3">
            Our support team can help you resolve any setup issues quickly.
          </p>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            Contact Support Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}