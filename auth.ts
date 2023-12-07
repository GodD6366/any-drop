import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import NextAuth, { getServerSession } from 'next-auth';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

const prisma: PrismaClient = new PrismaClient();

export const authOptions: NextAuthOptions = {
  //debug: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      // 登录按钮显示 (e.g. "Sign in with Credentials")
      name: 'Credentials',
      // credentials 用于配置登录页面的表单
      credentials: {
        name: {
          label: '账户名',
          type: 'text',
          placeholder: '请输入账户名',
        },
        password: {
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      async authorize(credentials, req) {
        const maybeUser = await prisma.user.findFirst({
          where: {
            name: credentials?.name,
            pwd: credentials?.password,
          },
        });

        console.warn(
          `\nGODD_LOG -> file: auth.ts:44 -> authorize -> maybeUser:`,
          maybeUser,
        );

        if (maybeUser) {
          // 返回的对象将保存才JWT 的用户属性中
          return maybeUser;
        } else {
          // 如果返回null，则会显示一个错误，建议用户检查其详细信息。
          return null;
          // 跳转到错误页面，并且携带错误信息 http://localhost:3000/api/auth/error?error=用户名或密码错误
          //throw new Error("用户名或密码错误");
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.warn(`\nGODD_LOG -> file: auth.ts:71 -> jwt -> user:`, user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      console.warn(
        `\nGODD_LOG -> file: auth.ts:77 -> session: -> token:`,
        token,
      );
      console.warn(
        `\nGODD_LOG -> file: auth.ts:76 -> session: -> session:`,
        session,
      );
      if (session?.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const handlers = NextAuth(authOptions);

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
