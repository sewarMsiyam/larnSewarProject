import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import CoursesHome from "@/components/home/body/coursesHome";
import Breadcrumb from "@/components/ui/breadcrumbHome"
import CreateCourse from "@/components/pages/instructorProfile/CreateCourse";

export default async function Courses() {
    const session = await getServerSession(authOptions);
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات', href: '/instructor', isActive: true }
    ]

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <CreateCourse />
        </>
    );
};