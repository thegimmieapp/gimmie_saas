
import React, { useState, useEffect } from "react";
import { WidgetConfig, Store } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Eye, Code2, Save } from "lucide-react";
// import { useToast } from "@/hooks/use-toast"; // This line is commented out as per the outline
import { useTutorial } from "../components/onboarding/TutorialProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import StyleControls from "../components/widget/StyleControls";
import WidgetPreview from "../components/widget/WidgetPreview";
import CodeSnippet from "../components/widget/CodeSnippet";
import PositionSettings from "../components/widget/PositionSettings";

export default function WidgetSettings() {
  const [config, setConfig] = useState({
    button_bg_color: "#10b981",
    button_text_color: "#ffffff",
    modal_bg_color: "#ffffff",
    modal_text_color: "#1f2937",
    button_style: "rounded",
    font_family: "Inter, system-ui, sans-serif",
    position: "bottom-right",
    custom_text: "🎁 Searching for a Gift?",
    animation_type: "pulse"
  });
  const [stores, setStores] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  // const { toast } = useToast(); // This line is commented out as per the outline
  const { startTutorial } = useTutorial();

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    // Start widget settings tutorial
    const tutorialSteps = [
      {
        title: "Widget Customization 🎨",
        description: "Use these controls to customize your widget's appearance, behavior, and text to match your brand.",
        targetSelector: "[data-tutorial='customization-panel']",
        position: "right"
      },
      {
        title: "Live Preview",
        description: "See your changes in real-time! This preview shows exactly how your widget will look to customers.",
        targetSelector: "[data-tutorial='widget-preview']",
        position: "left"
      },
      {
        title: "Style Settings",
        description: "Adjust colors, fonts, and button styles. Try the preset color schemes for quick styling.",
        targetSelector: "[data-tutorial='style-tab']",
        position: "bottom"
      },
      {
        title: "Save Your Changes",
        description: "Don't forget to save! Your changes will be applied to your live widget immediately.",
        targetSelector: "[data-tutorial='save-button']",
        position: "bottom"
      }
    ];
    
    setTimeout(() => {
      startTutorial(tutorialSteps, "widget-settings-intro");
    }, 500);
  }, [startTutorial]);

  const loadSettings = async () => {
    try {
      const storeData = await Store.list();
      setStores(storeData);
      
      if (storeData.length > 0) {
        const configs = await WidgetConfig.filter({ store_id: storeData[0].id });
        if (configs.length > 0) {
          setConfig(configs[0]);
        }
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      if (stores.length > 0) {
        const existingConfigs = await WidgetConfig.filter({ store_id: stores[0].id });
        
        if (existingConfigs.length > 0) {
          await WidgetConfig.update(existingConfigs[0].id, config);
        } else {
          await WidgetConfig.create({ ...config, store_id: stores[0].id });
        }
        
        alert("Settings saved!"); // Replaced toast with alert
      }
    } catch (error) {
      alert("Error saving settings. Please try again."); // Replaced toast with alert
      console.error("Error saving settings:", error); // Added console.error as per outline
    }
    setIsSaving(false);
  };

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Widget Customization</h1>
            <p className="text-slate-600 text-lg">
              Design your perfect gift recommendation widget
            </p>
          </div>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button 
                  onClick={saveSettings} 
                  disabled={isSaving}
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 gap-2"
                  data-tutorial="save-button"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Apply your changes to the live widget on your store.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Settings Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg" data-tutorial="customization-panel">
              <CardHeader className="border-b border-slate-200/60">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-emerald-600" />
                  Customize Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="style" className="w-full">
                  <TooltipProvider>
                    <TabsList className="grid w-full grid-cols-3 bg-slate-100/60 m-6 mb-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TabsTrigger value="style" className="gap-2" data-tutorial="style-tab">
                            <Palette className="w-4 h-4" />
                            Style
                          </TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Adjust colors, fonts, and button styles.</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TabsTrigger value="position" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Position
                          </TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Set where the widget appears on your page.</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TabsTrigger value="code" className="gap-2">
                            <Code2 className="w-4 h-4" />
                            Code
                          </TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View the script for manual installation if needed.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TabsList>
                  </TooltipProvider>
                  
                  <TabsContent value="style" className="p-6 pt-4">
                    <StyleControls 
                      config={config}
                      onConfigChange={handleConfigChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="position" className="p-6 pt-4">
                    <PositionSettings 
                      config={config}
                      onConfigChange={handleConfigChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="code" className="p-6 pt-4">
                    <CodeSnippet config={config} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg h-full" data-tutorial="widget-preview">
              <CardHeader className="border-b border-slate-200/60">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <WidgetPreview config={config} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
