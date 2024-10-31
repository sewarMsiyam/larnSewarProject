import type { Metadata } from "next";
import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import CourseUser from "@/components/pages/Profile/courseUser";

export const metadata: Metadata = {
  title: "سوار -  الملف الشخصي",
  description: "نظم تعليمك بسهولة وفعالية أكثر",
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
    redirect("/student/login?callbackUrl=/profile");
  }
  const { authToken, userType } = session.user;

  if (!authToken || typeof authToken !== 'string') {
    console.error("Auth token is missing or invalid");
    redirect("/student/login?callbackUrl=/profile&error=invalid_token");
  }

  if (userType && userType == 'instructor') {
    redirect("/instructor/profile");
  }
  
  if (userType && userType !== 'student') {
    redirect("/unauthorized");
  }

  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الملف الشخصي', href: '/profile', isActive: true }
  ];

  try {
    return <CourseUser token={authToken} />;
  } catch (error) {
    console.error("Error rendering CourseUser:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-bold text-red-600 mb-2">عذراً، حدث خطأ</h2>
        <p className="text-gray-600">يرجى تحديث الصفحة أو تسجيل الدخول مرة أخرى</p>
      </div>
    );
  }
}