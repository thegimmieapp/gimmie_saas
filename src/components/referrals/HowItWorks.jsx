import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, UserPlus, Award } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Share2,
      title: "Share Your Link",
      description: "Share your unique referral link with other businesses you think would love Gimmie AI."
    },
    {
      icon: UserPlus,
      title: "They Go Live",
      description: "Your friend signs up, connects their Shopify store, and their Gimmie AI widget goes live."
    },
    {
      icon: Award,
      title: "You Get $150",
      description: "A $150 credit is automatically added to your account. It's that simple!"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200/60">
      <CardHeader>
        <CardTitle className="text-blue-900">How It Works</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/70 rounded-lg flex items-center justify-center">
              <step.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">{step.title}</h4>
              <p className="text-sm text-blue-800">{step.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}