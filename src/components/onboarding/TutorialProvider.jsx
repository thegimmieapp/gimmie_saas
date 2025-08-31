import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/api/entities";
import TutorialTooltip from "./TutorialTooltip";

const TutorialContext = createContext();

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorial must be used within TutorialProvider");
  }
  return context;
};

export default function TutorialProvider({ children }) {
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState(new Set());
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserTutorialState();
  }, []);

  const loadUserTutorialState = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      const completed = userData.completed_tutorials || [];
      setCompletedTutorials(new Set(completed));
    } catch (error) {
      console.error("Failed to load tutorial state:", error);
      // Initialize with empty state if user fetch fails
      setCompletedTutorials(new Set());
    }
  };

  const startTutorial = (tutorialSteps, tutorialId) => {
    if (completedTutorials.has(tutorialId)) {
      return; // Tutorial already completed
    }
    
    setActiveTutorial({ steps: tutorialSteps, id: tutorialId });
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (activeTutorial && currentStep < activeTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (activeTutorial && currentStep === activeTutorial.steps.length - 1) {
      // Last step, complete tutorial
      completeTutorial();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = async () => {
    if (activeTutorial && user) {
      const newCompleted = Array.from(completedTutorials).concat(activeTutorial.id);
      
      try {
        await User.updateMyUserData({
          completed_tutorials: newCompleted
        });
        
        setCompletedTutorials(new Set(newCompleted));
      } catch (error) {
        console.error("Failed to save tutorial completion:", error);
      }
    }
    
    setActiveTutorial(null);
    setCurrentStep(0);
  };

  const skipTutorial = () => {
    completeTutorial();
  };

  const currentStepData = activeTutorial?.steps[currentStep];
  const isLastStep = activeTutorial && currentStep === activeTutorial.steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <TutorialContext.Provider
      value={{
        startTutorial,
        nextStep,
        previousStep,
        completeTutorial,
        skipTutorial,
        activeTutorial,
        currentStep,
        completedTutorials
      }}
    >
      {children}
      
      {activeTutorial && (
        <TutorialTooltip
          isVisible={true}
          onClose={skipTutorial}
          onNext={nextStep}
          onPrevious={previousStep}
          title={currentStepData?.title}
          description={currentStepData?.description}
          targetSelector={currentStepData?.targetSelector}
          position={currentStepData?.position || "bottom"}
          isLastStep={isLastStep}
          isFirstStep={isFirstStep}
          stepNumber={currentStep + 1}
          totalSteps={activeTutorial?.steps.length || 0}
        />
      )}
    </TutorialContext.Provider>
  );
}