"use client";
import { useEffect, useState } from 'react';
import { fetchAll, fetchAllCoursepagination } from '@/app/api/dataFetch';
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

interface Pagination {
    current_page: number;
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page_url: string;
    to: number;
    total: number;
    last_page: number;
}

interface CourseResponse {
    courses: Course[];
    pagination: Pagination;
}

export default function CoursesHome() {
    const t = useTranslations('HomePage');

    const [tawjihiCourses, setTawjihiCourse] = useState<Course[]>([]);
    const [tawjihiPagination, setTawjihiPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [instructorName, setInstructorName] = useState<string>('');
    const [specialization, setSpecialization] = useState<string>('all');
    const [specializations, setSpecializations] = useState<Specialization[]>([]);

    useEffect(() => {
        const loadSpecializations = async () => {
            try {
                const data = await fetchAll<Specialization>("specializations");
                if (Array.isArray(data)) {
                    setSpecializations(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to fetch specializations:", error);
            }
        };
        loadSpecializations();
        fetchData();
    }, []);

    const fetchData = async (params = {}, reset = true) => {
        try {
            if (reset) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const queryString = new URLSearchParams(params).toString();

            const tawjihiResponse = await fetchAllCoursepagination<CourseResponse>(`courses?main_category=tawjihi&${queryString}`);

            if (tawjihiResponse) {
                if (reset) {
                    setTawjihiCourse(tawjihiResponse.courses);
                } else {
                    setTawjihiCourse(prev => [...prev, ...tawjihiResponse.courses]);
                }
                setTawjihiPagination(tawjihiResponse.pagination);
            }
        } catch (err) {
            setError('Failed to fetch courses');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleSearch = () => {
        const params: any = {};
        if (searchQuery) params.name = searchQuery;
        if (specialization && specialization !== 'all') params.specialization_id = specialization;
        if (instructorName) params.instructor_name = instructorName;
        fetchData(params);
    };

    const loadMore = async (category: 'tawjihi') => {
        const pagination = tawjihiPagination
        if (!pagination?.next_page_url) return;

        const params = Object.fromEntries(new URL(pagination.next_page_url).searchParams);
        if (searchQuery) params.name = searchQuery;
        if (specialization && specialization !== 'all') params.specialization_id = specialization;
        if (instructorName) params.instructor_name = instructorName;

        await fetchData(params, false);
    };

    const renderLoadMoreButton = (category: 'tawjihi') => {
        const pagination = tawjihiPagination;

        if (!pagination?.next_page_url) return null;

        return (
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => loadMore(category)}
                    disabled={loadingMore}
                    className="btn-primary font-medium py-2.5 px-6 before:ease relative overflow-hidden transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60"
                >
                    {loadingMore ? "جاري التحميل..." : "تحميل المزيد"}
                </button>
            </div>
        );
    };

    const renderSearchForm = () => (
        <div className='grid gap-8 bg-white shadow-sm rounded-3xl p-10 mb-10 text-start'>
            <div className="grid gap-5 lg:grid-cols-7 items-end">
                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="search">ابحث عن اسم الكورس</Label>
                    <div className="relative">
                        <Input
                            id="search"
                            type="text"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="كورس"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="instructor">ابحث عن اسم معلم</Label>
                    <div className="relative">
                        <Input
                            id="instructor"
                            type="text"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="معلم"
                            value={instructorName}
                            onChange={(e) => setInstructorName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid gap-2 col-span-4">
                        <Label htmlFor="specialization">التخصص</Label>
                        <div className="relative">
                            <Select
                                dir="rtl"
                                name="specialization_id"
                                value={specialization}
                                onValueChange={(value) => setSpecialization(value)}
                            >
                                <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                    <SelectValue placeholder="التخصص" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">كل التخصصات</SelectItem>
                                    {specializations.map((spec) => (
                                        <SelectItem key={spec.id} value={spec.id.toString()}>
                                            {spec.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <button
                        type="button"
                        className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'
                        onClick={handleSearch}
                    >
                        ابحث
                    </button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <>
                {renderSearchForm()}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <SkeletonCardcourses />
                        <div className='hidden md:block'>
                            <SkeletonCardcourses />
                        </div>
                        <div className='hidden lg:block'>
                            <SkeletonCardcourses />
                        </div>
                    </div>
            </>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            {renderSearchForm()}
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
                {renderLoadMoreButton('tawjihi')}
        </>
    );
}