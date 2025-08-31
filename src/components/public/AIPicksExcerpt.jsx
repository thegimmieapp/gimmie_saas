import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AIPicksExcerpt() {
  return (
    <div className="bg-gradient-to-br from-[--gimmie-grey-sky] to-white/50 p-8 sm:p-12 rounded-2xl soft-shadow text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[--gimmie-green] to-[--gimmie-carolina] rounded-full flex items-center justify-center text-white">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-2xl font-light text-[--gimmie-dark] mb-4">
        An Editor's Note from Our AI
      </h3>
      <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
        "We've analyzed thousands of data points—from current trends to lasting quality and user reviews—to curate this collection. These products aren't just popular; they're chosen for their ability to create memorable moments. Each one balances timeless appeal with a touch of the unique. We think you'll find something truly special here."
      </p>
    </div>
  );
}