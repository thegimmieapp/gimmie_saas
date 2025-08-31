import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AnalyticsMetricCard({ title, value, change, icon: Icon, tooltip }) {
  const isPositive = change ? change.startsWith('+') : true;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 flex items-center justify-between">
          <span>{title}</span>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-slate-400 cursor-help hover:text-slate-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="p-3 bg-slate-100 rounded-lg">
              <Icon className="h-6 w-6 text-slate-700" />
            </div>
          )}
          <div className="flex-1">
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            <div className="text-sm flex items-center gap-1">
              <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
                {isPositive ? 
                  <TrendingUp className="inline w-4 h-4 mr-1"/> : 
                  <TrendingDown className="inline w-4 h-4 mr-1"/>
                }
                {change}
              </span>
              <span className="text-slate-500">vs last period</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}