import { AspectRatio, Media, VideoMedia, ImageMedia } from '@/types';

// Helper arrays for aspect ratios and prompts
const aspectRatios = [AspectRatio.WIDE, AspectRatio.SQUARE, AspectRatio.VERTICAL];
const imagePrompts = [
  'A beautiful landscape with mountains and a lake',
  'A bustling city skyline at sunset',
  'A portrait of a person in dramatic lighting',
  'Futuristic technology in a sleek environment',
  'Abstract art with vibrant colors',
  'High fashion model in an urban setting',
  'Surreal cosmic scene with planets and stars',
  'Foggy mountain landscape with dramatic lighting',
  'Neon lights in a futuristic city at night',
  'Architectural marvel floating in clouds',
  'A bear enjoying sushi in a forest setting',
  'Massive wave approaching horses on a beach',
  'Mystical forest with glowing elements',
  'Colorful abstract fruit patterns',
  'Whimsical landscape with clay figures',
  'Retro 80s synthwave city',
  'Aerial view of a tropical island',
  'Winter forest with snow',
  'Desert with sand dunes',
  'Underwater coral reef',
  'Hot air balloons over fields',
  'Rainy street at night',
  'Sunrise over the ocean',
  'Cherry blossom trees in spring',
  'Minimalist geometric shapes',
  'Cute animals in a meadow',
  'Space shuttle launch',
  'Ancient ruins in the jungle',
  'Northern lights in the sky',
  'A fantasy castle on a hill',
  'A robot painting a picture',
  'A child playing with a dog',
  'A busy market in Morocco',
  'A serene Zen garden',
  'A futuristic flying car',
  'A magical enchanted forest',
  'A dragon flying over mountains',
  'A cyberpunk street scene',
  'A peaceful lakeside cabin',
  'A vibrant street mural',
  'A group of friends at a festival',
  'A snowy mountain peak',
  'A lighthouse on a cliff',
  'A field of sunflowers',
  'A cozy coffee shop',
  'A retro diner at night',
  'A spaceship landing on Mars',
  'A neon-lit alleyway',
  'A tranquil Japanese temple',
  'A wild horse running in a field'
];

const imageUrls = {
  [AspectRatio.WIDE]: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1536514072410-5019a3c69182?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&h=900',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&h=900'
  ],
  [AspectRatio.SQUARE]: [
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1550184658-ff6132a71714?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1550184658-ff6132a71714?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&h=1000',
    'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1000&h=1000'
  ],
  [AspectRatio.VERTICAL]: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1579762593175-20226054cad0?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=900&h=1600',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&h=1600'
  ]
};

// Generate 50 images, evenly distributed by aspect ratio
export const mockImages: ImageMedia[] = Array.from({ length: 50 }).map((_, i) => {
  const aspectRatio = aspectRatios[i % 3];
  const urlList = imageUrls[aspectRatio];
  return {
    id: `img-${i + 1}`,
    type: 'image',
    src: urlList[i % urlList.length],
    prompt: imagePrompts[i % imagePrompts.length],
    aspectRatio,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * (i + 1))
  };
});

// Video URLs and thumbnails for each aspect ratio
const videoSources = {
  [AspectRatio.WIDE]: [
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&h=900'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&h=900'
    }
  ],
  [AspectRatio.SQUARE]: [
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1000&h=1000'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&h=1000'
    }
  ],
  [AspectRatio.VERTICAL]: [
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&h=1600'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=900&h=1600'
    }
  ]
};

const videoPrompts = [
  'Waves crashing on the shore',
  'Yellow flowers swaying in the breeze',
  'Earth from space, spinning slowly',
  'Futuristic sci-fi battle scene',
  'Animated fantasy adventure',
  'Aerial drone shot of a city',
  'Wildlife in the savannah',
  'Time-lapse of clouds moving',
  'Fireworks over a city skyline',
  'A dog playing in the park',
  'A busy street market',
  'A train passing through mountains',
  'A waterfall in the jungle',
  'A group of friends hiking',
  'A chef preparing sushi',
  'A child blowing bubbles',
  'A robot assembling a car',
  'A painter working on a mural',
  'A sunrise over the ocean',
  'A night drive through the city',
  'A cat chasing a laser pointer',
  'A soccer match in the rain',
  'A parade with colorful floats',
  'A rocket launch',
  'A ballet performance',
  'A mountain biker on a trail',
  'A surfer riding a wave',
  'A timelapse of a blooming flower',
  'A snowstorm in the city',
  'A jazz band performing live',
  'A street artist drawing portraits',
  'A skateboarder doing tricks',
  'A horse running on the beach',
  'A drone flying over a forest',
  'A city at night from above',
  'A marathon race',
  'A family picnic in the park',
  'A hot air balloon festival',
  'A car drifting on a track',
  'A group of dancers on stage',
  'A timelapse of stars moving',
  'A chef making pasta',
  'A dog swimming in a pool',
  'A timelapse of city traffic',
  'A child building a sandcastle',
  'A timelapse of a sunset',
  'A group of people at a concert',
  'A timelapse of clouds over mountains',
  'A timelapse of a city waking up'
];

// Generate 50 videos, evenly distributed by aspect ratio
export const mockVideos: VideoMedia[] = Array.from({ length: 50 }).map((_, i) => {
  const aspectRatio = aspectRatios[i % 3];
  const videoList = videoSources[aspectRatio];
  const video = videoList[i % videoList.length];
  return {
    id: `vid-${i + 1}`,
    type: 'video',
    src: video.src,
    thumbnail: video.thumbnail,
    prompt: videoPrompts[i % videoPrompts.length],
    aspectRatio,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * (i + 51)),
    duration: 10 + (i % 20) // 10-29 seconds
  };
});

// Combined mock data
export const mockData: Media[] = [...mockImages, ...mockVideos];

// Helper function to initialize store with mock data
export const initializeStoreWithMockData = (addMedia: (media: Omit<Media, 'id' | 'createdAt'>) => void) => {
  mockData.forEach(item => {
    const { id, createdAt, ...rest } = item;
    addMedia(rest);
  });
};

// Simple ID generation function for new items
export const generateId = (): string => {
  return `new-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}; 