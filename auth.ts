import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginAction } from '@/app/components/form/actions/loginAction'
import { checkFullValidation } from '@/app/components/form/loginFormValidation'

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: {
      label: 'username',
    },
    password: {
      label: 'password',
      type: 'password',
    },
  },
  async authorize(credentials) {
    const { email, password } = credentials as {
      email: string
      password: string
    }
    try {
      var formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      const validation = checkFullValidation(formData)
      if (!validation.success) return null
      const response = await loginAction(formData)
      if (response.isError === false) {
        return {
          name: response.userResponse.username,
          email: response.userResponse.email,
          image: null,
        } as any
      }
    } catch (error) {
      return null
    }
  },
})

const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentialsConfig,
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
    error: '/error',
  },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
