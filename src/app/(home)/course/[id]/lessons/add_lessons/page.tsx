import { authOptions } from "@/lib/authOptions";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import CreateLessons from "@/components/pages/crudLessons/create";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"
import { redirect } from "next/navigation";

interface DetailLessonsProps {
  params: {
    id: number;
  };
}
export default async function CreatePageLessons({ params }: DetailLessonsProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect(`/student/login?callbackUrl=/course/${params.id.toString()}/lessons/add_lessons`);
    }
    const authToken = session.user.authToken;
    if (typeof authToken !== 'string' || !authToken) {
        console.error("Auth token is missing or invalid");
        return <div>An error occurred. Please try logging in again.</div>;
    }
    
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات', href: '/instructor/profile'},
        { label: 'الدروس', href: `/course/${params.id.toString()}/lessons`},
        { label: 'اضافة درس', href: '/', isActive: true }
    ]

    return (
        <>
            {session ? (
                <>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <CreateLessons id={params.id.toString()} token={authToken} />
                </>
            ) : (
                <Unauthenticated />
            )}
        </>
    );
};