const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { dev }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },

  experimental: {
    turbo: {
      useSwcLoader: true,
    },
  },
};

module.exports = nextConfig;