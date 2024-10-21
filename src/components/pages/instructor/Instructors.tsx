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

export default function InstructorsList() {
  const t = useTranslations('HomePage');

  const [instructors, setInstructors] = useState<Instructors[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = 'instructors';
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
    debounce(async (name: string = '', specialization: string = '') => {
      console.log("fetchInstructors called with name:", name, "and specialization:", specialization);
      try {
        setLoading(true);
        setError(null);

        const [universityData] = await Promise.all([
          fetchAllInstructors<Instructors>(`instructors?name=${name}&specialization_id=${specialization}`),
        ]);
        console.log("Fetched data:", universityData);
        setInstructors(universityData || []);
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

  const handleSearch = () => {
    console.log("Searching with query:", searchQuery, "and specialization:", specialization);
    fetchInstructors(searchQuery, specialization);
  };


  if (error) return (
    <div className="text-center text-red-500 text-2xl mt-10">
      {error}
    </div>
  );

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map(renderInstructorCard)}
        </div>
      ) : (
        <>
        </>
      )}

    </>
  );
}
