import React, { useState } from "react";
import { Feedback } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, ThumbsUp, Lock, Megaphone } from "lucide-react";

export default function FeedbackForm({ pageContext, showHeader = true, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [privateFeedback, setPrivateFeedback] = useState("");
  const [publicReview, setPublicReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      await Feedback.create({
        rating,
        private_feedback: privateFeedback,
        public_review: publicReview,
        page_context: pageContext,
      });
      setIsSubmitted(true);
      if (onSubmitted) {
        // Delay closing to allow user to see success message
        setTimeout(onSubmitted, 2000);
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto">
          <ThumbsUp className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you for your feedback!</h3>
        <p className="text-slate-600">
          We appreciate you taking the time to help us improve.
        </p>
      </div>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      {showHeader && (
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Share Your Feedback
            </CardTitle>
            <CardDescription>
                How has your experience been? Let us know what you think!
            </CardDescription>
        </CardHeader>
      )}
      <CardContent className={showHeader ? "" : "pt-6"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-800 mb-2 block">Your Overall Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                    (hoverRating || rating) >= star
                      ? "text-amber-400 fill-amber-400"
                      : "text-slate-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="private-feedback" className="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                Private Feedback (Optional)
              </label>
              <Textarea
                id="private-feedback"
                placeholder="Share your thoughts directly with the Gimmie AI team. This will not be shared publicly."
                className="h-24"
                value={privateFeedback}
                onChange={(e) => setPrivateFeedback(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="public-review" className="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-slate-500" />
                Public Review (Optional)
              </label>
              <Textarea
                id="public-review"
                placeholder="If you're happy with our service, consider leaving a public review we can share."
                className="h-24"
                value={publicReview}
                onChange={(e) => setPublicReview(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || rating === 0}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}