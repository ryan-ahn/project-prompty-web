/**
 * Author : Ryan
 * Date : 2023-04-25
 * Desc : dbConnext
 */

import mongoose from 'mongoose';

const url =
  process.env.NODE_ENV === 'development'
    ? (process.env.MONGODB_DEV_URL as string)
    : (process.env.MONGODB_PROD_URL as string);

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    mongoose.set('autoCreate', true);
  } catch (err: any) {
    process.exit(1);
  }
};

export default connectDB;
