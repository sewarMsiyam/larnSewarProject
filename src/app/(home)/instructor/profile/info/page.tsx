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


export default async function Private() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/student/login?callbackUrl=/instructor/profile");
    }
    const authToken = session.user.authToken;
    if (typeof authToken !== 'string' || !authToken) {
        console.error("Auth token is missing or invalid");
        return <div>An error occurred. Please try logging in again.</div>;
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
