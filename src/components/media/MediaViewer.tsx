'use client';

import React, { useState } from 'react';
import { Media } from '@/types';
import { useMediaStore } from '@/store/useMediaStore';
import { Button } from '@/components/ui/Button';
import { AspectRatioSelector } from '@/components/ui/AspectRatioSelector';

interface MediaViewerProps {
  onClose: () => void;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ onClose }) => {
  const { media, selectedMediaId, updateMedia, deleteMedia } = useMediaStore();
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const selectedMedia = media.find((m: Media) => m.id === selectedMediaId);
  
  if (!selectedMedia) return null;
  
  const handleEditClick = () => {
    setEditPrompt(selectedMedia.prompt);
    setIsEditing(true);
  };
  
  const handleSaveEdit = () => {
    if (selectedMedia) {
      updateMedia(selectedMedia.id, { prompt: editPrompt });
      setIsEditing(false);
    }
  };
  
  const handleDelete = () => {
    if (selectedMedia) {
      deleteMedia(selectedMedia.id);
      onClose();
    }
  };
  
  const handleGenerateAgain = () => {
    // In a real app, this would call the DALL·E API again with the edited prompt
    // For now, we'll just update the prompt
    if (selectedMedia) {
      updateMedia(selectedMedia.id, { prompt: editPrompt });
      setIsEditing(false);
    }
  };
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
    >
      <div className="relative w-full max-w-5xl bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="rounded-full bg-gray-800/80 p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex items-center justify-center">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.prompt}
                  className="w-full h-auto rounded-md object-contain max-h-[70vh]"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  loop
                  className="w-full h-auto rounded-md max-h-[70vh]"
                />
              )}
            </div>
            
            <div className="w-full md:w-1/3 space-y-6 p-4">
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-300">Prompt</h3>
                {isEditing ? (
                  <textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-200 bg-gray-800/50 p-3 rounded-md">{selectedMedia.prompt}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-300">Aspect Ratio</h3>
                <div className="bg-gray-800/50 p-3 rounded-md">
                  <p className="text-gray-200">{selectedMedia.aspectRatio}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleGenerateAgain} variant="primary">Generate Again</Button>
                    <Button onClick={handleSaveEdit} variant="secondary">Save</Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleEditClick} variant="primary">Edit Prompt</Button>
                    <Button onClick={handleDelete} variant="outline">Delete</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 