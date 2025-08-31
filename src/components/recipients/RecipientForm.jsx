import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

const relationshipOptions = [
  { value: "partner", label: "Partner" },
  { value: "spouse", label: "Spouse" },
  { value: "parent", label: "Parent" },
  { value: "sibling", label: "Sibling" },
  { value: "child", label: "Child" },
  { value: "friend", label: "Friend" },
  { value: "coworker", label: "Coworker" },
  { value: "other", label: "Other" }
];

const budgetOptions = [
  { value: "under-25", label: "Under $25" },
  { value: "25-50", label: "$25 - $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-250", label: "$100 - $250" },
  { value: "250-500", label: "$250 - $500" },
  { value: "500-plus", label: "$500+" }
];

export default function RecipientForm({ profile, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(profile || {
    name: "",
    relationship: "",
    interests: [],
    important_dates: [],
    style_preferences: [],
    budget_range: "",
    notes: "",
    avatar_url: ""
  });

  const [newInterest, setNewInterest] = useState("");
  const [newStylePref, setNewStylePref] = useState("");
  const [newDate, setNewDate] = useState({ date: "", occasion: "", notes: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      });
      setNewInterest("");
    }
  };

  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  const addStylePreference = () => {
    if (newStylePref.trim() && !formData.style_preferences.includes(newStylePref.trim())) {
      setFormData({
        ...formData,
        style_preferences: [...formData.style_preferences, newStylePref.trim()]
      });
      setNewStylePref("");
    }
  };

  const removeStylePreference = (pref) => {
    setFormData({
      ...formData,
      style_preferences: formData.style_preferences.filter(p => p !== pref)
    });
  };

  const addImportantDate = () => {
    if (newDate.date && newDate.occasion) {
      setFormData({
        ...formData,
        important_dates: [...formData.important_dates, newDate]
      });
      setNewDate({ date: "", occasion: "", notes: "" });
    }
  };

  const removeImportantDate = (index) => {
    setFormData({
      ...formData,
      important_dates: formData.important_dates.filter((_, i) => i !== index)
    });
  };

  return (
    <Card className="bg-white soft-shadow border-slate-200/60 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[--gimmie-dark]">
            {profile ? "Edit Recipient" : "Add New Recipient"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Mom, Sarah, My Partner"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Relationship</label>
              <Select 
                value={formData.relationship} 
                onValueChange={(value) => setFormData({ ...formData, relationship: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Interests & Hobbies</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="e.g., cooking, gardening, sci-fi movies"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              />
              <Button type="button" onClick={addInterest} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <Badge key={index} className="bg-[--gimmie-carolina]/20 text-[--gimmie-dark]">
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Style Preferences */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Style Preferences</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newStylePref}
                onChange={(e) => setNewStylePref(e.target.value)}
                placeholder="e.g., minimalist, colorful, vintage"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStylePreference())}
              />
              <Button type="button" onClick={addStylePreference} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.style_preferences.map((pref, index) => (
                <Badge key={index} className="bg-[--gimmie-green]/20 text-[--gimmie-dark]">
                  {pref}
                  <button
                    type="button"
                    onClick={() => removeStylePreference(pref)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Important Dates</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Input
                type="date"
                value={newDate.date}
                onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
              />
              <Input
                value={newDate.occasion}
                onChange={(e) => setNewDate({ ...newDate, occasion: e.target.value })}
                placeholder="Birthday, Anniversary..."
              />
              <Button type="button" onClick={addImportantDate} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.important_dates.map((date, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{date.occasion}</p>
                    <p className="text-sm text-slate-600">{new Date(date.date).toLocaleDateString()}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeImportantDate(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Typical Gift Budget</label>
            <Select 
              value={formData.budget_range} 
              onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Additional Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any other details that would help find perfect gifts..."
              className="h-20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] hover:from-[--gimmie-carolina] hover:to-[--gimmie-green]"
            >
              {profile ? "Update Profile" : "Create Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}