import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit3, 
  Trash2, 
  Heart, 
  Calendar, 
  DollarSign,
  User
} from "lucide-react";
import { format } from "date-fns";

const relationshipEmojis = {
  partner: "💕",
  spouse: "💍", 
  parent: "👨‍👩‍👧‍👦",
  sibling: "👫",
  child: "🧒",
  friend: "👯",
  coworker: "🏢",
  other: "👤"
};

const budgetLabels = {
  "under-25": "Under $25",
  "25-50": "$25 - $50", 
  "50-100": "$50 - $100",
  "100-250": "$100 - $250",
  "250-500": "$250 - $500",
  "500-plus": "$500+"
};

export default function RecipientCard({ profile, onEdit, onDelete }) {
  const upcomingDate = profile.important_dates?.find(date => {
    const dateObj = new Date(date.date);
    const now = new Date();
    const nextOccurrence = new Date(now.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    if (nextOccurrence < now) {
      nextOccurrence.setFullYear(now.getFullYear() + 1);
    }
    return nextOccurrence.getTime() - now.getTime() < 30 * 24 * 60 * 60 * 1000; // Within 30 days
  });

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 soft-shadow hover:shadow-lg transition-all duration-300 gentle-hover">
      <CardContent className="p-6">
        
        {/* Profile Header */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[--gimmie-carolina] to-[--gimmie-green] rounded-full flex items-center justify-center mx-auto mb-3">
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-2xl">
                {relationshipEmojis[profile.relationship] || "👤"}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-[--gimmie-dark] text-lg">{profile.name}</h3>
          <p className="text-sm text-slate-600 capitalize">
            {profile.relationship || "Other"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3 mb-4">
          {profile.interests?.length > 0 && (
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500 flex-shrink-0" />
              <div className="flex flex-wrap gap-1 overflow-hidden">
                {profile.interests.slice(0, 2).map((interest, index) => (
                  <Badge key={index} className="bg-pink-100 text-pink-800 text-xs">
                    {interest}
                  </Badge>
                ))}
                {profile.interests.length > 2 && (
                  <Badge className="bg-slate-100 text-slate-600 text-xs">
                    +{profile.interests.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {upcomingDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-medium text-green-700">{upcomingDate.occasion}</span>
                <span className="text-slate-600 ml-1">
                  {format(new Date(upcomingDate.date), "MMM d")}
                </span>
              </div>
            </div>
          )}

          {profile.budget_range && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-sm text-slate-600">
                {budgetLabels[profile.budget_range]}
              </span>
            </div>
          )}
        </div>

        {/* Notes Preview */}
        {profile.notes && (
          <div className="bg-slate-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-slate-600 line-clamp-2">
              {profile.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(profile)}
            className="flex-1 border-slate-300 hover:bg-slate-50"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(profile)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}