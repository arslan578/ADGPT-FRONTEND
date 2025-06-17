'use client';

import React, { useState } from 'react';
import { AspectRatio } from '@/types';
import { useMediaStore } from '@/store/useMediaStore';
import { Button } from '@/components/ui/Button';

// Fixed image sources for different aspect ratios
const placeholderImages = {
  [AspectRatio.VERTICAL]: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=1600'
  ],
  [AspectRatio.SQUARE]: [
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1000'
  ],
  [AspectRatio.WIDE]: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900'
  ]
};

// Mock function to simulate DALL·E API
const mockGenerateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  // In a real app, this would call the OpenAI API
  // For now, return a random image from our placeholders based on aspect ratio
  const images = placeholderImages[aspectRatio];
  const randomIndex = Math.floor(Math.random() * images.length);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return images[randomIndex];
};

export const PromptInput: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { currentAspectRatio, addMedia } = useMediaStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const imageUrl = await mockGenerateImage(prompt, currentAspectRatio);
      
      addMedia({
        type: 'image',
        src: imageUrl,
        prompt,
        aspectRatio: currentAspectRatio,
      });
      
      setPrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="border border-gray-800 rounded-xl p-4 bg-gray-900 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full p-4 pr-12 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[80px]"
              disabled={isGenerating}
              rows={2}
            />
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={isGenerating || !prompt.trim()} 
            className="h-12 px-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}; 