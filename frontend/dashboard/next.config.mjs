/** @type {import('next').NextConfig} */
import runtimeCaching from 'next-pwa/cache.js';
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    // disable: process.env.NODE_ENV === "development",
});

const nextConfig = pwaConfig({
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
});

export default nextConfig;