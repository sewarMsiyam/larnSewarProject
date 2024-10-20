import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import Breadcrumb from "@/components/ui/breadcrumbHome"
import Lessons from "@/components/pages/Profile/Lessons"
import Unauthenticated from "@/components/Unauthenticated"
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
interface DetailCourseProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "سوار - الصفحة الئيسية",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
  keywords: ['Next.js', 'SEO', 'website'],
};


export default async function Profile({ params }: DetailCourseProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
          redirect("/student/login?callbackUrl=/profile");
      }
      const authToken = session.user.authToken;
      if (typeof authToken !== 'string' || !authToken) {
          console.error("Auth token is missing or invalid");
          return <div>An error occurred. Please try logging in again.</div>;
      }

    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات ', href: '/Profile', isActive: true },
        { label: 'الدروس ', href: '#', isActive: true }
    ]
    
  return (
    <>
      {session ? (
        <>
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <section>
            <Lessons token={authToken} id={params.id.toString()} />
          </section>            
        </>
      ):(
        <Unauthenticated />
      )}
    </>
  );
}
