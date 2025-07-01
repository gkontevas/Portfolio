import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Polyfill __filename for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Experimental features to help with build stability
  experimental: {
    optimizePackageImports: ['framer-motion', '@splinetool/runtime'],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Webpack configuration for faster compilation
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Faster rebuilds in development
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename]
        }
      };
      
      // Optimize module resolution
      config.resolve.symlinks = false;
      
      // Reduce bundle size for faster HMR
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
