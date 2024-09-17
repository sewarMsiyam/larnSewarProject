"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumb from "@/components/ui/breadcrumbHome"
import TitleSection from '@/components/title';
import ContactUs from '@/components/home/body/ContactUs';
import InstructorsList from '@/components/pages/Instructors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Instructors() {
  const t = useTranslations('HomePage');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');


  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: 'المعلمين', href: '/instructor', isActive: true }
  ]

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <section className='container my-10'>
        <TitleSection text="المعلمين" />

        

        <Tabs defaultValue="tawjihi" dir="rtl" className="text-center">
          <TabsList className='mb-5'>
            <TabsTrigger value="tawjihi">معلم توجيهي</TabsTrigger>
            <TabsTrigger value="university">معلم جامعة</TabsTrigger>
          </TabsList>
          
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
                <button type="submit" className='btn-primary font-medium py-2.5 w-full before:ease relative overflow-hidden px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60'>ابحث</button>
                </div>
              </div> 
        </div>


          <InstructorsList />
        </Tabs>

 {/*
        <Tabs defaultValue="tawjihi" dir="rtl" className="text-center">
          <TabsList className='mb-5'>
            <TabsTrigger value="tawjihi">معلم توجيهي</TabsTrigger>
            <TabsTrigger value="university">معلم جامعة</TabsTrigger>
          </TabsList>
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

        </Tabs>





        <div className='grid gap-8 bg-white shadow-sm rounded-3xl p-10 mb-10 text-start'>  
              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end">
                <div className="col-span-1	">
                  <div className="grid gap-2 col-span-4	">
                    <Label htmlFor="tet"> التخصص</Label>
                    <Select dir="rtl">
                      <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="التخصص" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EN">انجليزي</SelectItem>
                        <SelectItem value="AR">عربي</SelectItem>
                        <SelectItem value="SU">علوم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-span-1	">
                  <div className="grid gap-2 col-span-4	">
                    <Label htmlFor="tet"> التخصص</Label>
                    <Select dir="rtl">
                      <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="التخصص" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EN">انجليزي</SelectItem>
                        <SelectItem value="AR">عربي</SelectItem>
                        <SelectItem value="SU">علوم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-span-1	">
                  <div className="grid gap-2 col-span-4	">
                    <Label htmlFor="tet"> التخصص</Label>
                    <Select dir="rtl">
                      <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="التخصص" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EN">انجليزي</SelectItem>
                        <SelectItem value="AR">عربي</SelectItem>
                        <SelectItem value="SU">علوم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-span-1	">
                  <div className="grid gap-2 col-span-4	">
                    <Label htmlFor="tet"> التخصص</Label>
                    <Select dir="rtl">
                      <SelectTrigger className="flex border-none rounded-full mt-1 bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="التخصص" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EN">انجليزي</SelectItem>
                        <SelectItem value="AR">عربي</SelectItem>
                        <SelectItem value="SU">علوم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-5 items-end">
                <div className="grid gap-2 col-span-4	">
                  <Label htmlFor="text"> ابحث عن معلم</Label>
                  <div className="relative">
                    <Input
                      id="tet"
                      type="text"
                      className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="اسم المعلم"
                      value=''
                    />
                  </div>
                </div>

                <div className="col-span-1	">
                  <button type="submit" className='btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 rounded-2xl w-full'>ابحث</button>
                </div>
              </div> 
        </div>

*/}
      </section> 

      <ContactUs />

    </>
  );
}
