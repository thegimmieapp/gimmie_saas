import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

const faqItems = [
  {
    question: "How do I install the Gimmie AI widget?",
    answer: "The easiest way is through our Shopify App. Just install the app and it will automatically inject the required script into your theme. For custom themes, you can copy the script from the 'Setup' page and add it to your theme.liquid file."
  },
  {
    question: "Why aren't my conversions being tracked?",
    answer: "Conversion tracking relies on webhooks. Please ensure you have completed the Shopify connection in the 'Setup' page. If you've installed manually, double-check that you have configured the order creation webhook in your Shopify admin settings to point to the URL we provide."
  },
  {
    question: "Can I customize the look of the widget?",
    answer: "Absolutely! Head over to the 'Widget Settings' page. You can customize colors, fonts, positioning, text, and button styles to perfectly match your store's branding."
  },
  {
    question: "How does the billing and commission work?",
    answer: "You are billed monthly for your chosen subscription plan. A separate invoice is generated for any commission due based on sales generated through Gimmie AI. You can manage payment methods and view all invoices in the 'Account & Billing' section."
  },
  {
    question: "What if I need help with a technical issue?",
    answer: "Our AI Assistant can handle many common technical questions. If it can't solve your issue, it will automatically create a support ticket for you. You can also use the contact form here to reach our human support team."
  }
];

export default function Faq() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}