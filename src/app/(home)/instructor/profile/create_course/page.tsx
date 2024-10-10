import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import Breadcrumb from "@/components/ui/breadcrumbHome"
import ProfileIndex from "@/components/pages/instructorProfile/index"
import Unauthenticated from "@/components/Unauthenticated"
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import Link from 'next/link';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "سوار -  الملف الشخصي",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
  keywords: ['Next.js', 'SEO', 'website'],
};


export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      redirect(`/student/login?callbackUrl=/instructor/profile/create_course`);
    }
    const authToken = session.user.authToken;
    if (typeof authToken !== 'string' || !authToken) {
      console.error("Auth token is missing or invalid");
      return <div>An error occurred. Please try logging in again.</div>;
    }
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
            <ProfileIndex token={authToken} />
          </section>            
        </>
      ):(
        <Unauthenticated />
      )}
    </>
  );
}
