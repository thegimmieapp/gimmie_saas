import React from 'react';
import { Sparkles, Gift, Users } from 'lucide-react';

export default function WelcomeStep({ user }) {
  return (
    <div className="text-center space-y-8">
      <div className="w-20 h-20 bg-gradient-to-br from-[--gimmie-green] to-[--gimmie-carolina] rounded-2xl mx-auto flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      
      <div>
        <h2 className="text-3xl font-light text-[--gimmie-dark] mb-4">
          Welcome to Gimmie, {user?.full_name?.split(' ')[0] || 'there'}! 
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Let's create your personalized gift discovery profile. We'll help you save and organize gift ideas, 
          and make it easy for friends and family to find the perfect presents for you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="text-center p-6 bg-[--gimmie-grey-sky] rounded-xl">
          <Gift className="w-8 h-8 text-[--gimmie-green] mx-auto mb-3" />
          <h3 className="font-semibold text-[--gimmie-dark] mb-2">Save & Organize</h3>
          <p className="text-sm text-slate-600">Create wishlists and collections of items you love</p>
        </div>
        
        <div className="text-center p-6 bg-[--gimmie-grey-sky] rounded-xl">
          <Users className="w-8 h-8 text-[--gimmie-green] mx-auto mb-3" />
          <h3 className="font-semibold text-[--gimmie-dark] mb-2">Share & Discover</h3>
          <p className="text-sm text-slate-600">Share your profile with friends and discover their preferences</p>
        </div>
        
        <div className="text-center p-6 bg-[--gimmie-grey-sky] rounded-xl">
          <Sparkles className="w-8 h-8 text-[--gimmie-green] mx-auto mb-3" />
          <h3 className="font-semibold text-[--gimmie-dark] mb-2">AI Recommendations</h3>
          <p className="text-sm text-slate-600">Get personalized gift suggestions powered by AI</p>
        </div>
      </div>
    </div>
  );
}