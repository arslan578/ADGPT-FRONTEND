'use client';

import React, { useEffect, useState } from 'react';
import { PromptInput } from '@/components/media/PromptInput';
import { MediaGrid } from '@/components/media/MediaGrid';
import { AspectRatioSelector } from '@/components/ui/AspectRatioSelector';
import { useMediaStore } from '@/store/useMediaStore';
import { initializeStoreWithMockData } from '@/lib/mockData';
import { AspectRatio } from '@/types';

export default function GeneratePage() {
  const { media, currentAspectRatio, addMedia, getFilteredMedia } = useMediaStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    // Only initialize store on client side
    if (isMounted && media.length === 0 && !isInitialized) {
      initializeStoreWithMockData(addMedia);
      setIsInitialized(true);
    }
  }, [media.length, addMedia, isInitialized, isMounted]);
  
  const filteredMedia = isMounted ? getFilteredMedia(currentAspectRatio) : [];
  
  // Show a loading state while client-side code is initializing
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Generate Media</h1>
          <AspectRatioSelector />
        </div>
        
        <PromptInput />
      </div>
      
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Your Generated Media</h2>
          <span className="text-sm px-3 py-1 bg-gray-800 rounded-full text-blue-400">{currentAspectRatio}</span>
        </div>
        
        <MediaGrid media={filteredMedia} />
      </div>
    </div>
  );
}
