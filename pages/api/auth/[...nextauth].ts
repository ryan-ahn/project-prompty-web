/**
 * Author : Ryan
 * Date : 2023-04-24
 * Desc : next auth
 */

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@libs/utils/connectDB';

connectDB();

type TRedirect = {
  url: string;
  baseUrl: string;
};

const nextAuthOptions = (req: any, res: any) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    callbacks: {
      async redirect({ url, baseUrl }: TRedirect) {
        if (url.startsWith(`${baseUrl}/signin`)) return `/`;
        else return url;
      },
    },
  };
};

const authHandler = (req: any, res: any) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;
