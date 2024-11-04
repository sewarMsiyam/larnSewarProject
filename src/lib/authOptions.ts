import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

type UserType = 'student' | 'instructor';

interface CustomUser extends User {
  token: string;
  userType: UserType;
  image: string;

}
const formatName = (user: any, userType: UserType): string => {
  if (userType === 'student') {
    return `${user.first_name || ''} ${user.last_name || ''}`.trim();
  } else if (userType === 'instructor') {
    return user.name || '';
  }
  return '';
};

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
        
        const result = await response.json();

        if (result.status === 200 && result.item) {
          const user = result.item[userType];
          return {
            id: user.id,
            email: user.email,
            name: formatName(user, userType),
            image: user.image || null,
            token: result.item.token,
            userType: userType,
          };
        }
        
        throw new Error(result.message || 'فشل تسجيل الدخول');
        
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'حدث خطأ أثناء تسجيل الدخول');
      }
    },
  });

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string | null;
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
    image: string | null;
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
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.image = customUser.image || null;
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
        image: token.image,
        authToken: token.authToken,
        userType: token.userType,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/student/login')) {
        return url;
      }
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
};