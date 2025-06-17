'use client';

import React, { ReactNode } from 'react';
import { Media, AspectRatio } from '@/types';
import { MediaCard } from './MediaCard';

interface MediaGridProps {
  media: Media[];
  onMediaClick?: (media: Media) => void;
  className?: string;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ media, onMediaClick, className = '' }) => {
  if (media.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No media found
      </div>
    );
  }

  // Create columns for masonry layout
  const createMasonryLayout = () => {
    // Distribute items evenly across columns
    const columns: ReactNode[][] = [[], [], []];
    const columnHeights = [0, 0, 0];
    
    // Sort media by aspect ratio to ensure better distribution
    // This helps create a more balanced layout
    const sortedMedia = [...media].sort((a, b) => {
      // Put vertical items first, then wide, then square
      const aspectRatioOrder = {
        [AspectRatio.VERTICAL]: 0,
        [AspectRatio.WIDE]: 1,
        [AspectRatio.SQUARE]: 2
      };
      return aspectRatioOrder[a.aspectRatio] - aspectRatioOrder[b.aspectRatio];
    });
    
    // Calculate approximate height for each aspect ratio
    const getHeightFactor = (aspectRatio: AspectRatio) => {
      switch (aspectRatio) {
        case AspectRatio.VERTICAL:
          return 1.8;
        case AspectRatio.WIDE:
          return 0.6;
        case AspectRatio.SQUARE:
          return 1;
        default:
          return 1;
      }
    };
    
    // Add each item to the column with the smallest height
    sortedMedia.forEach((item) => {
      const heightFactor = getHeightFactor(item.aspectRatio);
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      columns[shortestColumnIndex].push(
        <MediaCard
          key={item.id}
          media={item}
          onClick={() => onMediaClick?.(item)}
          className="mb-4"
        />
      );
      
      columnHeights[shortestColumnIndex] += heightFactor;
    });
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column, index) => (
          <div key={index} className="flex flex-col">
            {column}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {createMasonryLayout()}
    </div>
  );
}; 