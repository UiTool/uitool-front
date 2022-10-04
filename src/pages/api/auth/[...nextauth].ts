import { api } from './../../../services/api';
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'uitool',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        }; 

        const res = await api.post('/account/login', payload)
        const { data } = res;

        if (res.status != 200) {
          throw new Error(data.exception);
        }
       
        if (data) {
          const response = {
            name: data.user.name,
            email: data.user.email,
            token: data.token
          }
          return response;
        }

        return null;
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: '/login'
  },
  jwt: {
    secret: "ceaRbREYIOAqKg0YcDn8G5EoGcOXmxGxKaWav3qVNP8huxw5LkniLgao7FeScu-999m3mPHISyPsrPcLLJbu8A"
  },
  callbacks: {
    async signIn({user, account, profile} : any) {
      if (account.provider === "google") {
        const res = await api.post('account/login', {email: 'john@email.com', password: '123'})
        const { data } = res;
        user.token = data.token;
        return true;
      }

      return true;
    },
    async jwt({ token, user, account } : any) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
        };
      }

      return token;
    },
    async session({ session, token } : any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
}

export default NextAuth(authOptions)