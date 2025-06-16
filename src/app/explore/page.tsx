'use client';

import React, { useEffect, useState } from 'react';
import { MediaGrid } from '@/components/media/MediaGrid';
import { useMediaStore } from '@/store/useMediaStore';
import { initializeStoreWithMockData } from '@/lib/mockData';
import { AspectRatio } from '@/types';

export default function ExplorePage() {
  const { media, addMedia } = useMediaStore();
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
  
  // For infinite scroll simulation
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100 &&
      !isLoading
    ) {
      loadMoreMedia();
    }
  };
  
  useEffect(() => {
    if (isMounted) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading, isMounted]);
  
  const loadMoreMedia = () => {
    setIsLoading(true);
    
    // Simulate loading more media
    setTimeout(() => {
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
    }, 1000);
  };
  
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Explore Media</h1>
          <p className="text-gray-400">
            Discover and explore a variety of images and videos in different aspect ratios
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Showing all formats</span>
          <div className="h-6 w-px bg-gray-700"></div>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Filter
          </button>
        </div>
      </div>
      
      <MediaGrid media={isMounted ? media : []} />
      
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
} 