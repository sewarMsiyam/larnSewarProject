import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import CoursesHome from "@/components/pages/CoursesPage/coursesHome";
import Breadcrumb from "@/components/ui/breadcrumbHome"

export default async function Courses() {
  const session = await getServerSession(authOptions);
    const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الكورسات', href: '/instructor', isActive: true }
    ]

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CoursesHome />
    </>
  );
};