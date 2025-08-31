import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, X, Heart, Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WidgetPreview({ config }) {
  const [showModal, setShowModal] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6", 
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6"
  };

  const animationClasses = {
    "none": "",
    "pulse": "animate-pulse",
    "bounce": "animate-bounce",
    "glow": "shadow-lg shadow-current/50"
  };

  const sampleProducts = [
    {
      id: 1,
      title: "Wireless Noise-Cancelling Headphones",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      match: 95
    },
    {
      id: 2, 
      title: "Smart Fitness Watch",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      match: 88
    },
    {
      id: 3,
      title: "Premium Coffee Maker",
      price: "$149.99", 
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
      match: 82
    }
  ];

  return (
    <div className="relative">
      {/* Mock Store Layout */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-8 min-h-[500px] relative overflow-hidden">
        
        {/* Mock Header */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
              <div>
                <div className="h-4 bg-slate-300 rounded w-32 mb-1"></div>
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-slate-200 rounded"></div>
              <div className="w-8 h-8 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Mock Content */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-slate-200 rounded h-32 mb-3"></div>
              <div className="h-3 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-300 rounded w-16"></div>
            </div>
          ))}
        </div>

        {/* Gimmie Widget Button */}
        <div className={`fixed ${positionClasses[config.position]} z-50`}>
          <Button
            onClick={() => setShowModal(true)}
            className={`${animationClasses[config.animation_type]} shadow-2xl hover:scale-105 transition-all duration-300`}
            style={{
              backgroundColor: config.button_bg_color,
              color: config.button_text_color,
              fontFamily: config.font_family,
              borderRadius: config.button_style === "rounded" ? "9999px" : "8px"
            }}
          >
            <Gift className="w-5 h-5 mr-2" />
            {config.custom_text}
          </Button>
        </div>

        {/* Modal Overlay */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div 
                className="p-6 border-b flex items-center justify-between"
                style={{ 
                  backgroundColor: config.modal_bg_color,
                  color: config.modal_text_color 
                }}
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold" style={{ fontFamily: config.font_family }}>
                    Perfect Gift Recommendations
                  </h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowModal(false)}
                  style={{ color: config.modal_text_color }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <CardContent 
                className="p-6"
                style={{ 
                  backgroundColor: config.modal_bg_color,
                  color: config.modal_text_color,
                  fontFamily: config.font_family 
                }}
              >
                <div className="mb-6">
                  <p className="text-lg mb-4">Based on your preferences, here are our top recommendations:</p>
                </div>

                <div className="space-y-4">
                  {sampleProducts.map(product => (
                    <div key={product.id} className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{product.title}</h4>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-emerald-600">{product.price}</span>
                          <Badge className="bg-emerald-100 text-emerald-800">
                            <Heart className="w-3 h-3 mr-1" />
                            {product.match}% match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>4.8 (245 reviews)</span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        className="self-start bg-emerald-600 hover:bg-emerald-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-sm text-slate-500">
                    Powered by <strong>Gimmie AI</strong> - Personalized gift discovery
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          👆 This is how your widget will appear on your store. Click the button to see the gift recommendation modal in action!
        </p>
      </div>
    </div>
  );
}