"use client";
import LogoFooter from "@/components/home/layout/footer/logoFooter";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const RightSection = () => {
    const pathname = usePathname();
    const routes = {
        '/student/login': { to: '/instructor/login', text: 'الدخول كـ معلم', description: 'لا تفوت فرصة تطوير مهاراتك وتحقيق طموحاتك! انضم الآن إلى منصتنا التعليمية وابدأ رحلة التعلم نحو مستقبل أفضل!' },
        '/instructor/login': { to: '/student/login', text: 'الدخول كـ طالب', description: 'إن كنت تمتلك مهارات التعلم الالكتروني أو التدريس اونلاين، نرحب بك لتكون ضمن أسرة منصتنا التعليمية!' },
        '/student/register': { to: '/instructor/register', text: 'التسجيل كـ معلم', description: 'لا تفوت فرصة تطوير مهاراتك وتحقيق طموحاتك! انضم الآن إلى منصتنا التعليمية وابدأ رحلة التعلم نحو مستقبل أفضل!' },
        '/instructor/register': { to: '/student/register', text: 'التسجيل كـ طالب', description: 'إن كنت تمتلك مهارات التعلم الالكتروني أو التدريس اونلاين، نرحب بك لتكون ضمن أسرة منصتنا التعليمية!' }
    };

    const currentRoute = routes[pathname];
    
    return (
        <div className='bg-Auth-gradient lg:basis-1/4'>
            <div className="flex flex-col justify-center items-center h-full p-12 m-auto">
                <LogoFooter />
                <p className="text-white text-center opacity-80 my-5">
                    {currentRoute ? currentRoute.description : ''}
                </p>
                {currentRoute && (
                    <Link
                        href={currentRoute.to}
                        className='text-white border-2 border-white rounded-2xl font-medium py-2 px-5 flex'
                    >
                        {currentRoute.text}
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
                )}
            </div>
        </div>
    );
}

export default RightSection;