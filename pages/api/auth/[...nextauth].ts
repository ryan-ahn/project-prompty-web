/**
 * Author : Ryan
 * Date : 2023-04-24
 * Desc : next auth
 */

import NextAuth, { Awaitable, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@libs/utils/connectDB';

connectDB();

const nextAuthOptions = () => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
  };
};

const authHandler = (req: any, res: any) => {
  return NextAuth(req, res, nextAuthOptions());
};

export default authHandler;
