'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Media } from '@/types';
import { useMediaStore } from '@/store/useMediaStore';

interface MediaCardProps {
  media: Media;
  onClick?: () => void;
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({ media, onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { setSelectedMediaId } = useMediaStore();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Only enable hover effects after component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleClick = () => {
    setSelectedMediaId(media.id);
    if (onClick) onClick();
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]'
  };
  
  // Fallback image based on aspect ratio
  const fallbackImage = {
    '16:9': 'https://via.placeholder.com/1600x900/1f2937/4b5563?text=Image+Unavailable',
    '1:1': 'https://via.placeholder.com/1000x1000/1f2937/4b5563?text=Image+Unavailable',
    '9:16': 'https://via.placeholder.com/900x1600/1f2937/4b5563?text=Image+Unavailable'
  };
  
  // Generate a random username for the mock UI
  const getRandomUsername = () => {
    const usernames = ['tetikon', 'gptken', 'jaykalwa', 'adgptuser', 'soralike', 'pixelmaster', 'aiartist'];
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
  };
  
  // Generate a random like count
  const getRandomLikeCount = () => {
    return Math.floor(Math.random() * 1000);
  };
  
  const username = getRandomUsername();
  const likeCount = getRandomLikeCount();
  
  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl cursor-pointer group ${aspectRatioClasses[media.aspectRatio]} ${className}`}
      onMouseEnter={() => isMounted && setIsHovered(true)}
      onMouseLeave={() => isMounted && setIsHovered(false)}
    >
      {/* Image or Video */}
      <div className="w-full h-full" onClick={handleClick}>
        {media.type === 'image' ? (
          <img 
            src={imageError ? fallbackImage[media.aspectRatio] : media.src}
            alt={media.prompt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="relative w-full h-full">
            <img 
              src={imageError ? fallbackImage[media.aspectRatio] : (media as any).thumbnail}
              alt={media.prompt}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.03] ${isMounted && isHovered ? 'opacity-0' : 'opacity-100'}`}
              loading="lazy"
              onError={handleImageError}
            />
            {isMounted && isHovered && !imageError && (
              <video
                src={media.src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        )}
      </div>
      
      {/* User attribution overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center text-xs text-white font-medium">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-white font-medium">{username}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button 
              className="p-1.5 rounded-full hover:bg-gray-800/50 text-white"
              onClick={(e) => {
                e.stopPropagation();
                // Like functionality would go here
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </button>
            <span className="text-xs text-white font-medium">{likeCount}</span>
          </div>
        </div>
      </div>
      
      {/* Action buttons overlay at top-right */}
      <div className="absolute top-3 right-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm hover:bg-gray-800 text-white"
          onClick={(e) => {
            e.stopPropagation();
            // Download functionality would go here
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button 
          className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm hover:bg-gray-800 text-white"
          onClick={(e) => {
            e.stopPropagation();
            // Search similar functionality would go here
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 