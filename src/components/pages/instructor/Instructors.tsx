"use client";
import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Instructors } from '@/app/api/interfaces';
import { fetchAll, fetchAllInstructors } from '@/app/api/dataFetch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import renderInstructorCard from "@/components/ui/cardInstructors"
import SkeletonInstructor from "@/components/ui/SkeletonInstructor"
import debounce from 'lodash.debounce';

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

interface InstructorsResponse {
  instructors: Instructors[];
  pagination: Pagination;
}

export default function InstructorsList() {
  const t = useTranslations('HomePage');

  const [instructors, setInstructors] = useState<Instructors[]>([]);
  const [instructorsPagination, setInstructorsPagination] = useState<Pagination | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
  }, []);

  const fetchInstructors = useCallback(
    debounce(async (name: string = '', specialization: string = '', page: number = 1, isLoadMore: boolean = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError(null);

        let queryParams = new URLSearchParams();
        if (name) queryParams.append('name', name);
        if (specialization) queryParams.append('specialization_id', specialization);
        if (page > 1) queryParams.append('page', page.toString());

        const endpoint = `instructors${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        const response = await fetchAllInstructors<InstructorsResponse>(endpoint);

        if (response) {
          if (isLoadMore) {
            setInstructors(prev => [...prev, ...response.instructors]);
          } else {
            setInstructors(response.instructors || []);
          }
          setInstructorsPagination(response.pagination);
        }
      } catch (err) {
        console.error("Error fetching instructors:", err);
        setError('فشل في جلب المعلمين');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchInstructors(searchQuery, specialization);
  }, []);

  const handleSearch = () => {
    fetchInstructors(searchQuery, specialization);
  };

  const handleLoadMore = () => {
    if (instructorsPagination?.next_page_url) {
      const nextPage = instructorsPagination.current_page + 1;
      fetchInstructors(searchQuery, specialization, nextPage, true);
    }
  };

  const renderLoadMoreButton = () => {
    if (!instructorsPagination?.next_page_url) return null;

    return (
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="btn-primary font-medium py-2.5 px-6 before:ease relative overflow-hidden transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60"
        >
          {loadingMore ? "جاري التحميل..." : "تحميل المزيد"}
        </button>
      </div>
    );
  };

  if (loading) return (
    <>
      <div className='grid gap-8 bg-white shadow-sm rounded-3xl p-10 mb-10 text-start'>
        <div className="grid gap-5 lg:grid-cols-5 items-end">
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="search">ابحث عن معلم</Label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="اسم المعلم"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid gap-2 col-span-4">
              <Label htmlFor="text">التخصص</Label>
              <div className="relative">
                <Select
                  dir="rtl"
                  onValueChange={(value) => setSpecialization(value)}
                >
                  <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="التخصص" />
                  </SelectTrigger>
                  <SelectContent>
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
              type="submit"
              onClick={handleSearch}
              className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'
            >
              ابحث
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-3">
        <SkeletonInstructor />
        <div className='hidden md:block'>
          <SkeletonInstructor />
        </div>
        <div className='hidden lg:block'>
          <SkeletonInstructor />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className='grid gap-8 bg-white shadow-sm rounded-3xl p-10 mb-10 text-start'>
        <div className="grid gap-5 lg:grid-cols-5 items-end">
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="search">ابحث عن معلم</Label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="اسم المعلم"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid gap-2 col-span-4">
              <Label htmlFor="text">التخصص</Label>
              <div className="relative">
                <Select
                  dir="rtl"
                  onValueChange={(value) => setSpecialization(value)}
                >
                  <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="التخصص" />
                  </SelectTrigger>
                  <SelectContent>
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
              type="submit"
              onClick={handleSearch}
              className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'
            >
              ابحث
            </button>
          </div>
        </div>
      </div>

      {instructors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map(renderInstructorCard)}
          </div>
          {renderLoadMoreButton()}
        </>
      ) : null}
    </>
  );
}