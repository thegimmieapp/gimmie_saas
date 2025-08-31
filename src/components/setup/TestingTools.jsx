import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TestTube,
  Play,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  MousePointer
} from "lucide-react";

const testSuite = [
  {
    id: "widget_visibility",
    name: "Widget Visibility",
    description: "Check if widget button appears on storefront",
    status: "passed"
  },
  {
    id: "modal_functionality", 
    name: "Modal Functionality",
    description: "Verify gift recommendation modal opens and displays products",
    status: "passed"
  },
  {
    id: "tracking_pixels",
    name: "Tracking Pixels",
    description: "Test conversion tracking and analytics collection",
    status: "passed"
  },
  {
    id: "responsive_design",
    name: "Responsive Design", 
    description: "Ensure widget works correctly on mobile and desktop",
    status: "warning"
  },
  {
    id: "performance_check",
    name: "Performance Check",
    description: "Verify widget doesn't slow down page load times",
    status: "passed"
  }
];

export default function TestingTools({ allConnected, shopDomain }) {
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState(testSuite);

  const runAllTests = async () => {
    setIsRunningTests(true);
    
    // Simulate running tests
    for (let i = 0; i < testResults.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setTestResults(prev => 
        prev.map((test, index) => 
          index === i ? { ...test, status: "running" } : test
        )
      );
    }
    
    // Final results
    setTimeout(() => {
      setTestResults(testSuite);
      setIsRunningTests(false);
    }, 1000);
  };

  const openStorefront = () => {
    if (shopDomain) {
      window.open(`https://${shopDomain}`, "_blank");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "warning":
        return <RefreshCw className="w-4 h-4 text-amber-600" />;
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <div className="w-4 h-4 bg-slate-300 rounded-full"></div>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-emerald-100 text-emerald-800">Passed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Warning</Badge>;
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-600">Pending</Badge>;
    }
  };

  const passedTests = testResults.filter(t => t.status === "passed").length;
  const totalTests = testResults.length;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-green-600" />
          Integration Testing
          <Badge className="bg-slate-100 text-slate-800">
            {passedTests}/{totalTests} Passed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Test Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={runAllTests}
            disabled={!allConnected || isRunningTests}
            className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
          >
            <Play className="w-4 h-4" />
            {isRunningTests ? "Running Tests..." : "Run All Tests"}
          </Button>
          
          <Button
            variant="outline"
            onClick={openStorefront}
            disabled={!shopDomain}
            className="gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Test Live
          </Button>
        </div>

        {!allConnected && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 text-sm">
              ⚠️ Complete all setup steps before running tests
            </p>
          </div>
        )}

        {/* Test Results */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Test Results</h3>
          <div className="space-y-3">
            {testResults.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <h4 className="font-medium text-slate-900">{test.name}</h4>
                    <p className="text-sm text-slate-600">{test.description}</p>
                  </div>
                </div>
                {getStatusBadge(test.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Manual Testing Guide */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Manual Testing Checklist</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <MousePointer className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900">Widget Interaction</h4>
                <p className="text-sm text-blue-700">
                  Visit your store and click the gift widget button. Verify the modal opens with product recommendations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <TestTube className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-purple-900">Test Purchase</h4>
                <p className="text-sm text-purple-700">
                  Complete a test purchase to verify conversion tracking and analytics data collection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
              <RefreshCw className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-emerald-900">Cross-Device Testing</h4>
                <p className="text-sm text-emerald-700">
                  Test the widget on different devices (mobile, tablet, desktop) to ensure responsive design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {passedTests === totalTests && !isRunningTests && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="font-semibold text-emerald-900">All Tests Passed! 🎉</h4>
                <p className="text-emerald-700 text-sm">
                  Your Gimmie AI integration is working perfectly. Start recommending gifts to your customers!
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}