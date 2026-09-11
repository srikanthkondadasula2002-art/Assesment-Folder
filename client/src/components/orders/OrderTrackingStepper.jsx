import React from 'react';
import { Check } from 'lucide-react';

const STEPS = ['Ordered', 'Packed', 'Shipped', 'Delivered'];

export default function OrderTrackingStepper({ currentStatus, timeline = [] }) {
  const currentStepIndex = STEPS.indexOf(currentStatus);

  return (
    <div className="w-full py-5 px-4 bg-white border border-gray-100 rounded-xs shadow-xs">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        {/* Background Grey Bar */}
        <div className="absolute left-8 right-8 top-4 h-1 bg-gray-200 z-0" />
        
        {/* Active Green Progress Bar */}
        <div
          className="absolute left-8 top-4 h-1 bg-[#26a541] transition-all duration-500 z-0"
          style={{ width: `${(Math.max(0, currentStepIndex) / (STEPS.length - 1)) * 85}%` }}
        />

        {STEPS.map((step, idx) => {
          const isDone = idx <= currentStepIndex;
          const matchingTimeline = timeline.find(t => t.status === step);

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              {/* Stepper Dot */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                  isDone ? 'bg-[#26a541] text-white shadow-sm' : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isDone ? <Check size={16} strokeWidth={3} /> : idx + 1}
              </div>

              {/* Step Label */}
              <span className={`text-xs mt-2 font-semibold ${isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                {step}
              </span>

              {/* Timestamp */}
              {matchingTimeline && (
                <span className="text-[10px] text-gray-500 mt-0.5 whitespace-nowrap">
                  {new Date(matchingTimeline.date).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
