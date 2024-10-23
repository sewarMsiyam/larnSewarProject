import { authOptions } from "@/lib/authOptions";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import ShowLessons from "@/components/pages/crudLessons/show";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"
import { redirect } from "next/navigation";

interface DetailLessonsProps {
  params: {
    id: number;
  };
}
export default async function Lessons({ params }: DetailLessonsProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect(`/student/login?callbackUrl=/course/${params.id.toString()}/lessons`);
    }
    const authToken = session.user.authToken;
    if (typeof authToken !== 'string' || !authToken) {
        console.error("Auth token is missing or invalid");
        return <div>An error occurred. Please try logging in again.</div>;
    }

    const breadcrumbs = [
        { label: 'الكورسات', href: '/instructor/profile'},
        { label: 'الدروس', href: `/course/${params.id.toString()}/lessons`},
        { label: 'الدروس', href: '/', isActive: true }
    ]

    return (
        <>
            {session ? (
                <>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <ShowLessons id={params.id.toString()} token={authToken} />
                </>
            ) : (
                <Unauthenticated />
            )}
        </>
    );
};