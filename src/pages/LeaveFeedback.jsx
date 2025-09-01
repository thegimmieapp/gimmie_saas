import React from "react";
import FeedbackForm from "../components/feedback/FeedbackForm";
import { Star } from "lucide-react";

export default function LeaveFeedbackPage() {
  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Leave a Review</h1>
          <p className="text-slate-600 text-lg">
            Your feedback helps us improve Gimmie AI for everyone.
          </p>
        </div>

        {/* Feedback Form */}
        <FeedbackForm pageContext="Feedback Page" showHeader={false} />

      </div>
    </div>
  );
}