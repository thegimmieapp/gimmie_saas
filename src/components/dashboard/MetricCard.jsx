import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MetricCard({ title, value, change, changeType, icon: Icon, color, tooltipText }) {
  const cardColorClasses = {
    emerald: "from-emerald-50 to-emerald-100 border-emerald-200/60",
    blue: "from-blue-50 to-blue-100 border-blue-200/60",
    purple: "from-purple-50 to-purple-100 border-purple-200/60",
    orange: "from-orange-50 to-orange-100 border-orange-200/60"
  };

  const iconColorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  };

  const changeColorClasses = {
    positive: "bg-emerald-100 text-emerald-800",
    negative: "bg-red-100 text-red-800"
  };

  return (
    <Card className={`bg-gradient-to-br border shadow-lg ${cardColorClasses[color] || 'from-slate-50 to-slate-100 border-slate-200'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-slate-700">
          {title}
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-slate-400 cursor-help hover:text-slate-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-4">
          <div className={`p-3 rounded-lg ${iconColorClasses[color] || 'bg-slate-100 text-slate-600'}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge className={`${changeColorClasses[changeType]} gap-1`}>
                {changeType === 'positive' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {change}
              </Badge>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}