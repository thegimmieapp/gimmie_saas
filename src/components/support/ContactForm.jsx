
import React, { useState, useEffect, useRef } from "react";
import { User } from "@/api/entities";
import { SendEmail } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, Clock } from "lucide-react";

export default function ContactForm() {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false); // New state for rate limiting

  // Refs for rate limiting - persist across renders without causing re-renders
  const lastSubmissionTime = useRef(0);
  const submissionCount = useRef(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error); // Log error during user fetch
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation: ensure fields are not just whitespace
    if (!subject.trim() || !message.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    // Client-side Rate limiting: max 5 submissions per hour for authenticated users
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // One hour in milliseconds

    // If within the same hour window, increment count
    if (now - lastSubmissionTime.current < oneHour) {
      submissionCount.current += 1;
      if (submissionCount.current > 5) {
        setRateLimitExceeded(true);
        // Reset rate limit exceeded state after the hour passes
        setTimeout(() => setRateLimitExceeded(false), oneHour);
        alert("You've sent several support requests recently. Please wait before sending another message.");
        return; // Stop submission
      }
    } else {
      // If a new hour window, reset count to 1
      submissionCount.current = 1;
    }
    lastSubmissionTime.current = now; // Update last submission time

    // Content validation: message length
    if (message.length < 10) {
      alert("Please provide a more detailed message (at least 10 characters).");
      return;
    }

    setIsSending(true);
    try {
      // Sanitize inputs to prevent injection attacks (e.g., XSS)
      // Trim whitespace, limit length, and remove angle brackets (< and >)
      const sanitizedSubject = subject.trim().slice(0, 200).replace(/[<>]/g, '');
      const sanitizedMessage = message.trim().slice(0, 2000).replace(/[<>]/g, '');

      await SendEmail({
        to: "support@gimmie.ai",
        // Use optional chaining for user properties and provide fallback values
        from_name: `Gimmie Support Request from ${user?.full_name || 'Unknown User'}`,
        subject: `[Support Ticket] ${sanitizedSubject} - ${user?.email || 'no-email'}`,
        body: `A new support request has been submitted:

Email: ${user?.email || 'Unknown'}
Store: sample-store.myshopify.com
User ID: ${user?.id || 'Unknown'}

Message:
${sanitizedMessage}

Timestamp: ${new Date().toISOString()}`, // Include timestamp for logging/tracking
      });
      alert("Your message has been sent successfully! Our team will get back to you shortly.");
      setMessage("");
      setSubject("");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("There was an error sending your message. Please try again later.");
    }
    setIsSending(false);
  };

  // Conditional rendering for rate limit exceeded state
  if (rateLimitExceeded) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
        <CardContent className="p-8 text-center">
          <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" /> {/* Use Clock icon for visual cue */}
          <h3 className="text-lg font-semibold mb-2">Rate limit reached</h3>
          <p className="text-slate-600">
            You've sent several support requests recently. Please wait before sending another message.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle>Contact Support</CardTitle>
        <CardDescription>
          Have a question or need help? Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={user?.full_name || ""} disabled />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={user?.email || ""} disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select onValueChange={setSubject} value={subject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a topic..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Billing Issue">Billing & Subscription</SelectItem>
                <SelectItem value="Technical Problem">Technical Problem</SelectItem>
                <SelectItem value="Widget Customization">Widget Customization Help</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
                <SelectItem value="General Question">General Question</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please describe your issue or question in detail..."
              className="h-40"
              value={message}
              // Limit input to 2000 characters directly in the onChange handler
              onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
              required
              minLength="10" // HTML5 minLength attribute for client-side validation
              maxLength="2000" // HTML5 maxLength attribute
            />
            {/* Character counter for the message */}
            <div className="text-xs text-slate-500 mt-1">
              {message.length}/2000 characters
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSending || rateLimitExceeded}> {/* Disable button if rate limited */}
              {isSending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
