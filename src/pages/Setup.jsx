
import React, { useState, useEffect } from "react";
import { Store } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Plug, 
  Code,
  Webhook,
  TestTube,
  AlertTriangle,
  ExternalLink,
  Copy,
  RefreshCw
} from "lucide-react";

import ConnectionStatus from "../components/setup/ConnectionStatus";
import InstallationSteps from "../components/setup/InstallationSteps";
import ScriptInjection from "../components/setup/ScriptInjection";
import WebhookSetup from "../components/setup/WebhookSetup";
import TestingTools from "../components/setup/TestingTools";
import Troubleshooting from "../components/setup/Troubleshooting";
import { useTutorial } from "../components/onboarding/TutorialProvider";

export default function Setup() {
  const [stores, setStores] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState({
    oauth: "pending",
    script: "pending", 
    webhook: "pending",
    theme: "pending"
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { startTutorial } = useTutorial();

  useEffect(() => {
    loadSetupData();
  }, []);

  useEffect(() => {
    // Start setup tutorial after data loads
    if (stores.length > 0) {
      const tutorialSteps = [
        {
          title: "Setup Overview 🔧",
          description: "This shows your connection status. All items need to be green for the widget to work properly.",
          targetSelector: "[data-tutorial='connection-status']",
          position: "bottom"
        },
        {
          title: "Installation Steps",
          description: "Follow these steps in order to get your widget live. Most happen automatically after connecting to Shopify.",
          targetSelector: "[data-tutorial='installation-tabs']",
          position: "bottom"
        },
        {
          title: "Testing Tools",
          description: "Once setup is complete, use these tools to verify everything is working correctly.",
          targetSelector: "[data-tutorial='testing-section']",
          position: "left"
        },
        {
          title: "Need Help?",
          description: "If you run into issues, check the troubleshooting section or contact our support team.",
          targetSelector: "[data-tutorial='troubleshooting']",
          position: "left"
        }
      ];
      
      setTimeout(() => {
        startTutorial(tutorialSteps, "setup-intro");
      }, 500);
    }
  }, [stores, startTutorial]);

  const loadSetupData = async () => {
    try {
      const storeData = await Store.list();
      setStores(storeData);
      
      if (storeData.length > 0) {
        const store = storeData[0];
        setConnectionStatus({
          oauth: store.installation_status === "connected" ? "connected" : "pending",
          script: store.widget_enabled ? "connected" : "pending",
          webhook: "connected", // Assume connected for demo
          theme: "connected"    // Assume connected for demo
        });
      }
    } catch (error) {
      console.error("Error loading setup data:", error);
    }
  };

  const refreshStatus = async () => {
    setIsRefreshing(true);
    await loadSetupData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const currentStore = stores[0] || {};
  const allConnected = Object.values(connectionStatus).every(status => status === "connected");

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Setup & Installation</h1>
            <p className="text-slate-600 text-lg">
              Connect your Shopify store to start recommending perfect gifts
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={refreshStatus}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Status
            </Button>
            {allConnected && (
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 gap-2">
                <CheckCircle className="w-4 h-4" />
                Setup Complete!
              </Button>
            )}
          </div>
        </div>

        {/* Overall Status Card */}
        <Card className="mb-8 bg-gradient-to-r from-white to-slate-50 border-slate-200/60 shadow-lg" data-tutorial="connection-status">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plug className="w-5 h-5 text-emerald-600" />
              Connection Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectionStatus 
              status={connectionStatus} 
              storeName={currentStore.store_name}
              shopDomain={currentStore.shop_domain}
            />
          </CardContent>
        </Card>

        {/* Main Setup Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Setup Steps - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="installation" className="w-full" data-tutorial="installation-tabs">
              <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200">
                <TabsTrigger value="installation" className="gap-2">
                  <Plug className="w-4 h-4" />
                  Install
                </TabsTrigger>
                <TabsTrigger value="script" className="gap-2">
                  <Code className="w-4 h-4" />
                  Script
                </TabsTrigger>
                <TabsTrigger value="webhook" className="gap-2">
                  <Webhook className="w-4 h-4" />
                  Tracking
                </TabsTrigger>
                <TabsTrigger value="testing" className="gap-2">
                  <TestTube className="w-4 h-4" />
                  Test
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="installation" className="mt-6">
                <InstallationSteps 
                  connectionStatus={connectionStatus}
                  currentStore={currentStore}
                />
              </TabsContent>
              
              <TabsContent value="script" className="mt-6">
                <ScriptInjection 
                  status={connectionStatus.script}
                  shopDomain={currentStore.shop_domain}
                />
              </TabsContent>
              
              <TabsContent value="webhook" className="mt-6">
                <WebhookSetup 
                  status={connectionStatus.webhook}
                  shopDomain={currentStore.shop_domain}
                />
              </TabsContent>
              
              <TabsContent value="testing" className="mt-6">
                <TestingTools 
                  allConnected={allConnected}
                  shopDomain={currentStore.shop_domain}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div data-tutorial="troubleshooting">
              <Troubleshooting />
            </div>
            
            <div data-tutorial="testing-section">
              {/* Support Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200/60">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center gap-2">
                    💬 Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-blue-800">
                    Having trouble with the setup? Our team is here to help!
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      📧 Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      💬 Live Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Store Info Card */}
            {currentStore.shop_domain && (
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
                <CardHeader>
                  <CardTitle className="text-slate-900 text-sm">Store Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-600">Store Name</p>
                    <p className="font-semibold">{currentStore.store_name}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Shop Domain</p>
                    <p className="font-mono text-xs break-all">{currentStore.shop_domain}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Installation Status</p>
                    <Badge 
                      className={
                        currentStore.installation_status === "connected" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {currentStore.installation_status || "pending"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
