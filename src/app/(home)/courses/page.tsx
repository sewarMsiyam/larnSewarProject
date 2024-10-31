import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import CoursesHome from "@/components/pages/CoursesPage/coursesHome";
import Breadcrumb from "@/components/ui/breadcrumbHome"
import '@/app/globals.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShowCourses from '@/components/pages/CoursesPage/showCourses';
import TitleSection from '@/components/title';
import Link from 'next/link';

export default async function Courses() {
  const session = await getServerSession(authOptions);

  return (
    <>
    </>
  );
};