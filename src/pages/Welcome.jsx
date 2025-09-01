import React, { useState, useEffect } from "react";
import { User, OnboardingProgress, Store } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  CheckCircle, 
  ArrowRight, 
  Plug, 
  Package,
  Palette,
  Zap,
  Gift,
  Store as StoreIcon
} from "lucide-react";

const onboardingSteps = [
  {
    id: "store_connect",
    title: "Connect Your Store",
    description: "Link your Shopify store to start analyzing products",
    icon: Plug,
    action: "Connect Store",
    path: "Setup"
  },
  {
    id: "product_sync", 
    title: "Sync Products",
    description: "Import your product catalog for AI recommendations",
    icon: Package,
    action: "Sync Products", 
    path: "Products"
  },
  {
    id: "widget_customize",
    title: "Customize Widget",
    description: "Design your gift finder to match your brand",
    icon: Palette,
    action: "Customize Widget",
    path: "WidgetSettings"
  },
  {
    id: "go_live",
    title: "Go Live!",
    description: "Activate the widget on your storefront",
    icon: Zap,
    action: "Go Live",
    path: "Analytics"
  }
];

export default function WelcomePage() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWelcomeData();
  }, []);

  const loadWelcomeData = async () => {
    setIsLoading(true);
    try {
      const userData = await User.me();
      const progressData = await OnboardingProgress.list();
      const storeData = await Store.list();
      
      setUser(userData);
      setStores(storeData);
      
      if (progressData.length > 0) {
        setProgress(progressData[0]);
      } else {
        // Create initial progress record
        const newProgress = await OnboardingProgress.create({
          step: "welcome",
          completed_steps: [],
          store_connected: false,
          products_synced: false,
          widget_customized: false,
          widget_live: false,
          skipped_steps: []
        });
        setProgress(newProgress);
      }
    } catch (error) {
      console.error("Error loading welcome data:", error);
    }
    setIsLoading(false);
  };

  const markStepComplete = async (stepId) => {
    if (!progress) return;
    
    const updatedSteps = [...(progress.completed_steps || [])];
    if (!updatedSteps.includes(stepId)) {
      updatedSteps.push(stepId);
    }
    
    const updatedProgress = {
      ...progress,
      completed_steps: updatedSteps,
      [stepId]: true
    };
    
    await OnboardingProgress.update(progress.id, updatedProgress);
    setProgress(updatedProgress);
  };

  const completedCount = progress?.completed_steps?.length || 0;
  const progressPercentage = (completedCount / onboardingSteps.length) * 100;

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 bg-gradient-to-br from-[--gimmie-grey-sky] to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[--gimmie-green] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your welcome experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-[--gimmie-grey-sky] to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[--gimmie-green] to-[--gimmie-carolina] rounded-2xl flex items-center justify-center mx-auto mb-6 soft-shadow">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[--gimmie-dark] mb-4">
            Welcome to Gimmie AI! 🎉
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Let's get your AI-powered gift recommendations set up. This should take about 5 minutes.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-slate-200/60 soft-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[--gimmie-dark]">Setup Progress</CardTitle>
              <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green]">
                {completedCount} of {onboardingSteps.length} complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-3 mb-4" />
            <p className="text-sm text-slate-600">
              {completedCount === onboardingSteps.length 
                ? "🎉 All done! Your store is ready to start recommending perfect gifts."
                : `${onboardingSteps.length - completedCount} steps remaining to go live.`
              }
            </p>
          </CardContent>
        </Card>

        {/* Onboarding Steps */}
        <div className="space-y-4 mb-8">
          {onboardingSteps.map((step, index) => {
            const isCompleted = progress?.completed_steps?.includes(step.id) || false;
            const isActive = !isCompleted && index === completedCount;
            const Icon = step.icon;

            return (
              <Card 
                key={step.id} 
                className={`transition-all duration-200 ${
                  isCompleted 
                    ? "bg-emerald-50 border-emerald-200" 
                    : isActive
                    ? "bg-blue-50 border-blue-200 soft-shadow"
                    : "bg-white/60 border-slate-200"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          isCompleted ? "text-emerald-900" : isActive ? "text-blue-900" : "text-slate-700"
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${
                          isCompleted ? "text-emerald-700" : isActive ? "text-blue-700" : "text-slate-600"
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      {isCompleted ? (
                        <Badge className="bg-emerald-100 text-emerald-800">Complete</Badge>
                      ) : (
                        <Link to={createPageUrl(step.path)}>
                          <Button
                            variant={isActive ? "default" : "outline"}
                            className={isActive ? "bg-blue-600 hover:bg-blue-700" : ""}
                            onClick={() => isActive && markStepComplete(step.id)}
                          >
                            {step.action}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-[--gimmie-green] to-[--gimmie-carolina] text-white border-0">
            <CardContent className="p-6">
              <StoreIcon className="w-8 h-8 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-white/90 mb-4">
                Our team is here to help you get set up quickly and successfully.
              </p>
              <Link to={createPageUrl("Support")}>
                <Button variant="secondary" className="bg-white/90 text-[--gimmie-dark] hover:bg-white">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
            <CardContent className="p-6">
              <Gift className="w-8 h-8 text-[--gimmie-green] mb-4" />
              <h3 className="font-semibold text-[--gimmie-dark] text-lg mb-2">See It In Action</h3>
              <p className="text-slate-600 mb-4">
                Check out how Gimmie works on our consumer gift discovery site.
              </p>
              <Link to={createPageUrl("PublicHome")}>
                <Button variant="outline" className="border-slate-300 text-slate-700">
                  Visit Gimmie.com
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}