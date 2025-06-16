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
  
  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 ${aspectRatioClasses[media.aspectRatio]} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => isMounted && setIsHovered(true)}
      onMouseLeave={() => isMounted && setIsHovered(false)}
    >
      {/* Image or Video */}
      {media.type === 'image' ? (
        <img 
          src={imageError ? fallbackImage[media.aspectRatio] : media.src}
          alt={media.prompt}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
      ) : (
        <div className="relative w-full h-full">
          <img 
            src={imageError ? fallbackImage[media.aspectRatio] : (media as any).thumbnail}
            alt={media.prompt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isMounted && isHovered ? 'opacity-0' : 'opacity-100'}`}
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
      
      {/* Overlay gradient and info */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${isMounted && isHovered ? 'opacity-100' : ''}`}
      />
      
      {/* Media info */}
      <div 
        className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-300 transform ${isMounted && isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
      >
        <p className="text-sm text-white font-medium truncate drop-shadow-md">{media.prompt}</p>
        
        {/* Media type indicator */}
        <div className="flex items-center mt-2">
          <span className="text-xs text-white/80 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {media.type === 'video' ? '▶ Video' : '🖼 Image'}
          </span>
          <span className="ml-2 text-xs text-white/80">{media.aspectRatio}</span>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      {isMounted && isHovered && (
        <div className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none" />
      )}
    </div>
  );
}; 