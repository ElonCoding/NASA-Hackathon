# NASA Hackathon Project

## Overview
This project is a data explorer for NASA’s Terra satellite, allowing users to visualize global observations, analyze trends, and download data. The globe visualization uses a NASA Earth texture for realistic rendering.

## Features
- Interactive 3D globe using Three.js and React Three Fiber
- Layer toggling (Clouds, Atmosphere, Land, Cryosphere, Vegetation)
- Real-time data visualization
- Customizable UI panels

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd NASA hackathon
   ```
2. Install dependencies:
   ```
   npm install
   # or
   pnpm install
   ```
3. Start the development server:
   ```
   npm run dev
   # or
   pnpm run dev
   ```

### Vite Configuration
If you encounter a 403 error, ensure your `vite.config.ts` includes:
```ts
server: {
  fs: {
    allow: ["./client", "./shared", ".", "./public"],
  },
}
```

## Globe Texture
The globe uses the following NASA image as its texture:
`https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74218/world.200412.3x5400x2700.jpg`

## Folder Structure
- `client/` — Frontend React code
- `server/` — Backend Express server
- `public/` — Static assets and textures
- `shared/` — Shared code

## License
MIT