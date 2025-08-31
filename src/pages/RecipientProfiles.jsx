import React, { useState, useEffect } from 'react';
import { User, RecipientProfile } from '@/api/entities';
import { Plus, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecipientCard from '../components/recipients/RecipientCard';
import RecipientForm from '../components/recipients/RecipientForm';
import { createPageUrl } from '@/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function RecipientProfilesPage() {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        const fetchedProfiles = await RecipientProfile.list();
        setProfiles(fetchedProfiles);
      } catch (error) {
        // Not logged in, handled by the UI
        setUser(null);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleFormSubmit = async (profileData) => {
    if (editingProfile) {
      await RecipientProfile.update(editingProfile.id, profileData);
    } else {
      await RecipientProfile.create(profileData);
    }
    const updatedProfiles = await RecipientProfile.list();
    setProfiles(updatedProfiles);
    setIsFormOpen(false);
    setEditingProfile(null);
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  const handleDelete = async (profileId) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      await RecipientProfile.delete(profileId);
      setProfiles(profiles.filter(p => p.id !== profileId));
    }
  };

  const handleSignIn = () => {
    User.loginWithRedirect(window.location.href);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[--gimmie-carolina]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <Users className="w-24 h-24 mx-auto text-slate-300 mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Manage Your Recipients</h1>
          <p className="text-slate-600 text-lg mb-8">
            Please sign in to create and manage profiles for the people you shop for. This helps us give you better gift recommendations!
          </p>
          <Button onClick={handleSignIn} size="lg" className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90">
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[--gimmie-grey-sky] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Recipient Profiles</h1>
            <p className="text-slate-600 mt-1">
              Add profiles for the people you shop for to get personalized gift ideas.
            </p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProfile(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProfile ? 'Edit Profile' : 'Add New Profile'}</DialogTitle>
                <DialogDescription>
                  The more details you add, the better our gift recommendations will be.
                </DialogDescription>
              </DialogHeader>
              <RecipientForm 
                profile={editingProfile} 
                onSubmit={handleFormSubmit}
                onCancel={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map(profile => (
              <RecipientCard 
                key={profile.id} 
                profile={profile} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl">
            <Users className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-800">No recipient profiles yet</h3>
            <p className="text-slate-500 mt-2 mb-6">
              Add a profile to start getting personalized gift recommendations.
            </p>
            <Button onClick={() => { setEditingProfile(null); setIsFormOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}