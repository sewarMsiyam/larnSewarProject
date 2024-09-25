import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: 'students-login',
            name: 'Students Login',
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
                    console.log(result);
                    if (result.status === 200 && result.item) {
                        const user = result.item.student;
                        console.log('token:', result.item.token);
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            token: result.item.token, // Store the token here
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
        CredentialsProvider({
              id: 'instructors-login',
            name: 'Instructors Login',
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
                    const response = await fetch("https://sewaar.net/api/v1/instructors/login", {
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
                    console.log(result);
                    if (result.status === 200 && result.item) {
                        const user = result.item.teacher;
                        console.log('token:', result.item.token);
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
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
        async jwt({ token, user }) {
            console.log('User:', user);
            if (user) {
                token.email = user.email!;
                token.name = user.name!;
                token.authToken = user.token; // Store the token in the JWT
            }
            console.log('JWT Token:', token); // Print the JWT token
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email as string,
                    name: token.name as string,
                    authToken: token.authToken, // Add token to session
                };
            }
            console.log('Session:', session); // Print the session
            return session;
        },
    },
};
