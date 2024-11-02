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
interface SessionUser {
  authToken?: string;
  userType?: 'student' | 'instructor';
  [key: string]: any;
}

interface Session {
  user?: SessionUser;
  [key: string]: any;
}

export default async function Profile() {
  const session: Session | null = await getServerSession(authOptions);
 
    if (!session || !session.user) {
      redirect("/instructor/login?callbackUrl=/instructor/profile");
    }
    const { authToken, userType } = session.user;

    if (!authToken || typeof authToken !== 'string') {
      console.error("Auth token is missing or invalid");
      redirect("/instructor/login?callbackUrl=/instructor/profile&error=invalid_token");
    }

    
    if (userType && userType == 'student') {
      redirect("/profile");
    }
    
    if (userType && userType !== 'instructor') {
      redirect("/unauthorized");
    }
    
  return (
    <>
      {session ? (
        <>
          {/* <Breadcrumb breadcrumbs={breadcrumbs} /> */}
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
