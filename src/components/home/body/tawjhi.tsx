"use client";
import { useEffect, useState } from 'react';
import { fetchAll } from '@/app/api/dataFetch';
import { Course } from '@/app/api/interfaces';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabs"
import CourseCard from '@/components/ui/cardcourses';
export default function CoursesHome() {
    const t = useTranslations('HomePage');

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const mainCategory = 'tawjhi';
    const endpoint = 'courses';

    useEffect(() => {
        setLoading(true);
        fetchAll(endpoint, mainCategory).then(data => {
            setCourses(data);
            setLoading(false);
        });
    }, [mainCategory, endpoint]);
    return (
        <>
            <TabsContent value="tawjihi">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            imageSrc={course.image}
                            title={course.name}
                            duration={course.lesson_time}
                            lessons={course.number_of_lessons}
                            exam={course.number_of_workingـpapers}
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