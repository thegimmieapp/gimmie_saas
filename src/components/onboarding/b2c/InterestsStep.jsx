import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Grid3X3, Sparkles } from 'lucide-react';
import InterestChat from './InterestChat';

const POPULAR_INTERESTS = [
  'Fashion', 'Tech', 'Home Decor', 'Cooking', 'Travel', 'Fitness', 
  'Reading', 'Gaming', 'Art', 'Music', 'Photography', 'Gardening',
  'Coffee', 'Wine', 'Skincare', 'Jewelry', 'Outdoors', 'Crafts',
  'Movies', 'Pets', 'Wellness', 'Cars', 'Sports', 'Design'
];

export default function InterestsStep({ userData, onUpdate }) {
  const [selectedInterests, setSelectedInterests] = useState(userData.user_interests || []);
  const [activeTab, setActiveTab] = useState('manual');

  const toggleInterest = (interest) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    
    setSelectedInterests(updated);
    onUpdate({ user_interests: updated });
  };

  const handleAIInterests = (interests) => {
    setSelectedInterests(interests);
    onUpdate({ user_interests: interests });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-light text-[--gimmie-dark] mb-4">
          What are you interested in?
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Help us understand your preferences so we can recommend the perfect gifts. 
          You can select manually or chat with our AI for smart suggestions.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="manual" className="gap-2">
            <Grid3X3 className="w-4 h-4" />
            Manual Selection
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat with Gimmie AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-slate-600 mb-4">
              Click on topics that interest you. Selected: {selectedInterests.length}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {POPULAR_INTERESTS.map(interest => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 px-4 py-2 text-sm ${
                  selectedInterests.includes(interest)
                    ? 'bg-[--gimmie-green] text-white border-[--gimmie-green]'
                    : 'text-slate-600 border-slate-300 hover:border-[--gimmie-green] hover:text-[--gimmie-green]'
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>

          {selectedInterests.length > 0 && (
            <div className="bg-[--gimmie-grey-sky] rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-[--gimmie-dark] mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[--gimmie-green]" />
                Your Selected Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map(interest => (
                  <Badge key={interest} className="bg-[--gimmie-green] text-white">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <InterestChat onInterestsDetected={handleAIInterests} />
          
          {selectedInterests.length > 0 && (
            <div className="bg-[--gimmie-grey-sky] rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-[--gimmie-dark] mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[--gimmie-green]" />
                AI Detected Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map(interest => (
                  <Badge key={interest} className="bg-[--gimmie-carolina] text-white">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}