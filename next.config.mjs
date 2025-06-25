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
  // Turbopack configuration (now stable)
  turbopack: {
    // Turbopack configuration equivalent to webpack config
    resolveAlias: {},
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  // Webpack configuration to handle potential file system issues
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
