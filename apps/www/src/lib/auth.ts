import { betterAuth } from "better-auth";
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from "./db";
import { createAuthMiddleware, } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { env } from "env.mjs";



export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  hooks: {
    before: createAuthMiddleware(async (ctx) => {}),
  },
  account: {},
  plugins: [nextCookies()],
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          console.log('session created', session)
        }
      }
    },
    user: {
      update: {
        before: async (session) => {
          console.log("session update before", session, session);
        },
        after: async (session) => {
          console.log("session update after", session, session);
        },
      },
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID!,
      clientSecret: env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    },
  }
});