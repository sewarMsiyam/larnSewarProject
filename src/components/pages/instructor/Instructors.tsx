"use client";
import { useEffect, useState, useCallback } from 'react';
import { Fragment } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);


  const endpoint = 'instructors';

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
    debounce(async (name: string = '', specialization: string = '', url?: string) => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = url || `instructors?name=${name}&specialization_id=${specialization}`;
        const response = await fetchAllInstructors<InstructorsResponse>(endpoint);

        if (response) {
          setInstructors(response.instructors || []);
          setInstructorsPagination(response.pagination);
        }
      } catch (err) {
        console.error("Error fetching instructors:", err);
        setError('فشل في جلب المعلمين');
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
  console.log("Specialization changed:", specialization);
}, [specialization]);


  useEffect(() => {
    fetchInstructors();
  }, []);

  const handlePageChange = (url: string | null) => {
    if (url) {
      fetchInstructors(searchQuery, specialization, url);
    }
  }; 
  const handleSearch = () => {
    fetchInstructors(searchQuery, specialization);
  };


  if (error) return (
    <div className="text-center text-red-500 text-2xl mt-10">
      {error}
    </div>
  );


  const renderPagination = (pagination: Pagination | null) => {
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
          onClick={() => handlePageChange(pagination.prev_page_url)}
          disabled={!pagination.prev_page_url}
          className="flex items-center text-sm text-[#00A88A] disabled:text-gray-300 gap-2"
        >
          <span className="rtl:rotate-180">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
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
                  onClick={() => handlePageChange(
                    `${pagination.first_page_url.split('?')[0]}?page=${page}`
                  )}
                  disabled={pagination.current_page === page}
                >
                  {page}
                </button>
              )}
            </Fragment>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(pagination.next_page_url)}
          disabled={!pagination.next_page_url}
          className="flex items-center text-sm text-[#00A88A] disabled:text-gray-300 gap-2"
        >
          السابق
          <span className="rtl:rotate-180">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </span>
        </button>
      </div>
    );
  };

  if (loading) return (
    <>
      <div className='grid gap-8 bg-white shadow-sm rounded-3xl p-10 mb-10 text-start'>
        <div className="grid gap-5 lg:grid-cols-5 items-end">
          <div className="grid gap-2 col-span-2	">
            <Label htmlFor="search"> ابحث عن معلم</Label>
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
            <div className="grid gap-2 col-span-4	">
              <Label htmlFor="text"> التخصص</Label>
              <div className="relative">
                <Select
                  dir="rtl"
                  onValueChange={(value) => {
                    setSpecialization(value);
                    console.log("Selected specialization ID:", value);
                  }}
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
          <div className="col-span-1	">
            <button type="submit" onClick={handleSearch} className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'>ابحث</button>
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
          <div className="grid gap-2 col-span-2	">
            <Label htmlFor="search"> ابحث عن معلم</Label>
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
          <div className="col-span-2	">
            <div className="grid gap-2 col-span-4	">
              <Label htmlFor="text"> التخصص</Label>
              <div className="relative">
                <Select
                  dir="rtl"
                  onValueChange={(value) => setSpecialization(value)}
                >
                  <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                     {/* <SelectItem value=""></SelectItem> */}
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
          <div className="col-span-1	">
            <button type="submit" onClick={handleSearch} className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'>ابحث</button>
          </div>
        </div>
      </div>

      {instructors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map(renderInstructorCard)}
          </div>
          {renderPagination(instructorsPagination)}
        </>
      ) : (
        <>
        </>
      )}

    </>
  );
}
