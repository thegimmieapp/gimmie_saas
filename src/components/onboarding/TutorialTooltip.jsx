import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function TutorialTooltip({ 
  isVisible, 
  onClose, 
  onNext, 
  onPrevious,
  title, 
  description, 
  targetSelector, 
  position = "bottom",
  isLastStep = false,
  isFirstStep = false,
  stepNumber,
  totalSteps
}) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetFound, setTargetFound] = useState(false);
  const retryTimeoutRef = useRef(null);
  const retryCountRef = useRef(0);

  const findTargetAndPosition = useCallback(() => {
    if (!isVisible || !targetSelector) return;

    const target = document.querySelector(targetSelector);
    if (!target) {
      setTargetFound(false);
      
      // Retry up to 20 times with increasing delays
      if (retryCountRef.current < 20) {
        retryCountRef.current += 1;
        const delay = Math.min(100 * retryCountRef.current, 2000);
        retryTimeoutRef.current = setTimeout(findTargetAndPosition, delay);
      }
      return;
    }

    setTargetFound(true);
    retryCountRef.current = 0;
    
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    let top, left;
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    
    switch (position) {
      case 'top':
        top = rect.top + scrollTop - tooltipHeight - 15;
        left = rect.left + scrollLeft + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = rect.bottom + scrollTop + 15;
        left = rect.left + scrollLeft + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = rect.top + scrollTop + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.left + scrollLeft - tooltipWidth - 15;
        break;
      case 'right':
        top = rect.top + scrollTop + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.right + scrollLeft + 15;
        break;
      default:
        top = rect.bottom + scrollTop + 15;
        left = rect.left + scrollLeft + (rect.width / 2) - (tooltipWidth / 2);
    }
    
    // Ensure tooltip stays within viewport bounds
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    left = Math.max(10, Math.min(left, viewportWidth - tooltipWidth - 10));
    top = Math.max(10, Math.min(top, viewportHeight + scrollTop - tooltipHeight - 10));
    
    setTooltipPosition({ top, left });
    
    // Scroll element into view if needed
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add highlight to target element with better styling
    target.style.cssText = `
      position: relative !important;
      z-index: 1001 !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 0 0 4px rgba(56, 91, 101, 0.4), 0 0 20px rgba(56, 91, 101, 0.2) !important;
      border-radius: 8px !important;
      background-color: rgba(56, 91, 101, 0.05) !important;
    `;
  }, [isVisible, targetSelector, position]);

  useEffect(() => {
    if (isVisible) {
      // Clear any existing timeout and reset retry count
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      retryCountRef.current = 0;
      
      // Wait for DOM to be ready, then find target
      setTimeout(findTargetAndPosition, 100);
    }
    
    return () => {
      // Clear timeout on cleanup
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      // Remove highlight when tooltip is hidden
      if (targetSelector) {
        const target = document.querySelector(targetSelector);
        if (target) {
          target.style.cssText = '';
        }
      }
    };
  }, [isVisible, targetSelector, findTargetAndPosition]);

  // Don't render if not visible or target not found
  if (!isVisible || !targetFound) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[999]" onClick={onClose} />
      
      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed z-[1002]"
          style={{ 
            top: `${tooltipPosition.top}px`, 
            left: `${tooltipPosition.left}px`,
            width: '320px'
          }}
        >
          <Card className="bg-white shadow-2xl border-2 border-[--gimmie-green]/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-[--gimmie-dark] text-lg">{title}</h4>
                    <div className="text-xs bg-[--gimmie-green] text-white px-2 py-1 rounded-full font-medium">
                      {stepNumber} of {totalSteps}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={onPrevious}
                  disabled={isFirstStep}
                  className="gap-2"
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <Button
                  onClick={isLastStep ? onClose : onNext}
                  className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90 text-white gap-2"
                  size="sm"
                >
                  {isLastStep ? 'Finish' : 'Next'}
                  {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
}