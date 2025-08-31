import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard,
  Plus,
  Trash2,
  CheckCircle
} from "lucide-react";

export default function PaymentMethods({ paymentMethods, onPaymentMethodUpdate }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewMethod = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    // In real app, integrate with Stripe Elements for secure card input
    alert("New payment method added (simulated).");
    onPaymentMethodUpdate?.();
    setIsAdding(false);
  };

  const handleDeleteMethod = (methodId) => {
    if (confirm("Are you sure you want to remove this payment method?")) {
      alert(`Payment method ${methodId} removed (simulated).`);
      onPaymentMethodUpdate?.();
    }
  };

  const handleSetDefault = (methodId) => {
    alert(`Payment method ${methodId} set as default (simulated).`);
    onPaymentMethodUpdate?.();
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Payment Methods
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Payment Method</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNewMethod} className="space-y-4">
              {/* This is a simplified form. A real app MUST use Stripe Elements */}
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="•••• •••• •••• 4242" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiry-month">Exp. Month</Label>
                  <Input id="expiry-month" placeholder="MM" />
                </div>
                <div>
                  <Label htmlFor="expiry-year">Exp. Year</Label>
                  <Input id="expiry-year" placeholder="YYYY" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="•••" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? "Saving..." : "Save Card"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-3">
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-slate-500" />
                <div>
                  <p className="font-medium text-slate-900">{method.brand} ending in {method.last_four}</p>
                  <p className="text-sm text-slate-500">Expires {method.exp_month}/{method.exp_year}</p>
                </div>
                {method.is_default && (
                  <Badge className="bg-emerald-100 text-emerald-800">Default</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!method.is_default && (
                  <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)}>
                    Set as Default
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteMethod(method.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>No payment methods on file.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}