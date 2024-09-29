"use client";
import LogoFooter from "@/components/home/layout/footer/logoFooter";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const RightSection = () => {
    const pathname = usePathname();

    let linkElement;
    if (pathname === '/student/login') {
        linkElement = (
            <Link
                href="/instructor/login"
                className='text-white border-2 border-white rounded-2xl font-medium py-2 px-5 flex'
            >
                الدخول كـ معلم
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g clipPath="url(#clip0_444_317)">
                        <path d="M8.82748 14.0963L12.9136 18.1824L11.8364 19.2595L5.91147 13.3346L11.8364 7.40961L12.9136 8.48673L8.82748 12.5728H18.0996V14.0963H8.82748Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_444_317">
                            <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24.0059 24.2775)" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
        );
    } else if (pathname === '/instructor/login') {
        linkElement = (
            <Link
                href="/student/login"
                className='text-white border-2 border-white rounded-2xl font-medium py-2 px-5 flex mb-4'
            >
                الدخول كـ طالب
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g clipPath="url(#clip0_444_317)">
                        <path d="M8.82748 14.0963L12.9136 18.1824L11.8364 19.2595L5.91147 13.3346L11.8364 7.40961L12.9136 8.48673L8.82748 12.5728H18.0996V14.0963H8.82748Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_444_317">
                            <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24.0059 24.2775)" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
        );
    }else if (pathname === '/student/register') {
        linkElement = (
            <Link
                href="/instructor/register"
                className='text-white border-2 border-white rounded-2xl font-medium py-2 px-5 flex'
            >
                التسجيل كـ معلم
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g clipPath="url(#clip0_444_317)">
                        <path d="M8.82748 14.0963L12.9136 18.1824L11.8364 19.2595L5.91147 13.3346L11.8364 7.40961L12.9136 8.48673L8.82748 12.5728H18.0996V14.0963H8.82748Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_444_317">
                            <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24.0059 24.2775)" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
        );
    } else if (pathname === '/instructor/register') {
        linkElement = (
            <Link
                href="/student/register"
                className='text-white border-2 border-white rounded-2xl font-medium py-2 px-5 flex mb-4'
            >
                التسجيل كـ طالب
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <g clipPath="url(#clip0_444_317)">
                        <path d="M8.82748 14.0963L12.9136 18.1824L11.8364 19.2595L5.91147 13.3346L11.8364 7.40961L12.9136 8.48673L8.82748 12.5728H18.0996V14.0963H8.82748Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_444_317">
                            <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24.0059 24.2775)" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
        );
    }
    return (

        <div className='bg-Auth-gradient lg:basis-1/4'>
            <div className="flex flex-col justify-center items-center h-full p-12 m-auto">
                <LogoFooter />
                <p className="text-white text-center opacity-80 my-5">
                    لا تفوت فرصة تطوير مهاراتك وتحقيق طموحاتك! انضم الآن إلى منصتنا التعليمية وابدأ رحلة التعلم نحو مستقبل أفضل!
                </p>
                {linkElement}
            </div>
        </div>
    );
}

export default RightSection;