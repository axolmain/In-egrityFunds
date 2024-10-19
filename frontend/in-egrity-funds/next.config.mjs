import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Disable ESLint during production builds
    },
    reactStrictMode: false,  // Correct place for reactStrictMode
    // Add other Next.js configurations here if needed
};

export default withPWA({
    dest: 'public',         // Destination for the PWA files
    register: true,         // Auto-register the service worker
    skipWaiting: true,      // Skip waiting phase for the SW
    runtimeCaching,         // Runtime caching strategy
    buildExcludes: [/middleware-manifest\.json$/], // Exclude middleware manifest from cache
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    disable: false,    // You can also add an "exclude" option here to exclude specific files from caching if needed
    exclude: [
        // Example to exclude files from being cached
        /\.map$/, // Source maps
        /manifest\..*\.js(?:on)?$/, // Manifest files
        /\.json$/, // Other JSON files
    ]
})(nextConfig);
