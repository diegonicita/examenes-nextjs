import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import executeQuery from '@/app/server-actions/helpers/mysqldb'
import bcrypt from 'bcryptjs'
import { RowDataPacket } from 'mysql2'

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: {
      label: 'User Name',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },
  async authorize(credentials) {
    const { email, password } = credentials as {
      email: string
      password: string
    }
    try {
      const query = `SELECT * FROM usuarios WHERE email = ?`
      const user = (await executeQuery(query, [email])) as RowDataPacket
      if (!user) return null
      const hash = user[0]?.password
      if (!hash) return null
      const passwordMatch = bcrypt.compareSync(password, hash)
      if (passwordMatch)
        return {
          name: user[0].username,
          email: user[0].email,
          image: null,
        }
      else return null
    } catch (error) {
      return null
    }
  },
})

const config = {
  providers: [
    Google,
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentialsConfig,
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/middlewareProtected') return !!auth
      return true
    },
  },
  trustHost: true,  
  pages: {
    signIn: '/login',    
    error: '/login',
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
