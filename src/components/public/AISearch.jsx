
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Mic, SlidersHorizontal, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { User } from '@/api/entities';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPageUrl } from '@/utils';

export default function AISearch() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('');
  const [retailer, setRetailer] = useState('');
  const [user, setUser] = useState(null);
  const [searchesRemaining, setSearchesRemaining] = useState(5);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    checkUserAndSearchLimit();
  }, []);

  const checkUserAndSearchLimit = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      // Signed in users have unlimited searches
      setSearchesRemaining(999);
    } catch (error) {
      // Anonymous user - check localStorage for search count
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
      const storedData = localStorage.getItem('gimmie_search_data');
      
      if (storedData) {
        const { month, count } = JSON.parse(storedData);
        if (month === currentMonth) {
          setSearchesRemaining(Math.max(0, 5 - count));
        } else {
          // New month, reset count
          localStorage.setItem('gimmie_search_data', JSON.stringify({ month: currentMonth, count: 0 }));
          setSearchesRemaining(5);
        }
      } else {
        // First time user
        localStorage.setItem('gimmie_search_data', JSON.stringify({ month: currentMonth, count: 0 }));
        setSearchesRemaining(5);
      }
    }
  };

  const handleSearch = () => {
    if (!query) return;
    
    if (!user && searchesRemaining <= 0) {
      setShowLimitModal(true);
      return;
    }

    // For anonymous users, increment search count
    if (!user) {
      const currentMonth = new Date().toISOString().slice(0, 7);
      const storedData = localStorage.getItem('gimmie_search_data');
      const { count } = JSON.parse(storedData);
      const newCount = count + 1;
      
      localStorage.setItem('gimmie_search_data', JSON.stringify({ 
        month: currentMonth, 
        count: newCount 
      }));
      setSearchesRemaining(Math.max(0, 5 - newCount));
    }

    // Simulate search (in real app, this would trigger actual search)
    alert(`Searching for: ${query} ${priceRange ? `| Price: ${priceRange}` : ''} ${retailer ? `| Retailer: ${retailer}` : ''}`);
  };

  const handleVoiceSearch = () => {
    if (!user && searchesRemaining <= 0) {
      setShowLimitModal(true);
      return;
    }
    alert("Voice search coming soon!");
  };

  const handleSignUp = () => {
    User.login();
  };

  const popularRetailers = [
    "All Retailers",
    "Amazon", 
    "Target",
    "Best Buy",
    "Walmart",
    "Etsy",
    "Nordstrom",
    "Williams Sonoma",
    "REI",
    "Sephora"
  ];

  const priceRanges = [
    "Any Budget",
    "Under $25",
    "$25 - $50", 
    "$50 - $100",
    "$100 - $250",
    "$250 - $500",
    "$500+"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-white soft-shadow border border-slate-200/60 overflow-hidden rounded-2xl">
        {/* Search Limit Warning for Anonymous Users */}
        {!user && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-4 py-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-amber-800">
                {searchesRemaining > 0 ? (
                  <>🔍 {searchesRemaining} free searches remaining this month</>
                ) : (
                  <>🔒 Free search limit reached</>
                )}
              </span>
              {searchesRemaining <= 2 && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleSignUp}
                  className="text-xs border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  Sign up for unlimited
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Main Search Bar */}
        <div className="flex items-center p-3">
          <Input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              !user && searchesRemaining <= 0 
                ? "Sign up for unlimited searches..." 
                : "Tell us about who you're shopping for..."
            }
            className="flex-1 border-0 text-lg px-6 py-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-500 bg-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            disabled={!user && searchesRemaining <= 0}
          />
          <TooltipProvider>
            <div className="flex items-center gap-2 pr-2">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost" 
                    className="text-[--gimmie-carolina] hover:text-[--gimmie-green] hover:bg-[--gimmie-grey-sky] rounded-full" 
                    onClick={() => setShowFilters(!showFilters)}
                    disabled={!user && searchesRemaining <= 0}
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show search filters</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost" 
                    className="text-[--gimmie-carolina] hover:text-[--gimmie-green] hover:bg-[--gimmie-grey-sky] rounded-full" 
                    onClick={handleVoiceSearch}
                    disabled={!user && searchesRemaining <= 0}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search with your voice</p>
                </TooltipContent>
              </Tooltip>
              <Button 
                type="button" 
                className={`px-6 py-3 font-medium rounded-full gentle-hover gap-2 ${
                  !user && searchesRemaining <= 0
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] hover:from-[--gimmie-carolina] hover:to-[--gimmie-green] text-white'
                }`}
                onClick={handleSearch}
                disabled={!user && searchesRemaining <= 0}
              >
                {!user && searchesRemaining <= 0 ? (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign up to search
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </TooltipProvider>
        </div>

        {/* Filters Panel - Soft Style */}
        {showFilters && (
          <div className="border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-white/50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[--gimmie-dark] mb-2 block">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange} disabled={!user && searchesRemaining <= 0}>
                  <SelectTrigger className="bg-white border-slate-300 rounded-full">
                    <SelectValue placeholder="Any Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-[--gimmie-dark] mb-2 block">Retailer</label>
                <Select value={retailer} onValueChange={setRetailer} disabled={!user && searchesRemaining <= 0}>
                  <SelectTrigger className="bg-white border-slate-300 rounded-full">
                    <SelectValue placeholder="All Retailers" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularRetailers.map((store) => (
                      <SelectItem key={store} value={store}>{store}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Applied Filters - Soft Pills */}
            {(priceRange || retailer) && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-[--gimmie-dark]">Filters:</span>
                  {priceRange && priceRange !== "Any Budget" && (
                    <Badge className="bg-[--gimmie-carolina]/20 text-[--gimmie-dark] border-[--gimmie-carolina]/30 rounded-full">
                      {priceRange}
                      <button 
                        onClick={() => setPriceRange('')}
                        className="ml-2 hover:text-[--gimmie-green] transition-colors"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {retailer && retailer !== "All Retailers" && (
                    <Badge className="bg-[--gimmie-carolina]/20 text-[--gimmie-dark] border-[--gimmie-carolina]/30 rounded-full">
                      {retailer}
                      <button 
                        onClick={() => setRetailer('')}
                        className="ml-2 hover:text-[--gimmie-green] transition-colors"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  <button 
                    onClick={() => {
                      setPriceRange('');
                      setRetailer('');
                    }}
                    className="text-xs text-[--gimmie-carolina] hover:text-[--gimmie-green] underline transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <p className="text-center text-sm text-slate-500 mt-4">
        {user ? (
          "Describe who you're shopping for and we'll find the perfect gift"
        ) : (
          `${searchesRemaining} free searches remaining this month • Sign up for unlimited access`
        )}
      </p>

      {/* Search Limit Modal */}
      <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[--gimmie-green] to-[--gimmie-carolina] rounded-full flex items-center justify-center">
                🎁
              </div>
              You've used all your free searches!
            </DialogTitle>
            <DialogDescription className="text-center py-4">
              Sign up for free to get unlimited gift searches, save your favorite items, and create your personal gift profile.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={handleSignUp}
              className="bg-gradient-to-r from-[--gimmie-green] to-[--gimmie-carolina] hover:from-[--gimmie-carolina] hover:to-[--gimmie-green] text-white"
            >
              Sign up for free
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowLimitModal(false)}
            >
              Continue browsing
            </Button>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            Your search limit resets monthly. No credit card required.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
