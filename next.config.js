require('dotenv').config();

module.exports = {
  distDir: 'build',
  env: {
    PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    API_HOST: process.env.API_HOST,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    CHAT_GPT_KEY: process.env.CHAT_GPT_KEY,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MONGODB_PROD_URL: process.env.MONGODB_PROD_URL,
    MONGODB_DEV_URL: process.env.MONGODB_DEV_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
};
