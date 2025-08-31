

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import PublicLayout from "./components/public/PublicLayout";
import B2BLayout from "./components/public/B2BLayout";
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  Plug,
  Gift,
  Box,
  CreditCard,
  LifeBuoy,
  Star
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import TutorialProvider from "./components/onboarding/TutorialProvider";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Product Catalog",
    url: createPageUrl("Products"),
    icon: Box,
  },
  {
    title: "Widget Settings",
    url: createPageUrl("WidgetSettings"),
    icon: Settings,
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: BarChart3,
  },
  {
    title: "Setup & Installation",
    url: createPageUrl("Setup"),
    icon: Plug,
  },
  {
    title: "Account & Billing",
    url: createPageUrl("AccountBilling"),
    icon: CreditCard,
  },
  {
    title: "Referrals",
    url: createPageUrl("Referrals"),
    icon: Gift,
  },
  {
    title: "Support",
    url: createPageUrl("Support"),
    icon: LifeBuoy,
  },
  {
    title: "Leave Feedback",
    url: createPageUrl("LeaveFeedback"),
    icon: Star,
  },
];

// B2C Consumer-focused pages
const publicPages = [
    "PublicHome",
    "PublicArticle",
    "PublicCategory",
    "PublicContact",
    "PublicFaq",
    "RecipientProfiles",
    "UserProfile",
    "Onboarding"
];

// B2B SaaS-focused pages
const b2bPages = [
    "Landing",
    "Pricing",
    "DeveloperDocs",
    "B2BContact",
    "Testimonials",
    "CreatorPartner",
    "IntegrateLanding",
    "AnalyticsLanding"
];

function AppLayout({ children, currentPageName }) {
    const location = useLocation();

    return (
        <TutorialProvider>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-[--gimmie-grey-sky]">
              <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
                <SidebarHeader className="border-b border-slate-200/60 p-4">
                  <Link to={createPageUrl("PublicHome")} className="flex items-center justify-center hover:opacity-80 transition-opacity">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8f4c59034_green.png" alt="Gimmie AI" className="h-12" />
                  </Link>
                </SidebarHeader>

                <SidebarContent className="p-3">
                  <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                      App Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {navigationItems.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              className={`hover:bg-[--gimmie-green]/10 hover:text-[--gimmie-green] transition-all duration-300 rounded-xl mb-1 ${
                                location.pathname === item.url
                                  ? 'bg-[--gimmie-green]/10 text-[--gimmie-green] shadow-sm font-semibold'
                                  : 'text-slate-700'
                              }`}
                            >
                              <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                      Store Status
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <div className="px-4 py-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Widget Status</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-emerald-700">Active</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">This Month</span>
                          <span className="text-sm font-bold text-slate-900">$2,847</span>
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="border-t border-slate-200/60 p-4">
                  <div className="bg-slate-100 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[--gimmie-green] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">Sample Store</p>
                        <p className="text-xs text-slate-500">sample-store.myshopify.com</p>
                      </div>
                    </div>
                  </div>
                </SidebarFooter>
              </Sidebar>

              <main className="flex-1 flex flex-col">
                <header className="bg-white/70 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
                    <Link to={createPageUrl("PublicHome")}>
                      <h1 className="text-xl font-bold text-slate-900 hover:text-[--gimmie-green] transition-colors cursor-pointer">Gimmie AI</h1>
                    </Link>
                  </div>
                </header>

                <div className="flex-1 overflow-auto">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        </TutorialProvider>
    );
}

export default function Layout({ children, currentPageName }) {
  let pageContent;

  if (publicPages.includes(currentPageName)) {
    pageContent = <PublicLayout>{children}</PublicLayout>;
  } else if (b2bPages.includes(currentPageName)) {
    pageContent = <B2BLayout>{children}</B2BLayout>;
  } else {
    // All other pages get the app layout (dashboard)
    pageContent = <AppLayout currentPageName={currentPageName}>{children}</AppLayout>;
  }

  return (
    <>
      <style>{`
        :root {
          --gimmie-dark: #2a2b2a;
          --gimmie-carolina: #5d9eac;
          --gimmie-grey-sky: #f5f6f7;
          --gimmie-green: #385B65;
        }

        /* Add feminine touches */
        .feminine-gradient {
          background: linear-gradient(135deg, #f5f6f7 0%, #ffffff 50%, #5d9eac 100%);
        }

        .soft-shadow {
          box-shadow: 0 8px 32px rgba(93, 158, 172, 0.12), 0 2px 8px rgba(93, 158, 172, 0.08);
        }

        .gentle-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gentle-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(93, 158, 172, 0.15), 0 4px 12px rgba(93, 158, 172, 0.1);
        }
      `}</style>
      {pageContent}
    </>
  );
}

