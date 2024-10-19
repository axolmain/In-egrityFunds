import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Disable ESLint during production builds
    },
    reactStrictMode: true,  // Correct place for reactStrictMode
    // Add other Next.js configurations here if needed
};

export default withPWA({
    dest: 'public',         // Destination for the PWA files
    register: true,         // Auto-register the service worker
    skipWaiting: true,      // Skip waiting phase for the SW
    buildExcludes: [/middleware-manifest\.json$/], // Exclude middleware manifest from cache
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
})(nextConfig);
