import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';

export default function B2BHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or trigger search functionality
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200/80">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always links to B2C home */}
          <div className="flex-shrink-0">
            <Link to={createPageUrl('PublicHome')}>
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8f4c59034_green.png" alt="Gimmie AI" className="h-10" />
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                type="text"
                placeholder="Find the perfect gift with AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-slate-300 focus:border-[--gimmie-green] focus:ring-[--gimmie-green]"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link to={createPageUrl("IntegrateLanding")} className="font-medium text-slate-600 hover:text-[--gimmie-green] transition-colors">Integrate</Link>
            <Link to={createPageUrl("AnalyticsLanding")} className="font-medium text-slate-600 hover:text-[--gimmie-green] transition-colors">Analytics</Link>
            <Link to={createPageUrl("Testimonials")} className="font-medium text-slate-600 hover:text-[--gimmie-green] transition-colors">Testimonials</Link>
            <Link to={createPageUrl("DeveloperDocs")} className="font-medium text-slate-600 hover:text-[--gimmie-green] transition-colors">Dev Docs</Link>
            <Link to={createPageUrl("Pricing")} className="font-medium text-slate-600 hover:text-[--gimmie-green] transition-colors">Pricing</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to={createPageUrl('Dashboard')}>
              <Button variant="outline" className="text-slate-600 hover:text-[--gimmie-green] hover:bg-slate-50 border-slate-300">
                Login
              </Button>
            </Link>
            <Link to={createPageUrl('Dashboard')}>
              <Button className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90">
                Install App
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  type="text"
                  placeholder="Find the perfect gift..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-slate-300"
                />
              </form>
              
              <Link to={createPageUrl("IntegrateLanding")} className="block px-3 py-2 text-slate-600 hover:text-[--gimmie-green]">Integrate</Link>
              <Link to={createPageUrl("AnalyticsLanding")} className="block px-3 py-2 text-slate-600 hover:text-[--gimmie-green]">Analytics</Link>
              <Link to={createPageUrl("Testimonials")} className="block px-3 py-2 text-slate-600 hover:text-[--gimmie-green]">Testimonials</Link>
              <Link to={createPageUrl("DeveloperDocs")} className="block px-3 py-2 text-slate-600 hover:text-[--gimmie-green]">Dev Docs</Link>
              <Link to={createPageUrl("Pricing")} className="block px-3 py-2 text-slate-600 hover:text-[--gimmie-green]">Pricing</Link>
              
              <div className="pt-3 space-y-2">
                <Link to={createPageUrl('Dashboard')} className="block">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to={createPageUrl('Dashboard')} className="block">
                  <Button className="w-full bg-[--gimmie-green] hover:bg-[--gimmie-green]/90">Install App</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}