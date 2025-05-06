import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/*',
      },

      // Tips: 下面的配置都没有经过完整测试，可能会有问题。
      // Gravatar（允许任意查询参数、深层路径）
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      // Twitter（允许任意查询参数）
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/profile_images/*/*',
      },
      // Facebook（允许任意查询参数）
      {
        protocol: 'https',
        hostname: 'graph.facebook.com',
        port: '',
        pathname: '/**/picture',
      },
      // Google 用户头像（允许任意查询参数、任意深度路径）
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      // Discord（允许任意查询参数）
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/*/*',
      },
      // Slack（任意子域，任意深度路径）
      {
        protocol: 'https',
        hostname: '**.slack-edge.com',
        port: '',
        pathname: '/avatars/**',
      },
      // LinkedIn（允许任意查询参数、深层路径）
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/mpr/mpr/**',
      },
      // Instagram（多级子域，任意深度路径）
      {
        protocol: 'https',
        hostname: 'instagram.**.fbcdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  (async () => {
    await setupDevPlatform();
  })();
}

export default nextConfig;
