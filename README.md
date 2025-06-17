# AdGPT Frontend - Sora-like Media Experience

A React + Next.js frontend that simulates a Sora-like user experience for exploring, viewing, and generating images and videos using various aspect ratios.

## Features

- **Media Display Interface**: Display images and videos in 9:16 (Vertical), 1:1 (Square), and 16:9 (Wide) aspect ratios.
- **Prompt-to-Image Generation**: Generate images using prompts with DALL·E API (currently mocked).
- **Video Handling**: Videos autoplay on hover and loop, as in modern UIs.
- **Explore Experience**: Infinite scroll feed with mixed grid of images/videos in multiple aspect ratios.
- **Media Interaction**: View media in full screen, edit generation prompts, and regenerate images.

## Tech Stack

- React + Next.js (App Router)
- TailwindCSS
- Zustand for state management
- Framer Motion for animations
- Mock DALL·E API for image generation

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd adgpt-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app`: Next.js App Router pages
- `/src/components`: React components
  - `/ui`: UI components (buttons, selectors, etc.)
  - `/media`: Media-related components (cards, viewers, etc.)
  - `/layout`: Layout components
- `/src/store`: Zustand store for state management
- `/src/types`: TypeScript types and interfaces
- `/src/lib`: Utility functions and mock data

## File & Folder Overview

### Root

- **README.md**: Project documentation and setup instructions.
- **package.json / package-lock.json**: Project dependencies and scripts.
- **tailwind.config.ts / postcss.config.mjs**: TailwindCSS and PostCSS configuration.
- **tsconfig.json**: TypeScript configuration.
- **next.config.mjs / next-env.d.ts**: Next.js configuration and type definitions.
- **public/**: Static assets (images, favicon, etc.).

### `/src/app`
- **page.tsx**: Main entry page for the app.
- **layout.tsx**: Root layout for all pages.
- **globals.css**: Global styles.
- **explore/page.tsx**: The Explore page, with infinite scroll and media filtering.
- **generate/**: (Reserved for future media generation pages.)

### `/src/components`
- **layout/MainLayout.tsx**: Main layout component with sidebar navigation and modal support.
- **media/PromptInput.tsx**: Prompt input bar for generating images.
- **media/MediaGrid.tsx**: Masonry grid for displaying media.
- **media/MediaCard.tsx**: Card component for individual images/videos.
- **media/MediaViewer.tsx**: Fullscreen modal for viewing and editing media.
- **ui/AspectRatioSelector.tsx**: Aspect ratio filter button group.
- **ui/Button.tsx**: Reusable button component.

### `/src/store`
- **useMediaStore.ts**: Zustand store for global media state, aspect ratio, and filtering.

### `/src/types`
- **index.ts**: TypeScript types for media, aspect ratios, and store.

### `/src/lib`
- **mockData.ts**: Mock data for images and videos, and helper functions for populating the store.

## Usage

- **Generate Page**: Enter prompts to generate images in different aspect ratios.
- **Explore Page**: Browse through a feed of images and videos.
- **Media Viewer**: Click on any media to view it in full screen, edit prompts, and regenerate images.

## Performance Optimizations

- Lazy loading of images and videos
- Prefetching for smooth aspect ratio switching
- Optimized rendering with React hooks

## License

MIT
