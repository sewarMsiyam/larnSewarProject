"use client"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import '@/app/globals.css'
import clsx from 'clsx'

const navigationItems = [
    {
        href: '/profile',
        icon: '/profileIcon/course.svg',
        label: 'كورساتي',
        alt: 'الكورسات'
    },
    {
        href: '/profile/private',
        icon: '/profileIcon/information.svg',
        label: 'معلم خصوصي',
        alt: 'خصوصي'
    },
    {
        href: '/profile/info',
        icon: '/profileIcon/information.svg',
        label: ' الاعدادات',
        alt: 'الاعدادات'
    }
]

export default function Navigation() {
    const pathname = usePathname()

    return (
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-10">
            {navigationItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                        "flex flex-col justify-center items-center border w-fit lg:w-[200px] p-5 rounded-2xl transition-all duration-300",
                        "hover:bg-[#E6F8F3] hover:border-primary hover:text-primary",
                        pathname === item.href
                            ? "border-primary bg-[#E6F8F3] text-primary shadow-sm"
                            : "border-white bg-white shadow"
                    )}
                >
                    <Image
                        src={item.icon}
                        alt={item.alt}
                        width={30}
                        height={30}
                    />
                    <span className="mt-3 font-bold">{item.label}</span>
                </Link>
            ))}
        </div>
    )
}
