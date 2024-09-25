import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      email?: string | null;
      name?: string | null;
      authToken?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    email?: string;
    name?: string;
    authToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await fetch("https://sewaar.net/api/v1/students/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar'
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
        //   console.log(result);

          if (result.status === 200 && result.item) {
            const user = result.item.student;
            // console.log('token:', result.item.token);
            return {
              id: user.id,
              email: user.email,
              name: user.first_name + ' ' + user.last_name,
              token: result.item.token,
            };
          } else {
            throw new Error(result.message || 'Sign in failed.');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      console.log('User:', user);
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.authToken = user.token;
      }
      console.log('JWT Token:', token);
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
          authToken: token.authToken,
        };
      }
      console.log('Session:', session);
      return session;
    },
  },
};