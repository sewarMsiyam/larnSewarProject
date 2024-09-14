"use client";
import { useEffect, useState } from 'react';
import { fetchAll } from '@/app/api/dataFetch';
import { Course } from '@/app/api/interfaces';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabs";
import CourseCard from '@/components/ui/cardcourses';
import SkeletonCardcourses from '@/components/ui/SkeletonCardcourses';


export default function DetailCourse() {
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
                <div className="grid">
                    <SkeletonCardcourses />
                </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Display error message if any
    }

    return (
            <div className="grid ">

            </div>
    );
}
