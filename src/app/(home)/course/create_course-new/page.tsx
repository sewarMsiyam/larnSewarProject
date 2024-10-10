import { authOptions } from "@/lib/authOptions";
import CoursesHome from "@/components/home/body/coursesHome";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import CreateCourse from "@/components/pages/crudCourse/CreateCourse";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"
import { redirect } from "next/navigation";

export default async function Courses() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/student/login?callbackUrl=/course/create_course-new");
    }
    const authToken = session.user.authToken;
    if (typeof authToken !== 'string' || !authToken) {
        console.error("Auth token is missing or invalid");
        return <div>An error occurred. Please try logging in again.</div>;
    }
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات', href: '/instructor', isActive: true }
    ]

    return (
        <>
              {session ? (
                    <>
                        <Breadcrumb breadcrumbs={breadcrumbs} />
                        <CreateCourse token={authToken} />
                    </>
                ):(
                    <Unauthenticated />
                )}
    </>
    );
};