'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaStore } from '@/store/useMediaStore';
import { MediaViewer } from '@/components/media/MediaViewer';
import { AspectRatio } from '@/types';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { selectedMediaId, setSelectedMediaId, currentAspectRatio, setCurrentAspectRatio } = useMediaStore();
  const [promptStyle, setPromptStyle] = useState<'compact' | 'expanded'>('compact');

  const isActive = (path: string) => pathname === path;

  const handleCloseViewer = () => {
    setSelectedMediaId(null);
  };

  const togglePromptStyle = () => {
    setPromptStyle(promptStyle === 'compact' ? 'expanded' : 'compact');
  };

  // Map global aspect ratio to button selection
  const getSelectedOption = () => {
    switch (currentAspectRatio) {
      case AspectRatio.WIDE:
        return '16:9';
      case AspectRatio.SQUARE:
        return '1:1';
      case AspectRatio.VERTICAL:
        return '9:16';
      default:
        return '16:9';
    }
  };

  const handleOptionSelect = (option: '16:9' | '1:1' | '9:16') => {
    if (option === '16:9') setCurrentAspectRatio(AspectRatio.WIDE);
    if (option === '1:1') setCurrentAspectRatio(AspectRatio.SQUARE);
    if (option === '9:16') setCurrentAspectRatio(AspectRatio.VERTICAL);
  };

  const selectedOption = getSelectedOption();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-gray-800 flex-shrink-0 h-screen sticky top-0">
        <div className="p-5">
          <h1 className="text-xl font-bold text-blue-400 mb-8">AdGPT</h1>
          
          <nav className="space-y-1">
            <h2 className="text-xs uppercase text-gray-500 font-medium mb-2 ml-1">Navigation</h2>
            <Link href="/explore" className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
              isActive('/explore') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Explore</span>
            </Link>
            
            <Link href="/" className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
              isActive('/') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Generate</span>
            </Link>
            
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Images</span>
            </div>
            
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span>Videos</span>
            </div>
            
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Top</span>
            </div>
            
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Likes</span>
            </div>
          </nav>
          
          <div className="mt-8">
            <h2 className="text-xs uppercase text-gray-500 font-medium mb-2 ml-1">Library</h2>
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span>My media</span>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold">{pathname === '/explore' ? 'Explore' : 'Generate'}</h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-gray-800/80 text-white rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              
              <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              
              <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
        
        {/* Global prompt input at bottom - Compact Style */}
        {promptStyle === 'compact' && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[600px] bg-gray-800/80 backdrop-blur-md rounded-full border border-gray-700 shadow-lg">
            <div className="flex items-center px-4 py-3">
              <button 
                className="p-2 mr-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"
                onClick={togglePromptStyle}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              <input
                type="text"
                placeholder="Describe your image..."
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
              />
              
              <div className="flex items-center space-x-3">
                <button className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="flex items-center bg-gray-700/50 rounded-full p-1">
                  <button 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${selectedOption === '16:9' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => handleOptionSelect('16:9')}
                  >
                    16:9
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${selectedOption === '1:1' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => handleOptionSelect('1:1')}
                  >
                    1:1
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${selectedOption === '9:16' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => handleOptionSelect('9:16')}
                  >
                    9:16
                  </button>
                </div>
                
                <button className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button className="p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Global prompt input at bottom - Expanded Style */}
        {promptStyle === 'expanded' && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[600px] bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <button 
                  className="p-2 mr-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"
                  onClick={togglePromptStyle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <input
                  type="text"
                  placeholder="Describe your image..."
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 flex items-center justify-between bg-gray-700/50 rounded-lg p-1">
                    <div className="flex items-center gap-2">
                      <button 
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium ${selectedOption === '16:9' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => handleOptionSelect('16:9')}
                      >
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          <span>16:9</span>
                        </div>
                      </button>
                      <button 
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium ${selectedOption === '1:1' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => handleOptionSelect('1:1')}
                      >
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                          </svg>
                          <span>1:1</span>
                        </div>
                      </button>
                      <button 
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium ${selectedOption === '9:16' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => handleOptionSelect('9:16')}
                      >
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          <span>9:16</span>
                        </div>
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <button className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-end w-full mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400">GPT-4o</span>
                    </div>
                    <div className="h-4 w-px bg-gray-700"></div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 bg-gray-700 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400">DALL·E</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {selectedMediaId && (
        <MediaViewer onClose={handleCloseViewer} />
      )}
    </div>
  );
}; 