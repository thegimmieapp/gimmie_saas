import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Gift, Search, Heart } from "lucide-react";

const faqCategories = [
  {
    title: "Getting Started",
    icon: Gift,
    questions: [
      {
        question: "How does Gimmie AI work?",
        answer: "Gimmie AI uses advanced artificial intelligence to understand your gift-giving needs. Simply describe who you're shopping for, the occasion, and your budget, and we'll provide personalized recommendations from thousands of products across the web."
      },
      {
        question: "Is Gimmie free to use?",
        answer: "Yes! Gimmie is completely free for consumers. We make money by earning small commissions when you purchase recommended products, but this never affects the price you pay."
      },
      {
        question: "How accurate are your recommendations?",
        answer: "Our AI is trained on millions of successful gift-giving scenarios and customer reviews. We continuously improve our recommendations based on user feedback and purchase patterns to ensure high accuracy."
      }
    ]
  },
  {
    title: "Gift Recommendations", 
    icon: Search,
    questions: [
      {
        question: "Can I get recommendations for any budget?",
        answer: "Absolutely! Whether you're looking to spend $10 or $1000+, our AI will find great options within your budget. Just specify your price range when you search."
      },
      {
        question: "Do you have recommendations for all occasions?",
        answer: "Yes, we cover all major gift-giving occasions including birthdays, holidays, weddings, graduations, anniversaries, housewarming parties, and more. We also help with 'just because' gifts!"
      },
      {
        question: "What if I don't like the recommendations?",
        answer: "You can always refine your search by providing more specific details about the recipient's interests, hobbies, or preferences. The more information you give us, the better our recommendations become."
      }
    ]
  },
  {
    title: "Shopping & Purchasing",
    icon: Heart,
    questions: [
      {
        question: "Where do I actually buy the recommended products?",
        answer: "We partner with major retailers like Amazon, Target, Etsy, and many others. When you click on a recommendation, you'll be taken directly to the retailer's website to complete your purchase."
      },
      {
        question: "Are the prices shown accurate?",
        answer: "We strive to show the most current prices, but prices can change frequently. The final price will always be confirmed on the retailer's website before you complete your purchase."
      },
      {
        question: "What if something goes wrong with my order?",
        answer: "Since you purchase directly from the retailer, any issues with shipping, returns, or customer service should be handled through them. However, if you need help finding their contact information, we're happy to assist!"
      }
    ]
  }
];

export default function PublicFaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[--gimmie-grey-sky] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-[--gimmie-green] to-[--gimmie-carolina] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[--gimmie-dark] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about finding the perfect gifts with Gimmie AI.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm shadow-lg border-slate-200/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-[--gimmie-green]/10 rounded-xl flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-[--gimmie-green]" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem value={`${categoryIndex}-${index}`} key={index}>
                      <AccordionTrigger className="hover:bg-slate-50 px-4 rounded-lg">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 text-slate-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] text-white border-0 shadow-xl">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg opacity-90 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-2">
                📧 Email: support@gimmie.ai
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-2">
                📞 Phone: (512) 987-7094
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}