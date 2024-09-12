"use client";
import { useEffect, useState } from 'react';
import { fetchAll } from '@/app/api/dataFetch';
import { Course } from '@/app/api/interfaces';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabs";
import CourseCard from '@/components/ui/cardcourses';
import SkeletonCardcourses from '@/components/ui/SkeletonCardcourses';


export default function CoursesHome() {
    const t = useTranslations('HomePage');

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const endpoint = 'courses';
    const mainCategory = 'tawjhi';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchAll<Course>(endpoint, mainCategory);
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    console.error('Invalid data format:', data);
                    setError('Failed to load data.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
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
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Display error message if any
    }

    return (
        <TabsContent value="tawjihi">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id} // Use a unique identifier for the key
                        imageSrc={course.image}
                        title={course.name}
                        duration={course.lesson_time}
                        lessons={course.number_of_lessons}
                        exam={course.number_of_office_time_per_week}
                        summary={course.number_of_office_time_per_week}
                        teacherName={course.instructor_name}
                        teacherImage={course.instructor_image}
                        price={course.price}
                    />
                ))}
            </div>
        </TabsContent>
    );
}
