import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Store, Bell, Save } from "lucide-react";

export default function AccountSettings({ user, store, onAccountUpdate }) {
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) setFullName(user.full_name);
    if (store) setStoreName(store.store_name);
  }, [user, store]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // In real app, call User.updateMyUserData and Store.update
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert("Account settings saved!");
    onAccountUpdate?.();
    setIsSaving(false);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-slate-600" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" value={user?.email || ""} disabled />
          </div>
          <div>
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="shop-domain">Shopify Domain</Label>
            <Input id="shop-domain" value={store?.shop_domain || ""} disabled />
          </div>
        </div>
        
        <div className="space-y-4 pt-6 border-t">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-600" />
            <h4 className="font-semibold text-slate-900">Notification Preferences</h4>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
            <div>
              <p className="font-medium text-slate-800">Weekly Performance Reports</p>
              <p className="text-sm text-slate-600">Receive a summary of your analytics via email.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
            <div>
              <p className="font-medium text-slate-800">Billing Alerts</p>
              <p className="text-sm text-slate-600">Get notified about upcoming payments and invoices.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}