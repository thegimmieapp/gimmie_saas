
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/api/entities';
import { createPageUrl } from '@/utils';
import WelcomeStep from '../components/onboarding/b2c/WelcomeStep';
import ProfileStep from '../components/onboarding/b2c/ProfileStep';
import InterestsStep from '../components/onboarding/b2c/InterestsStep';
import OnboardingStepper from '../components/onboarding/b2c/OnboardingStepper';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        setUserData({
          full_name: currentUser.full_name || '',
          username: currentUser.username || '',
          bio: currentUser.bio || '',
          profile_picture_url: currentUser.profile_picture_url || '',
          user_interests: currentUser.user_interests || [],
        });
      } catch (error) {
        // Not logged in, redirect to home
        window.location.href = createPageUrl('PublicHome');
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdate = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const nextStep = async () => {
    setIsSaving(true);
    try {
      if (step === 2) { // After profile step
        await User.updateMyUserData({ 
          full_name: userData.full_name,
          username: userData.username,
          bio: userData.bio,
          profile_picture_url: userData.profile_picture_url,
        });
      }
      setStep(prev => prev + 1);
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("There was an error saving your profile. Please try again.");
    }
    setIsSaving(false);
  };

  const finishOnboarding = async () => {
    setIsSaving(true);
    try {
      await User.updateMyUserData({
        user_interests: userData.user_interests,
        onboarding_completed: true,
      });
      // Redirect to the new profile page
      window.location.href = createPageUrl(`UserProfile?userId=${user.id}`);
    } catch (error) {
      console.error("Failed to finish onboarding:", error);
      alert("There was an error saving your interests. Please try again.");
    }
    setIsSaving(false);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--gimmie-grey-sky]">
        <Loader2 className="w-12 h-12 animate-spin text-[--gimmie-green]" />
      </div>
    );
  }

  return (
    <div className="bg-[--gimmie-grey-sky] flex flex-grow flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <OnboardingStepper currentStep={step} totalSteps={TOTAL_STEPS} />
        
        <div className="mt-8 bg-white rounded-2xl soft-shadow p-8 sm:p-12 transition-all duration-300">
          {step === 1 && <WelcomeStep user={user} />}
          {step === 2 && <ProfileStep userData={userData} onUpdate={handleUpdate} />}
          {step === 3 && <InterestsStep userData={userData} onUpdate={handleUpdate} />}
        </div>

        <div className="mt-8 flex justify-end">
          {step < TOTAL_STEPS ? (
            <Button onClick={nextStep} disabled={isSaving} size="lg">
              {isSaving ? <Loader2 className="animate-spin" /> : 'Next Step'}
            </Button>
          ) : (
            <Button onClick={finishOnboarding} disabled={isSaving} size="lg">
              {isSaving ? <Loader2 className="animate-spin" /> : 'Finish & View My Profile'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
