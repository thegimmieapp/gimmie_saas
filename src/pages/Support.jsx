import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LifeBuoy, Bot, Ticket, MessageSquare, BookOpen } from "lucide-react";

import AiAssistant from "../components/support/AiAssistant";
import MyTickets from "../components/support/MyTickets";
import ContactForm from "../components/support/ContactForm";
import Faq from "../components/support/Faq";

export default function SupportPage() {
  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <LifeBuoy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Support Center</h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Get instant help from our AI Assistant, manage your support tickets, or contact our team.
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="assistant" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm border border-slate-200/60 p-1 h-auto">
            <TabsTrigger value="assistant" className="gap-2 py-2.5">
              <Bot className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2 py-2.5">
              <Ticket className="w-4 h-4" />
              My Tickets
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2 py-2.5">
              <MessageSquare className="w-4 h-4" />
              Contact & FAQ
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="assistant">
              <AiAssistant />
            </TabsContent>
            <TabsContent value="tickets">
              <MyTickets />
            </TabsContent>
            <TabsContent value="contact">
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <ContactForm />
                </div>
                <div className="lg:col-span-2">
                  <Faq />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
      </div>
    </div>
  );
}