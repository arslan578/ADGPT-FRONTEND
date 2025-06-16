export enum AspectRatio {
  VERTICAL = '9:16',
  SQUARE = '1:1',
  WIDE = '16:9'
}

export type MediaType = 'image' | 'video';

export interface Media {
  id: string;
  type: MediaType;
  src: string;
  prompt: string;
  aspectRatio: AspectRatio;
  createdAt: Date;
}

export interface ImageMedia extends Media {
  type: 'image';
}

export interface VideoMedia extends Media {
  type: 'video';
  thumbnail: string;
  duration: number;
} 