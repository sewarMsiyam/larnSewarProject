"use client";
import { useEffect, useState } from 'react';
import { fetchOne } from '@/app/api/dataFetch';
import { Instructors } from '@/app/api/interfaces';
import { Calendar } from "@/components/ui/calendar"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';
import TitleSection from '@/components/title';
import CourseCard from '@/components/ui/cardcoursesHorez';

interface DetailsInstructorsProps {
    id: number;
}

export default function CourseInstrctor({ id }: DetailsInstructorsProps) {
    const [instructor, setInstructor] = useState<Instructors | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const endpoint = 'instructors';


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOne(endpoint, id.toString());
                if (data) {
                    setInstructor(data);
                } else {
                    setError('Instructor not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <>
                <div className="grid grid-cols-1 lg:grid-cols-2 ">
                    <div className="border border-[#0000001A] rounded-xl p-3 flex items-center">
                        <Skeleton className="w-2/4 h-full relative overflow-hidden rounded-2xl" />

                        <div className="w-full px-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-15 w-[70%] rounded-lg" />
                                <Skeleton className="h-15 w-[20%] rounded-lg" />
                            </div>
                            <Skeleton className="h-15 w-full rounded-lg" />
                            <Skeleton className="h-7 w-full rounded-lg" />
                            <Skeleton className="h-7 w-full mx-10 rounded-lg" />
                            <Skeleton className="h-7 w-full rounded-lg" />
                            <div className='text-end'>
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 hadin ">
                    <div className="border border-[#0000001A] rounded-xl p-3 flex items-center">
                        <Skeleton className="w-2/4 h-full relative overflow-hidden rounded-2xl" />

                        <div className="w-full px-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-15 w-[70%] rounded-lg" />
                                <Skeleton className="h-15 w-[20%] rounded-lg" />
                            </div>
                            <Skeleton className="h-15 w-full rounded-lg" />
                            <Skeleton className="h-7 w-full rounded-lg" />
                            <Skeleton className="h-7 w-full mx-10 rounded-lg" />
                            <Skeleton className="h-7 w-full rounded-lg" />
                            <div className='text-end'>
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!instructor) {
        return <p>No instructor data available.</p>;
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <TitleSection text="الدروس التعليمية" />
                <Link href="" className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1"> عرض كافة الكورسات</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {instructor.courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        imageSrc={course.image}
                        title={course.name}
                        description={course.description}
                        duration={course.duration}
                        lessons={course.lessons_number}
                        price={course.price}
                    />
                ))}
            </div>
        </>
    );
}