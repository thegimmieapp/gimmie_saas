
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Palette, Type, Sparkles, Link as LinkIcon } from "lucide-react";

const colorPresets = [
  { name: "Emerald", bg: "#10b981", text: "#ffffff" },
  { name: "Blue", bg: "#3b82f6", text: "#ffffff" },
  { name: "Purple", bg: "#8b5cf6", text: "#ffffff" },
  { name: "Orange", bg: "#f59e0b", text: "#ffffff" },
  { name: "Pink", bg: "#ec4899", text: "#ffffff" },
  { name: "Dark", bg: "#1f2937", text: "#ffffff" },
];

const fontOptions = [
  "Inter, system-ui, sans-serif",
  "Arial, sans-serif",
  "Helvetica, sans-serif", 
  "Georgia, serif",
  "Times New Roman, serif",
  "Courier New, monospace"
];

export default function StyleControls({ config, onConfigChange }) {
  const applyColorPreset = (preset) => {
    onConfigChange("button_bg_color", preset.bg);
    onConfigChange("button_text_color", preset.text);
  };

  return (
    <div className="space-y-6">
      
      {/* Color Presets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-emerald-600" />
          <Label className="text-sm font-semibold text-slate-700">Quick Color Presets</Label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {colorPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => applyColorPreset(preset)}
              className="h-8 px-2 text-xs"
              style={{ backgroundColor: `${preset.bg}20`, borderColor: preset.bg }}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: preset.bg }}
              ></div>
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Custom Colors */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold text-slate-700">Custom Colors</Label>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="button_bg" className="text-xs text-slate-600 mb-2 block">
              Button Background
            </Label>
            <div className="flex gap-2">
              <Input
                id="button_bg"
                type="color"
                value={config.button_bg_color}
                onChange={(e) => onConfigChange("button_bg_color", e.target.value)}
                className="w-12 h-8 p-1 rounded"
              />
              <Input
                value={config.button_bg_color}
                onChange={(e) => onConfigChange("button_bg_color", e.target.value)}
                placeholder="#10b981"
                className="text-xs"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="button_text" className="text-xs text-slate-600 mb-2 block">
              Button Text
            </Label>
            <div className="flex gap-2">
              <Input
                id="button_text"
                type="color"
                value={config.button_text_color}
                onChange={(e) => onConfigChange("button_text_color", e.target.value)}
                className="w-12 h-8 p-1 rounded"
              />
              <Input
                value={config.button_text_color}
                onChange={(e) => onConfigChange("button_text_color", e.target.value)}
                placeholder="#ffffff"
                className="text-xs"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="modal_bg" className="text-xs text-slate-600 mb-2 block">
              Modal Background
            </Label>
            <div className="flex gap-2">
              <Input
                id="modal_bg"
                type="color"
                value={config.modal_bg_color}
                onChange={(e) => onConfigChange("modal_bg_color", e.target.value)}
                className="w-12 h-8 p-1 rounded"
              />
              <Input
                value={config.modal_bg_color}
                onChange={(e) => onConfigChange("modal_bg_color", e.target.value)}
                placeholder="#ffffff"
                className="text-xs"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="modal_text" className="text-xs text-slate-600 mb-2 block">
              Modal Text
            </Label>
            <div className="flex gap-2">
              <Input
                id="modal_text"
                type="color"
                value={config.modal_text_color}
                onChange={(e) => onConfigChange("modal_text_color", e.target.value)}
                className="w-12 h-8 p-1 rounded"
              />
              <Input
                value={config.modal_text_color}
                onChange={(e) => onConfigChange("modal_text_color", e.target.value)}
                placeholder="#1f2937"
                className="text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Typography & Content */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-blue-600" />
          <Label className="text-sm font-semibold text-slate-700">Content &amp; Text</Label>
        </div>
        
        <div>
          <Label htmlFor="font" className="text-xs text-slate-600 mb-2 block">
            Font Family
          </Label>
          <Select value={config.font_family} onValueChange={(value) => onConfigChange("font_family", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font, index) => (
                <SelectItem key={index} value={font} style={{ fontFamily: font }}>
                  {font.split(',')[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="custom_text" className="text-xs text-slate-600 mb-2 block">
            Button Text
          </Label>
          <Input
            id="custom_text"
            value={config.custom_text}
            onChange={(e) => onConfigChange("custom_text", e.target.value)}
            placeholder="🎁 Searching for a Gift?"
          />
        </div>

        <div>
          <Label htmlFor="support_url" className="text-xs text-slate-600 mb-2 block flex items-center gap-1">
            <LinkIcon className="w-3 h-3"/>
            Help/Support URL
          </Label>
          <Input
            id="support_url"
            value={config.support_url || ''}
            onChange={(e) => onConfigChange("support_url", e.target.value)}
            placeholder="https://your-store.com/help"
          />
        </div>
      </div>

      <Separator />

      {/* Style Options */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <Label className="text-sm font-semibold text-slate-700">Style Options</Label>
        </div>
        
        <div>
          <Label className="text-xs text-slate-600 mb-2 block">Button Style</Label>
          <Select value={config.button_style} onValueChange={(value) => onConfigChange("button_style", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rounded">Rounded Corners</SelectItem>
              <SelectItem value="square">Square Corners</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-slate-600 mb-2 block">Animation</Label>
          <Select value={config.animation_type} onValueChange={(value) => onConfigChange("animation_type", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="pulse">Pulse</SelectItem>
              <SelectItem value="bounce">Bounce</SelectItem>
              <SelectItem value="glow">Glow Effect</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
