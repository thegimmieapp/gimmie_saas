import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload } from 'lucide-react';
import { User } from '@/api/entities';

export default function ProfileSettingsModal({ isOpen, onClose, user, onUpdate }) {
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    bio: user?.bio || '',
    user_interests: user?.user_interests || [],
    is_profile_public: user?.is_profile_public || false,
    profile_picture_url: user?.profile_picture_url || ''
  });
  const [newInterest, setNewInterest] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const addInterest = () => {
    if (newInterest.trim() && !formData.user_interests.includes(newInterest.trim())) {
      setFormData({
        ...formData,
        user_interests: [...formData.user_interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      user_interests: formData.user_interests.filter(i => i !== interest)
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await User.updateMyUserData(formData);
      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
    setIsSaving(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Full Name</label>
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your display name"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Bio</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell others about your interests and what kind of gifts you love..."
                className="h-20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Profile Picture URL</label>
              <div className="flex gap-2">
                <Input
                  value={formData.profile_picture_url}
                  onChange={(e) => setFormData({ ...formData, profile_picture_url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
                <Button variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Interests</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="e.g., Design, Travel, Coffee"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              />
              <Button type="button" onClick={addInterest} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.user_interests.map((interest, index) => (
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

          {/* Privacy Setting */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h3 className="font-medium text-slate-900">Public Profile</h3>
              <p className="text-sm text-slate-600">Allow others to discover and view your profile</p>
            </div>
            <Switch
              checked={formData.is_profile_public}
              onCheckedChange={(checked) => setFormData({ ...formData, is_profile_public: checked })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}