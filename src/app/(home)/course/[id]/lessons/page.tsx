import { authOptions } from "@/lib/authOptions";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import ShowLessons from "@/components/pages/crudLessons/show";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"

interface DetailLessonsProps {
  params: {
    id: number;
  };
}
export default async function Lessons({ params }: DetailLessonsProps) {
    const session = await getServerSession(authOptions);
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات', href: '/', isActive: true},
        { label: 'الدروس', href: '/', isActive: true }
    ]

    return (
        <>
            {session ? (
                <>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <ShowLessons id={params.id.toString()} />
                </>
            ) : (
                <Unauthenticated />
            )}
        </>
    );
};