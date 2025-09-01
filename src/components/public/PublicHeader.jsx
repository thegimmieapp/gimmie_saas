
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  X, 
  User as UserIcon, 
  Heart,
  LogOut,
  ChevronDown,
  Building
} from 'lucide-react';

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      if (currentUser && !currentUser.onboarding_completed) {
        // Redirect to onboarding if they haven't finished it
        window.location.href = createPageUrl('Onboarding');
      }
    } catch (error) {
      // User not logged in - this is fine for anonymous usage
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    try {
      await User.logout();
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const handleSignIn = () => {
    // Use the correct login method
    User.login();
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to={createPageUrl('PublicHome')} className="flex items-center hover:opacity-80 transition-opacity">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8f4c59034_green.png" alt="Gimmie AI" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to={createPageUrl('PublicCategory?category=All')} className="text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors">
              Gift Guides
            </Link>
            <Link to={createPageUrl('PublicCategory?category=For Her')} className="text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors">
              For Her
            </Link>
            <Link to={createPageUrl('PublicCategory?category=For Him')} className="text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors">
              For Him
            </Link>
            <Link to={createPageUrl('PublicCategory?category=Tech')} className="text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors">
              Tech
            </Link>
            <Link to={createPageUrl('PublicFaq')} className="text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Auth Section & Retailer Link */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to={createPageUrl('Landing')}>
              <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-[--gimmie-green] hover:bg-[--gimmie-grey-sky]">
                <Building className="w-4 h-4" />
                For Retailers
              </Button>
            </Link>

            {!isLoading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 hover:bg-[--gimmie-grey-sky]">
                        <div className="w-8 h-8 rounded-full bg-[--gimmie-green] flex items-center justify-center text-white text-sm font-semibold">
                          {user.profile_picture_url ? (
                            <img src={user.profile_picture_url} alt=" " className="w-full h-full object-cover rounded-full" />
                          ) : (
                            user.full_name?.[0] || user.email[0].toUpperCase()
                          )}
                        </div>
                        <span className="hidden sm:block">{user.full_name?.split(' ')[0] || 'Profile'}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl(`UserProfile?userId=${user.id}`)} className="flex items-center gap-2">
                          <UserIcon className="w-4 h-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl('RecipientProfiles')} className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          My Recipients
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-1 md:gap-3">
                    <Button 
                      variant="ghost" 
                      onClick={handleSignIn}
                      className="text-slate-600 hover:text-[--gimmie-green] hover:bg-[--gimmie-grey-sky]"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={handleSignIn}
                      className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white hidden sm:flex"
                    >
                      Sign Up Free
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-4">
            <Link 
              to={createPageUrl('PublicCategory?category=All')} 
              className="block text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gift Guides
            </Link>
            <Link 
              to={createPageUrl('PublicCategory?category=For Her')} 
              className="block text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Her
            </Link>
            <Link 
              to={createPageUrl('PublicCategory?category=For Him')} 
              className="block text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Him
            </Link>
            <Link 
              to={createPageUrl('PublicCategory?category=Tech')} 
              className="block text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tech
            </Link>
            <Link 
              to={createPageUrl('PublicFaq')} 
              className="block text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>

            <div className="pt-4 border-t border-slate-200">
                <Link 
                  to={createPageUrl('Landing')} 
                  className="block text-slate-600 hover:text-[--gimmie-green] font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Retailers
                </Link>
            </div>
            
            {!user && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <Button 
                  variant="outline" 
                  onClick={handleSignIn}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleSignIn}
                  className="w-full bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white"
                >
                  Sign Up Free
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
