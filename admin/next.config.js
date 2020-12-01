/* next.config.js */
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/
    });
    return config;
  }
};
