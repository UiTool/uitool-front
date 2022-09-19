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
        console.log('entrou')
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
  callbacks: {
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
 
    /*  pages: {
    async signIn({ user, account, profile, email }: any) {
      console.log(user)
      const payLoad = {
        email: email, 
        token: user.token
      }
      switch (account.provider.toLowerCase()) {
        case "google":
          user.token = await fetch("http://localhost:4003/login-google", {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: { "Content-Type": "application/json" }
          })
          return true;

        case "facebook":
          user.token = await fetch("http://localhost:4003/login-facebook", {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: { "Content-Type": "application/json" }
          })
          return true;
          
          default:
            break;
          }
          return false;
        },
      }, */
}

export default NextAuth(authOptions)