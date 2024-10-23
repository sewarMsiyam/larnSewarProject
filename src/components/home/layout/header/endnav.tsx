import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

const EndNav: React.FC = () => {
    const { user, logout } = useUser();
    const router = useRouter();

    const getProfileLink = () => {
        if (user?.userType === 'instructor') {
            return '/instructor/profile';
        }
        return '/profile';
    };

    const getDisplayName = () => {
        if (user?.userType === 'student') {
            if (user.first_name && user.last_name) {
                return `${user.first_name} ${user.last_name}`;
            } else if (user.first_name) {
                return user.first_name;
            } else if (user.last_name) {
                return user.last_name;
            } else {
                return user.name || 'الطالب';
            }
        }
        return user?.name || 'المستخدم';
    };

    const getAvatarFallback = () => {
        if (user?.userType === 'student') {
            if (user.first_name) {
                return user.first_name.charAt(0).toUpperCase();
            } else if (user.name) {
                return user.name.charAt(0).toUpperCase();
            }
        }
        return user?.name?.charAt(0).toUpperCase() || '?';
    };

    const handleLogout = async () => {
        router.push('/student/login');
        await logout();
    };

    return (
        <>
            {user ? (
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <Link href={getProfileLink()} className="flex items-center gap-2">
                        <p>{getDisplayName()}</p>
                        <Avatar>
                            <AvatarImage src={user.image || ''} alt={getDisplayName()} />
                            <AvatarFallback>
                                {getAvatarFallback()}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                    <button onClick={handleLogout} className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1">تسجيل خروج</button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row items-center">
                    <Link href="/student/login" className="before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                        <span className="relative z-10">تسجيل دخول</span>
                    </Link>
                    <Link href="/student/register" className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 relative overflow-hidden border border-primary text-primary transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-color-gradient before:duration-300 before:ease-out hover:text-white hover:shadow-color-gradient hover:before:h-40 before:w-40 before:opacity-80">
                        <span className="relative z-10">إنشاء حساب</span>
                    </Link>
                </div>
            )}
        </>
    );
}

export default EndNav;