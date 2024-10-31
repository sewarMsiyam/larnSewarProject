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

interface SessionUser {
  authToken?: string;
  userType?: 'student' | 'instructor';
  [key: string]: any;
}

interface Session {
  user?: SessionUser;
  [key: string]: any;
}


export default async function Profile({ params }: DetailCourseProps) {
      const session: Session | null = await getServerSession(authOptions);
 
  if (!session || !session.user) {
    redirect("/student/login?callbackUrl=/profile");
  }
  const { authToken, userType } = session.user;

  if (!authToken || typeof authToken !== 'string') {
    console.error("Auth token is missing or invalid");
    redirect("/student/login?callbackUrl=/profile&error=invalid_token");
  }

  
  if (userType && userType == 'instructor') {
    redirect("/instructor/profile/courses");
  }
  
  if (userType && userType !== 'student') {
    redirect("/unauthorized");
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
