/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'concours-de-photographie.vercel.app',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
