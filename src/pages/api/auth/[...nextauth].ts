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

        const res = await fetch('http://localhost:4003/account/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.exception);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          const response = {
            name: user.user.name,
            email: user.user.email,
            token: user.token
          }
          return response;
        }

        // Return null if user data could not be retrieved
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
      session.user.accessToken = token.accessToken;
      console.log(session)
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
          user.accessToken = await fetch("http://localhost:4003/login-google", {
            method: 'POST',
            body: JSON.stringify(payLoad),
            headers: { "Content-Type": "application/json" }
          })
          return true;

        case "facebook":
          user.accessToken = await fetch("http://localhost:4003/login-facebook", {
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