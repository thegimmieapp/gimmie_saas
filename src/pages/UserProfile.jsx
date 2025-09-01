import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, WishlistItem, Product } from '@/api/entities';
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, AlertTriangle } from 'lucide-react';
import ProfileHeader from '../components/profile/ProfileHeader';
import SavedItemsGrid from '../components/profile/SavedItemsGrid';

export default function UserProfilePage() {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const loggedInUser = await User.me();
        const viewingOwnProfile = loggedInUser.id === userId;
        setIsOwnProfile(viewingOwnProfile);

        let userToView;
        if (viewingOwnProfile) {
          userToView = loggedInUser;
        } else {
          // Correctly fetch user by ID using filter method
          const userResults = await User.filter({ id: userId });
          userToView = userResults[0] || null;
        }

        if (!userToView) {
          setError("User not found");
          return;
        }

        // Ensure user has basic profile data for demo
        if (!userToView.bio) {
          userToView.bio = "Gift enthusiast and curator of beautiful things";
        }
        if (!userToView.user_interests || userToView.user_interests.length === 0) {
          userToView.user_interests = ["Design", "Travel", "Food"];
        }
        if (!userToView.profile_picture_url) {
          userToView.profile_picture_url = "https://images.unsplash.com/photo-1494790108755-2616b612b412?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80";
        }

        if (!userToView.is_profile_public && !viewingOwnProfile) {
          setError("This profile is private.");
          setProfileUser(userToView);
        } else {
          setProfileUser(userToView);
          
          // Load saved items using correct Base44 filter method
          try {
            const wishlist = await WishlistItem.filter({ user_id: userId, item_type: "product" });
            
            if (wishlist.length > 0) {
              // Fetch real products using correct filter method
              const productPromises = wishlist.map(async item => {
                const productResults = await Product.filter({ id: item.item_id });
                return productResults[0] || null;
              });
              const products = await Promise.all(productPromises);
              setSavedItems(products.filter(p => p));
            } else {
              // Create sample saved items for demo
              setSavedItems([
                {
                  id: "sample-1",
                  title: "Artisan Coffee Set",
                  price: 89.99,
                  vendor: "Local Roasters",
                  image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  id: "sample-2", 
                  title: "Minimalist Ceramic Vase",
                  price: 45.00,
                  vendor: "Studio Craft",
                  image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  id: "sample-3",
                  title: "Leather Travel Journal",
                  price: 32.50,
                  vendor: "Artisan Goods",
                  image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  id: "sample-4",
                  title: "Wireless Charging Pad",
                  price: 65.00,
                  vendor: "Tech Essentials",
                  image_url: "https://images.unsplash.com/photo-1609592094807-e7313fb6a859?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                }
              ]);
            }
          } catch (e) {
            console.error("Error loading saved items:", e);
            setSavedItems([]);
          }
        }
      } catch (e) {
        console.error("Failed to load profile:", e);
        setError("Could not find this user's profile.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadProfileData();
    }
  }, [userId]);

  const handleProfileUpdate = (updatedData) => {
    setProfileUser(prev => ({ ...prev, ...updatedData }));
  };

  if (isLoading) {
    return (
      <div className="bg-[--gimmie-grey-sky] min-h-screen">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <Skeleton className="h-40 w-full mb-8 rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-48 w-full mb-4 rounded-2xl" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[--gimmie-grey-sky] min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
        <ProfileHeader 
          user={profileUser} 
          itemCount={savedItems.length}
          isOwnProfile={isOwnProfile} 
          onUpdate={handleProfileUpdate}
        />
        
        {error ? (
          <div className="text-center py-20 bg-white rounded-2xl soft-shadow">
            {error === "This profile is private." ? (
              <>
                <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-700">This Profile is Private</h2>
                <p className="text-slate-500">
                  {profileUser?.full_name || 'This user'} has chosen to keep their profile private.
                </p>
              </>
            ) : (
              <>
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-700">Profile Not Found</h2>
                <p className="text-slate-500">We couldn't seem to find the profile you're looking for.</p>
              </>
            )}
          </div>
        ) : (
          <SavedItemsGrid items={savedItems} />
        )}
      </div>
    </div>
  );
}