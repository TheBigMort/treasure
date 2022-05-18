require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    NEXT_PUBLIC_MINTDATE: process.env.NEXT_PUBLIC_MINTDATE,
  },
  node: {
    dns: 'empty'
  }
};

module.exports = nextConfig;
