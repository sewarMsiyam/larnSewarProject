import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import Breadcrumb from "@/components/ui/breadcrumbHome"
import ProfileIndex from "@/components/pages/Profile/index"


export const metadata: Metadata = {
  title: "سوار - الصفحة الئيسية",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
  keywords: ['Next.js', 'SEO', 'website'],
};

export default function Profile() {
    const t = useTranslations('HomePage');
    
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الملف الشخصي', href: '/Profile', isActive: true }
    ]
    
  return (
    <>
        <Breadcrumb breadcrumbs={breadcrumbs} />

        <section className="container">
            <ProfileIndex />
        </section>

    </>
  );
}
