import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Share2, User } from 'lucide-react';
import ProfileSettingsModal from './ProfileSettingsModal';

export default function ProfileHeader({ user, itemCount, isOwnProfile, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied to clipboard!");
  };

  if (!user) return null;

  return (
    <>
      <div className="bg-white rounded-2xl soft-shadow p-8">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            {user.profile_picture_url ? (
              <img 
                src={user.profile_picture_url} 
                alt={user.full_name}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-[--gimmie-grey-sky] to-slate-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <User className="w-16 h-16 text-slate-400" />
              </div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-[--gimmie-dark]">{user.full_name}</h1>
            <p className="text-slate-600 mt-2">{user.bio || "Lover of thoughtful gifts and special moments."}</p>
            
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              {(user.user_interests || ['Design', 'Travel', 'Foodie']).map((interest) => (
                <Badge key={interest} className="bg-[--gimmie-carolina]/20 text-[--gimmie-dark] border-0 gentle-hover">
                  {interest}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-6 mt-6 justify-center sm:justify-start">
              <div className="text-center">
                <div className="font-bold text-lg">{itemCount}</div>
                <div className="text-sm text-slate-500">Saved</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">1.2k</div>
                <div className="text-sm text-slate-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">340</div>
                <div className="text-sm text-slate-500">Following</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 self-start mt-4 sm:mt-0">
            {isOwnProfile ? (
              <Button onClick={() => setIsModalOpen(true)} className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90">
                Follow
              </Button>
            )}
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      {isOwnProfile && (
        <ProfileSettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={user}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}