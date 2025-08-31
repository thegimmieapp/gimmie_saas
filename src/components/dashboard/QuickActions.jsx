import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Settings, 
  BarChart3, 
  Box, 
  Plug, 
  ArrowRight,
  Palette,
  Upload,
  TestTube
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function QuickActions() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          ⚡ Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <TooltipProvider>
          <div className="grid grid-cols-1 gap-2">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link to={createPageUrl("WidgetSettings")}>
                  <Button variant="outline" className="w-full justify-start gap-3 text-left hover:bg-slate-50">
                    <div className="p-1 bg-emerald-100 rounded">
                      <Palette className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Customize Widget</span>
                      <p className="text-xs text-slate-500">Change colors and styling</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Customize your widget's appearance and positioning</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link to={createPageUrl("Products")}>
                  <Button variant="outline" className="w-full justify-start gap-3 text-left hover:bg-slate-50">
                    <div className="p-1 bg-blue-100 rounded">
                      <Upload className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Sync Products</span>
                      <p className="text-xs text-slate-500">Update your catalog</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sync your Shopify products or upload new ones</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link to={createPageUrl("Setup")}>
                  <Button variant="outline" className="w-full justify-start gap-3 text-left hover:bg-slate-50">
                    <div className="p-1 bg-purple-100 rounded">
                      <TestTube className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Test Integration</span>
                      <p className="text-xs text-slate-500">Verify everything works</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run tests to ensure your widget is working correctly</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link to={createPageUrl("Analytics")}>
                  <Button variant="outline" className="w-full justify-start gap-3 text-left hover:bg-slate-50">
                    <div className="p-1 bg-orange-100 rounded">
                      <BarChart3 className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">View Reports</span>
                      <p className="text-xs text-slate-500">Detailed analytics</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Access detailed performance reports and insights</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}