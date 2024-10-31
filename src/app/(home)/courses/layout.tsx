'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import TitleSection from '@/components/title';
import Breadcrumb from "@/components/ui/breadcrumbHome";

interface LayoutProps {
    children: React.ReactNode;
}

function NavLinks() {
    const pathname = usePathname();

    const links = [
        { href: "/courses/tawjihi", label: "طالب توجيهي" },
        { href: "/courses/university", label: "طالب جامعة" }
    ];

    return (
        <div className="inline-flex h-12 items-center justify-center bg-[#EAEAEA] px-2 rounded-full text-[#333333] mb-5 gap-6">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 ${pathname === link.href
                            ? "bg-primary text-white rounded-full py-1 px-5"
                            : "text-[#333333] px-3"
                        }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}

export default function RootLayout({ children }: LayoutProps) {
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات ', href: '/courses', isActive: true }
    ];

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <section className="md:container my-11">
                <TitleSection text="الدروس التعليمية" />
                <div className='flex justify-center items-center'>
                    <NavLinks />
                </div>
                {children}
            </section>
        </>
    );
}