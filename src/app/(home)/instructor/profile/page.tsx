import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import Breadcrumb from "@/components/ui/breadcrumbHome"
import ProfileIndex from "@/components/pages/instructorProfile/index"
import Unauthenticated from "@/components/Unauthenticated"
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "سوار -  الملف الشخصي",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
  keywords: ['Next.js', 'SEO', 'website'],
};


export default async function Profile() {
    const session = await getServerSession(authOptions);

    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الملف الشخصي', href: '/Profile', isActive: true }
    ]
    
  return (
    <>
      {session ? (
        <>
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <section>
            <ProfileIndex />
          </section>            
        </>
      ):(
        <Unauthenticated />
      )}
    </>
  );
}
