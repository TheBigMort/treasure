require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    NEXT_PUBLIC_MINTDATE: '05/05/2022 16:00:00'
  },
};

module.exports = nextConfig;
