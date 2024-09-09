import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
    CredentialsProvider({
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "Enter your phone number" },
        phone_code: { label: "Phone Code", type: "text", placeholder: "Enter your phone code" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
        token: { label: "token", type: "token", placeholder: "Enter your token" },
     },
      async authorize(credentials) {
        const { phone, phone_code, password , token } = credentials as {
          phone: string;
          phone_code: string;
          password: string;
          token: string;
        };

        try {
          const response = await fetch('https://www.sewaar.net/api/v1/students/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone: phone,
              phone_code: phone_code,
              password: password,
              token: token,
            }),
          });
    
          const result = await response.json();
    
          if (response.ok && result.success && result.data && result.data.token) {
            // توليد التوكن باستخدام JWT
            const newToken = jwt.sign(
              { id: result.data.student.id, phone: result.data.student.phone },
              process.env.NEXTAUTH_SECRET as string,
              { expiresIn: "1h" }
            );
            // إرجاع بيانات المستخدم مع التوكن الجديد
            return {
              id: result.data.student.id,
              phone: result.data.student.phone,
              phoneCode: result.data.student.phone_code,
              email: result.data.student.email,
              token: newToken, // إرجاع التوكن
            };
          } else {
            throw new Error(result.message || 'Sign in failed. Check the details you provided.');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          return null; 
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Custom sign-in page URL
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.phoneCode = user.phoneCode;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          phone: token.phone as string,
          phoneCode: token.phoneCode as string,
          email: token.email as string,
          token: token.token as string,
        };
      }
      return session;
    },
  },
};

// Named exports for each HTTP method
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
