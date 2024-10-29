import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import Unauthenticated from "@/components/Unauthenticated"
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import PrivetCourse from "@/components/pages/Profile/PrivetCourse";

export const metadata: Metadata = {
  title: "سوار -  الملف الشخصي",
  description: "نظم تعليمك بسهولة وفعالية أكثر ",
  keywords: ['Next.js', 'SEO', 'website'],
};


export default async function Course() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/student/login?callbackUrl=/instructor/profile");
  }
  const authToken = session.user.authToken;
  if (typeof authToken !== 'string' || !authToken) {
    console.error("Auth token is missing or invalid");
    return <div>An error occurred. Please try logging in again.</div>;
  }

  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الملف الشخصي', href: '/profile', isActive: true }
  ]

  return (
    <>
      {session ? (
        <PrivetCourse token={authToken} />
      ) : (
        <Unauthenticated />
      )}
    </>
  );
}
