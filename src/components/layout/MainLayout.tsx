'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaStore } from '@/store/useMediaStore';
import { MediaViewer } from '@/components/media/MediaViewer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { selectedMediaId, setSelectedMediaId } = useMediaStore();
  
  const isActive = (path: string) => pathname === path;
  
  const handleCloseViewer = () => {
    setSelectedMediaId(null);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-400">AdGPT</h1>
              </div>
              <nav className="ml-10 flex space-x-8">
                <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-blue-400 text-white' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}>
                  Generate
                </Link>
                <Link href="/explore" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/explore') 
                    ? 'border-blue-400 text-white' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}>
                  Explore
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {selectedMediaId && (
        <MediaViewer onClose={handleCloseViewer} />
      )}
    </div>
  );
}; 