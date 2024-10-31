import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import Unauthenticated from "@/components/Unauthenticated"
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import HouerLib from "@/components/pages/instructorProfile/houerLib";
import UpdateInformation from "@/components/pages/instructorProfile/UpdateInformation";

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

export default async function Private() {
        const session: Session | null = await getServerSession(authOptions);
 
    if (!session || !session.user) {
      redirect("/instructor/login?callbackUrl=/instructor/profile/info");
    }
    const { authToken, userType } = session.user;

    if (!authToken || typeof authToken !== 'string') {
      console.error("Auth token is missing or invalid");
      redirect("/instructor/login?callbackUrl=/instructor/profile/info&error=invalid_token");
    }

    
    if (userType && userType == 'student') {
      redirect("/profile/info");
    }
    
    if (userType && userType !== 'instructor') {
      redirect("/unauthorized");
    }
    return (
        <>
          {session ? (
            <UpdateInformation token={authToken}  />
          ) : (
            <Unauthenticated />
          )}
        </>
    );
}
