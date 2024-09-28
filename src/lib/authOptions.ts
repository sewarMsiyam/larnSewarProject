import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

type UserType = 'student' | 'instructor';

interface CustomUser extends User {
  token: string;
  userType: UserType;
}

const createCredentialsProvider = (userType: UserType) => 
  CredentialsProvider({
    id: `${userType}-credentials`,
    name: `${userType.charAt(0).toUpperCase() + userType.slice(1)} Credentials`,
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
        const response = await fetch(`https://sewaar.net/api/v1/${userType}s/login`, {
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

        if (result.status === 200 && result.item) {
          const user = result.item[userType];
          return {
            id: user.id,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            token: result.item.token,
            userType: userType,
          };
        } else {
          throw new Error(result.message || 'Sign in failed.');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        return null;
      }
    },
  });

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      authToken: string;
      userType: UserType;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    authToken: string;
    userType: UserType;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    createCredentialsProvider('student'),
    createCredentialsProvider('instructor'),
  ],
  pages: {
    signIn: '/student/login'
    // signIn: ({ userType }: SignInContext) => {
    //   return userType === 'instructor' ? '/instructor/login' : '';
    // },
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.authToken = customUser.token;
        token.userType = customUser.userType;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        authToken: token.authToken,
        userType: token.userType,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If it's the sign-in page, we can't determine the user type yet
      if (url.startsWith('/student/login')) {
        return url;
      }
      // For other pages, if it's a relative URL, we prepend the base URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // If it's already an absolute URL within the same site, we allow it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default: redirect to the base URL
      return baseUrl;
    },
  },
};