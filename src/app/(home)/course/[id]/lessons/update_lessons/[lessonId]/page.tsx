import { authOptions } from "@/lib/authOptions";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import UpdateLessons from "@/components/pages/crudLessons/Update";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"
import { redirect } from "next/navigation";

interface DetailLessonsProps {
  params: {
    id: number;
    lessonId: number;
  };
}
export default async function UpdatePageLessons({ params }: DetailLessonsProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect(`/login?callbackUrl=/course/${params.id.toString()}/lessons/update_lessons/${params.lessonId.toString() }`);
    }
    const authToken = session.user.authToken;
    if (typeof authToken !== 'string' || !authToken) {
        console.error("Auth token is missing or invalid");
        return <div>An error occurred. Please try logging in again.</div>;
    }


    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات', href: '/'},
        { label: 'الدروس', href: '/'},
        { label: 'تعديل درس', href: '/', isActive: true }
    ]

    return (
        <>
            {session ? (
                <>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <UpdateLessons id={params.id.toString()} lessonId={params.lessonId.toString()} token={authToken} />
                </>
            ) : (
                <Unauthenticated />
            )}
        </>
    );
};