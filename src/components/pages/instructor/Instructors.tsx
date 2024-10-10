"use client";
import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Instructors } from '@/app/api/interfaces';
import { fetchAll } from '@/app/api/dataFetch';
import Breadcrumb from "@/components/ui/breadcrumbHome"
import TitleSection from '@/components/title';
import ContactUs from '@/components/home/body/ContactUs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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


export default function InstructorsList() {
  const t = useTranslations('HomePage');

  const [tawjihiInstructors, setTawjihiInstructors] = useState<Instructors[]>([]);
  const [universityInstructors, setUniversityInstructors] = useState<Instructors[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = 'instructors';

  const buildQuery = (category: string, name: string = '', specialization: string = '') => {
    let query = `instructors?main_category=${category}`;
    if (name) query += `&name=${name}`;
    if (specialization) query += `&specialization=${specialization}`;
    return query;
  };



  const fetchInstructors = useCallback(
    debounce(async (name: string = '', specialization: string = '') => {
      try {
        setLoading(true);
        setError(null);

        const [tawjihiData, universityData] = await Promise.all([
          fetchAll<Instructors>(buildQuery('tawjhi', name, specialization)),
          fetchAll<Instructors>(buildQuery('university', name, specialization)),
        ]);
        setTawjihiInstructors(tawjihiData || []);
        setUniversityInstructors(universityData || []);
      } catch (err) {
        setError('فشل في جلب المعلمين');
      } finally {
        setLoading(false);
      }
    }, 10),
    []
  );

  useEffect(() => {
    fetchInstructors();
  }, []);


  // دالة البحث
  const handleSearch = () => {
    fetchInstructors(searchQuery, specialization);
  };


  // useEffect(() => {
  //   async function fetchInstructors() {
  //     try {
  //       setLoading(true);
  //       const tawjihiData = await fetchAll<Instructors>('instructors?main_category=tawjhi');
  //       const universityData = await fetchAll<Instructors>('instructors?main_category=university');
  //       setTawjihiInstructors(tawjihiData || []);
  //       setUniversityInstructors(universityData || []);
  //     } catch (err) {
  //       setError('Failed to fetch instructors');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchInstructors();
  // }, []);


  if (error) return (
    <div className="text-center text-red-500 text-2xl mt-10">
      {error}
    </div>
  );

  // if (loading) return (
  //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-3">
  //     <SkeletonInstructor />
  //     <div className='hidden md:block'>
  //       <SkeletonInstructor />
  //     </div>
  //     <div className='hidden lg:block'>
  //       <SkeletonInstructor />
  //     </div>
  //   </div>
  // );

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
                <Input
                  id="specialization"
                  type="text"
                  className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="التخصص"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1	">
            <button type="submit" onClick={handleSearch} className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'>ابحث</button>
          </div>
        </div>
      </div>

      {/* <TabsContent value="tawjihi"> */}
        {/* {tawjihiInstructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tawjihiInstructors.map(renderInstructorCard)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonInstructor />
            <div className='hidden md:block'>
              <SkeletonInstructor />
            </div>
            <div className='hidden lg:block'>
              <SkeletonInstructor />
            </div>
          </div>
        )} */}
      {/* </TabsContent> */}
      {/* // <TabsContent value="university"> */}
        {universityInstructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universityInstructors.map(renderInstructorCard)}
          </div>
        ) : (
          <>
            لا يوجد معلمين 
          </>
        )}
      {/* </TabsContent> */}

    </>
  );
}
