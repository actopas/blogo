import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { SiweMessage } from 'siwe';
import type { SiweMessage as SiweMessageType } from 'siwe';

import { NODE_ENV } from '@/config';

import { PATHS } from '@/constants';

import { prisma } from './prisma';

export const { handlers, auth, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  trustHost: true,
  providers: [
    Credentials({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        const siwe = new SiweMessage(
          JSON.parse(
            credentials?.message as string,
          ) as Partial<SiweMessageType>,
        );
        const result = await siwe.verify({
          signature: credentials?.signature as string,
        });
        if (result.success) {
          return {
            id: siwe.address,
            name: siwe.address,
          };
        }
        return null;
      },
    }),
    // Allow multiple accounts to be associated with the same user (email same)
    GithubProvider({ allowDangerousEmailAccountLinking: true }),
    GoogleProvider({ allowDangerousEmailAccountLinking: true }),
  ],
  pages: {
    signIn: PATHS.AUTH_SIGNIN,
  },
  debug: NODE_ENV === 'development',
  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    authorized({ request, auth }) {
      // Will be used as Next.js middleware, check if logged in if accessing admin pages
      if (request.nextUrl.pathname.startsWith(PATHS.ADMIN_HOME)) {
        return !!auth?.user;
      }

      // Other paths are directly allowed
      return true;
    },
  },
});
