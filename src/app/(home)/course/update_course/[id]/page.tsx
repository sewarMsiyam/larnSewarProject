import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import CoursesHome from "@/components/home/body/coursesHome";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import UpdateCourse from "@/components/pages/crudCourse/UpdateCourse";
import Unauthenticated from "@/components/Unauthenticated"
import { redirect } from "next/navigation";

interface DetailCourseProps {
  params: {
    id: number;
  };
}

export default async function Courses({ params }: DetailCourseProps) {
    const session = await getServerSession(authOptions);
        if (!session || !session.user) {
        redirect(`/student/login?callbackUrl=/course/update_course/${params.id}`);
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
            <UpdateCourse id={params.id} token={authToken} />      
        </>
      ):(
        <Unauthenticated />
      )}
        </>
    );
};