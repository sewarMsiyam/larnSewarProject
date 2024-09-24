import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
    session: Session | null;
}
const EndNav: React.FC<HeaderProps> = ({ session }) => {

    return (
        <>
            {session?.user ? (
                <div className="flex flex-col md:flex-row items-center gap-5">

                    <Link href="/profile" className="flex items-center gap-2">
                        <p>{session.user?.name}</p>
                        <Avatar>
                            <AvatarImage src={session.user?.image as string} alt={session.user?.email || 'User Avatar'} />
                            <AvatarFallback>
                                {session.user?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    <button onClick={() => signOut()} className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1">تسجيل خروج</button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row items-center">
                    <Link href="/login" className="before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                        <span className="relative z-10">تسجيل دخول</span>
                    </Link>
                    <Link href="/register" className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 relative overflow-hidden border border-primary text-primary transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-color-gradient before:duration-300 before:ease-out hover:text-white hover:shadow-color-gradient hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                        <span className="relative z-10">إنشاء حساب</span> 
                    </Link>
                </div>
            )}
        </>
    );
}
export default EndNav;