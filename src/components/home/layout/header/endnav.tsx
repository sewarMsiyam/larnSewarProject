import Link from 'next/link';

export default function EndNav() {
    return (
        <div className="flex flex-col md:flex-row items-center">
            <Link href="/login" className="btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1">تسجيل دخول</Link>
            <Link href="/register" className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1">إنشاء حساب</Link>
        </div> 
    );
}