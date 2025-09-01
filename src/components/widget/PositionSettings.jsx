import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet } from "lucide-react";

const positions = [
  { value: "bottom-right", label: "Bottom Right", icon: "↘️" },
  { value: "bottom-left", label: "Bottom Left", icon: "↙️" },
  { value: "top-right", label: "Top Right", icon: "↗️" },
  { value: "top-left", label: "Top Left", icon: "↖️" }
];

export default function PositionSettings({ config, onConfigChange }) {
  return (
    <div className="space-y-6">
      
      {/* Position Selection */}
      <div>
        <Label className="text-sm font-semibold text-slate-700 mb-4 block">
          Widget Position
        </Label>
        
        {/* Visual Position Grid */}
        <div className="relative bg-slate-100 rounded-lg p-6 mb-4">
          <div className="bg-white rounded border-2 border-dashed border-slate-300 h-48 relative">
            <div className="absolute top-2 left-2 text-xs text-slate-400">Your Store</div>
            
            {positions.map((position) => (
              <button
                key={position.value}
                onClick={() => onConfigChange("position", position.value)}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                  config.position === position.value
                    ? "bg-emerald-500 text-white shadow-lg scale-110"
                    : "bg-slate-300 text-slate-600 hover:bg-slate-400"
                } ${
                  position.value.includes("top") ? "top-2" : "bottom-2"
                } ${
                  position.value.includes("right") ? "right-2" : "left-2"
                }`}
              >
                {position.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Position Options */}
        <div className="grid grid-cols-2 gap-2">
          {positions.map((position) => (
            <Button
              key={position.value}
              variant={config.position === position.value ? "default" : "outline"}
              size="sm"
              onClick={() => onConfigChange("position", position.value)}
              className={`justify-start ${
                config.position === position.value 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : ""
              }`}
            >
              <span className="mr-2">{position.icon}</span>
              {position.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Device Preview */}
      <div>
        <Label className="text-sm font-semibold text-slate-700 mb-4 block">
          Preview on Devices
        </Label>
        
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <div className="w-16 h-10 bg-slate-200 rounded border-2 border-slate-300 mx-auto mb-2 flex items-center justify-center relative">
              <Monitor className="w-6 h-6 text-slate-400" />
              <div className={`absolute w-1.5 h-1.5 bg-emerald-500 rounded-full ${
                config.position.includes("top") ? "top-1" : "bottom-1"
              } ${
                config.position.includes("right") ? "right-1" : "left-1"
              }`}></div>
            </div>
            <span className="text-xs text-slate-600">Desktop</span>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-16 bg-slate-200 rounded border-2 border-slate-300 mx-auto mb-2 flex items-center justify-center relative">
              <Tablet className="w-4 h-4 text-slate-400" />
              <div className={`absolute w-1 h-1 bg-emerald-500 rounded-full ${
                config.position.includes("top") ? "top-1" : "bottom-1"
              } ${
                config.position.includes("right") ? "right-1" : "left-1"
              }`}></div>
            </div>
            <span className="text-xs text-slate-600">Tablet</span>
          </div>
          
          <div className="text-center">
            <div className="w-6 h-12 bg-slate-200 rounded border-2 border-slate-300 mx-auto mb-2 flex items-center justify-center relative">
              <Smartphone className="w-3 h-3 text-slate-400" />
              <div className={`absolute w-0.5 h-0.5 bg-emerald-500 rounded-full ${
                config.position.includes("top") ? "top-0.5" : "bottom-0.5"
              } ${
                config.position.includes("right") ? "right-0.5" : "left-0.5"
              }`}></div>
            </div>
            <span className="text-xs text-slate-600">Mobile</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Bottom-right is the most common position for chat widgets and tends to have the highest engagement rates.
        </p>
      </div>
    </div>
  );
}