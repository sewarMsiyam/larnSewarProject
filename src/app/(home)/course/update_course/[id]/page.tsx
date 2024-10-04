import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import CoursesHome from "@/components/home/body/coursesHome";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import UpdateCourse from "@/components/pages/crudCourse/UpdateCourse";
import Unauthenticated from "@/components/Unauthenticated"

interface DetailCourseProps {
  params: {
    id: number;
  };
}

export default async function Courses({ params }: DetailCourseProps) {
    const session = await getServerSession(authOptions);
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات', href: '/instructor', isActive: true }
    ]

    return (
        <>
         
                  {session ? (
        <>
         <Breadcrumb breadcrumbs={breadcrumbs} />
            <UpdateCourse id={params.id} />      
        </>
      ):(
        <Unauthenticated />
      )}
        </>
    );
};