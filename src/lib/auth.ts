import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '../../prisma/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'

export const config = {
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 30
  },
  adapter: PrismaAdapter(db),
  providers: [CredentialsProvider({
    credentials: {
      email: { type: 'email' },
      password: {type: 'password'}
    },
    //@ts-expect-error its broken
    async authorize(credentials){
      if (credentials === null) return null
      
      //find the user in the db
      const user = await db.user.findFirst({
        where: {
          email: credentials.email as string
        }
      })

      //check if the user exits and if the password matches
      if (user && user.password) {
        const isMatch = compareSync(credentials.password as string, user.password)

        //if password is correct, then return the user
        if (isMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }

        return null
      }
    }
  })],
  callbacks: {
    async session({ session, user, trigger, token }) {
      //@ts-expect-error it will pass
      session.user.id = token.sub

      //if there is an update
      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    }
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config) 