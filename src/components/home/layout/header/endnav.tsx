import Link from 'next/link';

export default function EndNav() {
    
    return (
        <div className="flex flex-col md:flex-row items-center">
            <Link href="/login" className="btn-primary m-1">تسجيل دخول</Link>
            <Link href="/register" className="btn-outLine-primary m-1">إنشاء حساب</Link>
        </div>
    );
}