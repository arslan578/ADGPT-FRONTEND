'use client';

import React from 'react';
import { AspectRatio } from '@/types';
import { useMediaStore } from '@/store/useMediaStore';

interface AspectRatioSelectorProps {
  className?: string;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ className = '' }) => {
  const { currentAspectRatio, setCurrentAspectRatio } = useMediaStore();
  
  const aspectRatios = [
    { value: AspectRatio.VERTICAL, label: 'Vertical', icon: '9:16' },
    { value: AspectRatio.SQUARE, label: 'Square', icon: '1:1' },
    { value: AspectRatio.WIDE, label: 'Wide', icon: '16:9' }
  ];
  
  return (
    <div className={`flex ${className}`}>
      <div className="inline-flex rounded-md bg-gray-800 p-1">
        {aspectRatios.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => setCurrentAspectRatio(ratio.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              currentAspectRatio === ratio.value
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label={ratio.label}
            title={ratio.label}
          >
            {ratio.icon}
          </button>
        ))}
      </div>
    </div>
  );
}; 