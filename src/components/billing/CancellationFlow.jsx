import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle, LogOut } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function CancellationFlow({ subscription, store }) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancellation = async () => {
    setIsCancelling(true);
    alert("Subscription has been cancelled.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    window.location.reload();
  };

  return (
    <Card className="border-red-300 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-red-900">Cancel Subscription</p>
            <p className="text-sm text-red-700">This will remove Gimmie AI from your store and stop all billing.</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Cancel Plan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to cancel?</DialogTitle>
                <DialogDescription>
                  Your plan will remain active until the end of your current billing period. All your data and settings will be saved if you decide to return.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <label className="text-sm font-medium">Why are you leaving? (Optional)</label>
                <Textarea placeholder="Your feedback helps us improve..." />
              </div>
              <DialogFooter>
                <Button variant="destructive" onClick={handleCancellation} disabled={isCancelling}>
                  {isCancelling ? "Cancelling..." : "Confirm Cancellation"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}