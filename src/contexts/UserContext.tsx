"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface User {
    name?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    image: string | null;
    userType: 'student' | 'instructor';
}

interface UserContextType {
    user: User | null;
    updateUser: (data: Partial<User>) => void;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => { },
    logout: async () => { },
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status, update: updateSession } = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const storedUserData = localStorage.getItem('userData');
            const sessionUser = session.user as any;

            if (storedUserData) {
                setUser(JSON.parse(storedUserData));
            } else {
                const userData: User = {
                    email: sessionUser.email || '',
                    image: sessionUser.image || null,
                    userType: sessionUser.userType || 'student',
                    name: sessionUser.name || '',
                    first_name: sessionUser.first_name || '',
                    last_name: sessionUser.last_name || '',
                };

                setUser(userData);
                localStorage.setItem('userData', JSON.stringify(userData));
            }
        } else if (status === 'unauthenticated') {
            setUser(null);
            localStorage.removeItem('userData');
        }
    }, [session, status]);

    const updateUser = async (data: Partial<User>) => {
        setUser(prev => {
            if (!prev) return null;
            const updatedUser = { ...prev, ...data };
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            return updatedUser;
        });

        if (session) {
            await updateSession({
                ...session,
                user: {
                    ...session.user,
                    ...data
                }
            });
        }
    };

    const logout = async () => {
        localStorage.removeItem('userData');
        setUser(null);

        await signOut({ redirect: false });
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};