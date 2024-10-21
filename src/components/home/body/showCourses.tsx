   



"use client";
import { useEffect, useState } from 'react';
import { fetchAllCourse } from '@/app/api/dataFetch';
import { Course } from '@/app/api/interfaces';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabs";
import CourseCard from '@/components/ui/cardcourses';
import SkeletonCardcourses from '@/components/ui/SkeletonCardcourses';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Specialization {
  id: number;
  name: string;
}
export default function CoursesHome() {
    const t = useTranslations('HomePage');

    const [tawjihiCourses, setTawjihiCourse] = useState<Course[]>([]);
    const [universityCourses, setUniversityCourse] = useState<Course[]>([]);


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const endpoint = 'courses';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const tawjihiData = await fetchAllCourse<Course>('courses?main_category=tawjihi');
                const universityData = await fetchAllCourse<Course>('courses?main_category=university');


                console.log(tawjihiData)
                
                setTawjihiCourse(tawjihiData || []);
                setUniversityCourse(universityData || []);
            } catch (err) {
                setError('Failed to fetch instructors');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    if (loading) {
        return (
            <>
                <TabsContent value="tawjihi">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SkeletonCardcourses />
                        <div className='hidden md:block'>
                            <SkeletonCardcourses />
                        </div>
                        <div className='hidden lg:block'>
                            <SkeletonCardcourses />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="university">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SkeletonCardcourses />
                        <div className='hidden md:block'>
                            <SkeletonCardcourses />
                        </div>
                        <div className='hidden lg:block'>
                            <SkeletonCardcourses />
                        </div>
                    </div>
                </TabsContent>
            </>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Display error message if any
    }

    return (
        <>

            <TabsContent value="tawjihi">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tawjihiCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            imageSrc={course.image}
                            title={course.name}
                            duration={course.duration}
                            lessons={course.lessons_number}
                            exam={course.number_of_office_time_per_week}
                            summary={course.number_of_office_time_per_week}
                            teacherName={course.instructor_name}
                            teacherImage={course.instructor_image}
                            price={course.price}
                        />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="university">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {universityCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            imageSrc={course.image}
                            title={course.name}
                            duration={course.duration}
                            lessons={course.lessons_number}
                            exam={course.number_of_office_time_per_week}
                            summary={course.number_of_office_time_per_week}
                            teacherName={course.instructor_name}
                            teacherImage={course.instructor_image}
                            price={course.price}
                        />
                    ))}
                </div>
            </TabsContent>

        </>
    );
}
