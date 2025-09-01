import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FeedbackForm from "./FeedbackForm";
import { Star } from "lucide-react";

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastPopupTime = localStorage.getItem("gimmie_feedback_popup_time");
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (!lastPopupTime || (now - parseInt(lastPopupTime, 10)) > twentyFourHours) {
      // Use a timeout to avoid being too intrusive on page load
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("gimmie_feedback_popup_time", now.toString());
      }, 3000); // Wait 3 seconds before showing
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl">How are we doing?</DialogTitle>
            <DialogDescription className="text-lg">
              Your feedback helps us improve Gimmie AI for everyone.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="pt-4">
          <FeedbackForm 
            pageContext="Dashboard Popup" 
            showHeader={false} 
            onSubmitted={handleClose} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}