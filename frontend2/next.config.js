/** @type {import('next').NextConfig} */

module.exports = {
  //reactStrictMode: true,
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      process: false,
      path: false,
      os: false,
      util: false,
      stream: false,
      buffer: false,
      crypto: false,
    };
    return config;
  },
};

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
