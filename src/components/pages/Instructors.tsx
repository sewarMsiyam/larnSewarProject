"use client";
import { useEffect, useState } from 'react';
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

export default function InstructorsList() {
  const t = useTranslations('HomePage');

  const [tawjihiInstructors, setTawjihiInstructors] = useState<Instructors[]>([]);
  const [universityInstructors, setUniversityInstructors] = useState<Instructors[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstructors() {
      try {
        setLoading(true);
        const tawjihiData = await fetchAll<Instructors>('instructors?main_category=tawjhi');
        const universityData = await fetchAll<Instructors>('instructors?main_category=university');
        setTawjihiInstructors(tawjihiData|| []);
        setUniversityInstructors(universityData|| []);
      } catch (err) {
        setError('Failed to fetch instructors');
      } finally {
        setLoading(false);
      }
    }

    fetchInstructors();
  }, []);


    if (error) return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-3">
                <SkeletonInstructor />
                <div className='hidden md:block'>
                  <SkeletonInstructor />
                </div>
                <div className='hidden lg:block'>
                  <SkeletonInstructor />
                </div>
              </div>
    );
    
    if (loading) return(
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-3">
                <SkeletonInstructor />
                <div className='hidden md:block'>
                  <SkeletonInstructor />
                </div>
                <div className='hidden lg:block'>
                  <SkeletonInstructor />
                </div>
              </div>
    );
    
  return (
    <>
          <TabsContent value="tawjihi">
            {tawjihiInstructors.length > 0 ? (
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
            )}
          </TabsContent>
          <TabsContent value="university">
            {universityInstructors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {universityInstructors.map(renderInstructorCard)}
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
            )}
          </TabsContent>

    </>
  );
}
