import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import Unauthenticated from "@/components/Unauthenticated"
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import UpdateInformation from "@/components/pages/Profile/UpdateInformation";

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

export default async function Course() {
  const session: Session | null = await getServerSession(authOptions);
 
  if (!session || !session.user) {
    redirect("/student/login?callbackUrl=/profile/info");
  }
  const { authToken, userType } = session.user;

  if (!authToken || typeof authToken !== 'string') {
    console.error("Auth token is missing or invalid");
    redirect("/student/login?callbackUrl=/profile/info&error=invalid_token");
  }

  
  if (userType && userType == 'instructor') {
    redirect("/instructor/profile/info");
  }
  
  if (userType && userType !== 'student') {
    redirect("/unauthorized");
  }
  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الملف الشخصي', href: '/profile', isActive: true },
    { label: 'بياناتك الشخصية', href: '/profile/info', isActive: true }

  ]

  return (
    <>
      {session ? (
        <UpdateInformation token={authToken} />
      ) : (
        <Unauthenticated />
      )}
    </>
  );
}
