import React from "react";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  connected: {
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-800",
    label: "Connected"
  },
  pending: {
    icon: Clock,
    color: "text-amber-600", 
    bgColor: "bg-amber-100",
    textColor: "text-amber-800",
    label: "Pending"
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100", 
    textColor: "text-red-800",
    label: "Error"
  }
};

const connectionSteps = [
  {
    key: "oauth",
    title: "Shopify OAuth",
    description: "Secure connection to your store"
  },
  {
    key: "script",
    title: "Widget Script",
    description: "Gift recommendation widget injection"
  },
  {
    key: "webhook", 
    title: "Order Tracking",
    description: "Conversion and analytics tracking"
  },
  {
    key: "theme",
    title: "Theme Integration", 
    description: "Seamless theme compatibility"
  }
];

export default function ConnectionStatus({ status, storeName, shopDomain }) {
  const getStatusComponent = (statusKey) => {
    const statusType = status[statusKey] || "pending";
    const config = statusConfig[statusType];
    const Icon = config.icon;

    return (
      <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${config.bgColor}`}>
            <Icon className={`w-4 h-4 ${config.color}`} />
          </div>
          <div>
            <h4 className="font-medium text-slate-900">
              {connectionSteps.find(step => step.key === statusKey)?.title}
            </h4>
            <p className="text-sm text-slate-600">
              {connectionSteps.find(step => step.key === statusKey)?.description}
            </p>
          </div>
        </div>
        <Badge className={`${config.bgColor} ${config.textColor} border-transparent`}>
          {config.label}
        </Badge>
      </div>
    );
  };

  const connectedCount = Object.values(status).filter(s => s === "connected").length;
  const totalSteps = Object.keys(status).length;
  const progressPercentage = (connectedCount / totalSteps) * 100;

  return (
    <div className="space-y-6">
      
      {/* Progress Overview */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          {storeName && (
            <>
              <h3 className="text-lg font-semibold text-slate-900">{storeName}</h3>
              <Badge variant="outline">{shopDomain}</Badge>
            </>
          )}
        </div>
        
        <div className="relative">
          <div className="flex justify-center mb-2">
            <div className="text-3xl font-bold text-slate-900">
              {connectedCount}/{totalSteps}
            </div>
          </div>
          <p className="text-sm text-slate-600">Steps completed</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Individual Status Items */}
      <div className="grid gap-3">
        {connectionSteps.map((step) => (
          <div key={step.key}>
            {getStatusComponent(step.key)}
          </div>
        ))}
      </div>

      {/* Overall Status Message */}
      <div className="text-center p-4 bg-slate-50 rounded-lg">
        {connectedCount === totalSteps ? (
          <div className="flex items-center justify-center gap-2 text-emerald-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">🎉 Your store is fully connected and ready to go!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-amber-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">
              Complete {totalSteps - connectedCount} more step{totalSteps - connectedCount !== 1 ? 's' : ''} to finish setup
            </span>
          </div>
        )}
      </div>
    </div>
  );
}