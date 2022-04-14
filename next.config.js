require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
  },
};

module.exports = nextConfig;
