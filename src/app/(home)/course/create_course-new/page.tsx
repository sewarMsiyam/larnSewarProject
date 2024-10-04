import { authOptions } from "@/lib/authOptions";
import CoursesHome from "@/components/home/body/coursesHome";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import CreateCourse from "@/components/pages/crudCourse/CreateCourse";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"

export default async function Courses() {
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
                        <CreateCourse />
                
                    </>
                ):(
                    <Unauthenticated />
                )}
    </>
    );
};