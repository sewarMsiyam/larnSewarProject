import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const {
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  API_URL,
} = process.env;

if (!NEXTAUTH_SECRET || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !API_URL) {
  throw new Error('Missing environment variables');
}

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
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
              'Accept-Language': 'ar',
              'Authorization': `Bearer 1|5hbRkuSLBeVcqL8OtbqMrVZh8QcL4EZHPZIXFLax`,
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();

          if (result.status === 200 && result.item) {
            const user = result.item.student;
            return {
              id: user.id,
              email: user.email,
              name: user.name,
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
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
