"use client";
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
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
    const [universityCourses, setUniversityCourse] = useState<Course[]>([]);
    const [tawjihiPagination, setTawjihiPagination] = useState<Pagination | null>(null);
    const [universityPagination, setUniversityPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
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

    const fetchData = async (params = {}, tawjihiUrl?: string, universityUrl?: string) => {
        try {
            setLoading(true);
            const queryString = new URLSearchParams(params).toString();

            const tawjihiResponse = await fetchAllCoursepagination<CourseResponse>(tawjihiUrl || `courses?main_category=tawjihi&${queryString}`);
            const universityResponse = await fetchAllCoursepagination<CourseResponse>(universityUrl || `courses?main_category=university&${queryString}`);

            if (tawjihiResponse && universityResponse) {
                setTawjihiCourse(tawjihiResponse.courses);
                setUniversityCourse(universityResponse.courses);
                setTawjihiPagination(tawjihiResponse.pagination);
                setUniversityPagination(universityResponse.pagination);
            }
        } catch (err) {
            setError('Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const params: any = {};
        if (searchQuery) params.name = searchQuery;
        if (specialization && specialization !== 'all') params.specialization_id = specialization;
        if (instructorName) params.instructor_name = instructorName;
        fetchData(params);
    };

    const handlePageChange = (category: 'tawjihi' | 'university', url: string | null) => {
        if (url) {
            const params = Object.fromEntries(new URL(url).searchParams);
            if (category === 'tawjihi') {
                fetchData(params, url, undefined);
            } else {
                fetchData(params, undefined, url);
            }
        }
    };

   const renderPagination = (pagination: Pagination | null, category: 'tawjihi' | 'university') => {
    if (!pagination) return null;

    const getPageNumbers = () => {
        const total = pagination.last_page;
        const current = pagination.current_page;
        let pages = [];

        if (total <= 4) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current > 2) {
                pages.push(1);
                if (current > 3) {
                    pages.push('...');
                }
            }

            for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
                pages.push(i);
            }

            if (current < total - 1) {
                if (current < total - 2) {
                    pages.push('...');
                }
                pages.push(total);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 mt-8 select-none">
            <button
                onClick={() => handlePageChange(category, pagination.prev_page_url)}
                disabled={!pagination.prev_page_url}
                className="flex items-center text-sm text-[#00A88A] disabled:text-gray-300 gap-2"
            >
                <span className="rtl:rotate-180">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                    </svg>
                </span>
                التالي
            </button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => (
                    <Fragment key={index}>
                        {page === '...' ? (
                            <span className="px-2">...</span>
                        ) : (
                            <button
                                className={`w-[40px] h-[40px] flex items-center justify-center rounded-lg
                                    ${pagination.current_page === page 
                                        ? 'bg-[#00A88A] text-white' 
                                        : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                                onClick={() => handlePageChange(category, `${pagination.first_page_url.split('?')[0]}?page=${page}`)}
                                disabled={pagination.current_page === page}
                            >
                                {page}
                            </button>
                        )}
                    </Fragment>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(category, pagination.next_page_url)}
                disabled={!pagination.next_page_url}
                className="flex items-center text-sm text-[#00A88A] disabled:text-gray-300 gap-2"
            >
                السابق
                <span className="rtl:rotate-180">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                </span>
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
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            {renderSearchForm()}
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
                {renderPagination(tawjihiPagination, 'tawjihi')}
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
                {renderPagination(universityPagination, 'university')}
            </TabsContent>
        </>
    );
}