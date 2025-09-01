import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export default function OnboardingStepper({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              isCompleted 
                ? 'bg-[--gimmie-green] border-[--gimmie-green] text-white' 
                : isCurrent
                ? 'border-[--gimmie-green] text-[--gimmie-green] bg-white'
                : 'border-slate-300 text-slate-400 bg-white'
            }`}>
              {isCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span className="text-sm font-semibold">{stepNumber}</span>
              )}
            </div>
            
            {stepNumber < totalSteps && (
              <div className={`w-12 h-0.5 mx-2 transition-all ${
                isCompleted ? 'bg-[--gimmie-green]' : 'bg-slate-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}