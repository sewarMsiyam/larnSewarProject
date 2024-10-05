import { authOptions } from "@/lib/authOptions";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import UpdateLessons from "@/components/pages/crudLessons/Update";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"

interface DetailLessonsProps {
  params: {
    id: number;
  };
}
export default async function UpdatePageLessons({ params }: DetailLessonsProps) {
    const session = await getServerSession(authOptions);
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
                    <UpdateLessons id={params.id.toString()} />
                </>
            ) : (
                <Unauthenticated />
            )}
        </>
    );
};