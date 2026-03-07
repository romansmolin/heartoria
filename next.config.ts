import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactCompiler: true,
    serverExternalPackages: ['reflect-metadata'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
            {
                protocol: 'https',
                hostname: 'upstash.com',
            },
        ],
    },
}

export default nextConfig
