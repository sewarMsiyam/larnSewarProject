import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
    session: Session | null;
}
const EndNav: React.FC<HeaderProps> = ({ session }) => {
    // const NameInitial = session.user?.first_name?.charAt(0) + session.user?.last_name?.charAt(0);
    
    return (
        <>
            {session?.user ? (
                <div className="flex flex-col md:flex-row items-center gap-5">

                    <Link href="/" className="flex items-center gap-2">
                        <p>{session.user?.name}</p>
                        <Avatar>
                            <AvatarImage src={session.user?.image as string} alt={session.user?.email || 'User Avatar'} />
                            <AvatarFallback>
                                se
                                {/* {NameInitial} */} 
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    <button onClick={() => signOut()} className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1">تسجيل خروج</button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row items-center">
                    <Link href="/login" className="btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1">تسجيل دخول</Link>
                    <Link href="/register" className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1">إنشاء حساب</Link>
                </div>
            )}
        </>
    );
}
export default EndNav;