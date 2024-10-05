import { authOptions } from "@/lib/authOptions";
import Breadcrumb from "@/components/ui/breadcrumbHome";
import CreateLessons from "@/components/pages/crudLessons/create";
import { getServerSession } from 'next-auth/next';
import Unauthenticated from "@/components/Unauthenticated"

interface DetailLessonsProps {
  params: {
    id: number;
  };
}
export default async function CreatePageLessons({ params }: DetailLessonsProps) {
    const session = await getServerSession(authOptions);
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الكورسات', href: '/'},
        { label: 'الدروس', href: '/'},
        { label: 'اضافة درس', href: '/', isActive: true }
    ]

    return (
        <>
            {session ? (
                <>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <CreateLessons id={params.id.toString()} />
                </>
            ) : (
                <Unauthenticated />
            )}
        </>
    );
};