import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AspectRatio, Media } from '@/types';
import { generateId } from '@/lib/mockData';

interface MediaStore {
  media: Media[];
  currentAspectRatio: AspectRatio;
  selectedMediaId: string | null;
  
  setCurrentAspectRatio: (aspectRatio: AspectRatio) => void;
  addMedia: (media: Omit<Media, 'id' | 'createdAt'>) => void;
  updateMedia: (id: string, updates: Partial<Omit<Media, 'id' | 'createdAt'>>) => void;
  deleteMedia: (id: string) => void;
  setSelectedMediaId: (id: string | null) => void;
  getFilteredMedia: (aspectRatio?: AspectRatio) => Media[];
}

type State = {
  media: Media[];
  currentAspectRatio: AspectRatio;
  selectedMediaId: string | null;
};

type Actions = {
  setCurrentAspectRatio: (aspectRatio: AspectRatio) => void;
  addMedia: (media: Omit<Media, 'id' | 'createdAt'>) => void;
  updateMedia: (id: string, updates: Partial<Omit<Media, 'id' | 'createdAt'>>) => void;
  deleteMedia: (id: string) => void;
  setSelectedMediaId: (id: string | null) => void;
  getFilteredMedia: (aspectRatio?: AspectRatio) => Media[];
};

export const useMediaStore = create<MediaStore>()(
  persist<State & Actions>(
    (set, get) => ({
      media: [],
      currentAspectRatio: AspectRatio.WIDE,
      selectedMediaId: null,
      
      setCurrentAspectRatio: (aspectRatio: AspectRatio) => set({ currentAspectRatio: aspectRatio }),
      
      addMedia: (mediaData: Omit<Media, 'id' | 'createdAt'>) => set((state: State) => ({
        media: [
          ...state.media,
          {
            ...mediaData,
            id: generateId(),
            createdAt: new Date()
          }
        ]
      })),
      
      updateMedia: (id: string, updates: Partial<Omit<Media, 'id' | 'createdAt'>>) => set((state: State) => ({
        media: state.media.map((item) => 
          item.id === id ? { ...item, ...updates } : item
        )
      })),
      
      deleteMedia: (id: string) => set((state: State) => ({
        media: state.media.filter((item) => item.id !== id),
        selectedMediaId: state.selectedMediaId === id ? null : state.selectedMediaId
      })),
      
      setSelectedMediaId: (id: string | null) => set({ selectedMediaId: id }),
      
      getFilteredMedia: (aspectRatio?: AspectRatio) => {
        const { media } = get();
        if (!aspectRatio) return media;
        return media.filter((item) => item.aspectRatio === aspectRatio);
      }
    }),
    {
      name: 'media-storage'
    }
  )
); 