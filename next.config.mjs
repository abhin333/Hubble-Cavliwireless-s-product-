/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // If running in Docker, fallback to host.docker.internal or backend service name
    const backendUrl = process.env.BACKEND_URL || 'http://host.docker.internal:8000';

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;