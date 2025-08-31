import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, Upload } from 'lucide-react';
import { UploadFile } from '@/api/integrations';

export default function ProfileStep({ userData, onUpdate }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      onUpdate({ profile_picture_url: file_url });
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-light text-[--gimmie-dark] mb-4">
          Set up your profile
        </h2>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          This information will help others discover your gift preferences and connect with you.
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 mx-auto mb-4">
              {userData.profile_picture_url ? (
                <img 
                  src={userData.profile_picture_url} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-slate-400" />
                </div>
              )}
            </div>
            <label htmlFor="profile-upload" className="absolute -bottom-2 -right-2 bg-[--gimmie-green] text-white rounded-full p-2 cursor-pointer hover:bg-[--gimmie-green]/90 transition-colors">
              <Upload className="w-4 h-4" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
          </div>
          {isUploading && <p className="text-sm text-slate-500">Uploading...</p>}
        </div>

        {/* Display Name */}
        <div>
          <Label htmlFor="full_name">Display Name</Label>
          <Input
            id="full_name"
            value={userData.full_name || ''}
            onChange={(e) => onUpdate({ full_name: e.target.value })}
            placeholder="How should people know you?"
            className="mt-1"
          />
        </div>

        {/* Username */}
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={userData.username || ''}
            onChange={(e) => onUpdate({ username: e.target.value })}
            placeholder="@yourusername"
            className="mt-1"
          />
          <p className="text-sm text-slate-500 mt-1">
            This will be part of your profile URL: gimmie.ai/@{userData.username || 'yourusername'}
          </p>
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio">Bio (Optional)</Label>
          <Textarea
            id="bio"
            value={userData.bio || ''}
            onChange={(e) => onUpdate({ bio: e.target.value })}
            placeholder="Tell people a bit about yourself and your gift preferences..."
            rows={3}
            className="mt-1"
          />
          <p className="text-sm text-slate-500 mt-1">
            {userData.bio?.length || 0}/200 characters
          </p>
        </div>
      </div>
    </div>
  );
}