import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '../../prisma/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import NextAuth from 'next-auth'
import { authConfig } from './auth-config'

export const config = {
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 30
  },
  adapter: PrismaAdapter(db),
  providers: [CredentialsProvider({
    credentials: {
      email: { type: 'email' },
      password: { type: 'password' }
    },
    //@ts-expect-error its broken
    async authorize(credentials) {
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
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub
      session.user.role = token.role
      session.user.name = token.name

      //if there is an update
      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role

        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0]

          await db.user.update({
            where: {
              id: user.id
            },
            data: {
              name: token.name
            }
          })
        }
      }
      return token
    },
    ...authConfig.callbacks,
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(config) 
