'use client';

import React, { useEffect, useState } from 'react';
import { MediaGrid } from '@/components/media/MediaGrid';
import { useMediaStore } from '@/store/useMediaStore';
import { initializeStoreWithMockData } from '@/lib/mockData';

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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gray-800 rounded-full text-white font-medium">
            All
          </button>
          <button className="px-4 py-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white">
            Images
          </button>
          <button className="px-4 py-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white">
            Videos
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-800 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
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