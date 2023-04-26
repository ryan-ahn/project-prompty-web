require('dotenv').config();

module.exports = {
  distDir: 'build',
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    CHAT_GPT_KEY: process.env.CHAT_GPT_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MONGODB_PROD_URL: process.env.MONGODB_PROD_URL,
    MONGODB_DEV_URL: process.env.MONGODB_DEV_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
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
