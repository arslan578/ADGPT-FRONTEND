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
    // Group items by aspect ratio for better arrangement
    const wideItems = media.filter(item => item.aspectRatio === AspectRatio.WIDE);
    const squareItems = media.filter(item => item.aspectRatio === AspectRatio.SQUARE);
    const verticalItems = media.filter(item => item.aspectRatio === AspectRatio.VERTICAL);
    
    // Arrange items in a way that creates a balanced layout
    const leftColumn: ReactNode[] = [];
    const centerColumn: ReactNode[] = [];
    const rightColumn: ReactNode[] = [];
    
    // Distribute items evenly across columns while maintaining visual balance
    // This algorithm tries to create a balanced distribution based on aspect ratios
    let columnHeights = [0, 0, 0]; // Track approximate height of each column
    
    // Helper to add item to the shortest column
    const addToShortestColumn = (item: Media, heightFactor: number) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      const component = (
        <MediaCard
          key={item.id}
          media={item}
          onClick={() => onMediaClick?.(item)}
          className="mb-4"
        />
      );
      
      if (shortestColumnIndex === 0) {
        leftColumn.push(component);
      } else if (shortestColumnIndex === 1) {
        centerColumn.push(component);
      } else {
        rightColumn.push(component);
      }
      
      // Update column height
      columnHeights[shortestColumnIndex] += heightFactor;
    };
    
    // Add wide items (they have more visual weight)
    wideItems.forEach(item => {
      addToShortestColumn(item, 1.5);
    });
    
    // Add vertical items (they're taller)
    verticalItems.forEach(item => {
      addToShortestColumn(item, 2);
    });
    
    // Add square items
    squareItems.forEach(item => {
      addToShortestColumn(item, 1);
    });
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col gap-5">{leftColumn}</div>
        <div className="flex flex-col gap-5">{centerColumn}</div>
        <div className="flex flex-col gap-5">{rightColumn}</div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {createMasonryLayout()}
    </div>
  );
}; 