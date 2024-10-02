
"use client";
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import Star from '@/components/svgIcon/star';
import { fetchOne } from '@/app/api/dataFetch';
import { Instructors } from '@/app/api/interfaces';
import { Skeleton } from "@/components/ui/skeleton"
import BookPrivate from '@/components/pages/instructor/BookPrivate';
import CourseInstrctor from '@/components/pages/instructor/CourseInstrctor';
import Opinions from '@/components/home/body/Opinions';

interface DetailsInstructorsProps {
    id: number;
}

export default function DetailsInstructors({ id }: DetailsInstructorsProps) {

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
                <section className="container bg-gridColor lg:h-[229.52px] rounded-xl p-10 flex items-end">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full relative -mb-16">
                        <div className="flex gap-5 items-center">
                            <div>
                                <Avatar>
                                    <AvatarImage
                                        src=''
                                        alt="Teacher Image"
                                        className="shadow rounded-full"
                                    />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <Skeleton className="w-24 h-5 mb-2" />
                                <Skeleton className="w-14 h-5" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="my-12 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-5 lg:p-10 space-y-10">
                    <Skeleton className="w-full h-24 mb-2" />
                </section>
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
            <section className="container bg-gridColor lg:h-[229.52px] rounded-xl p-10 flex items-end">
                <div className="flex flex-col md:flex-row justify-between items-center w-full relative -mb-16">
                    <div className="flex gap-5 items-center">
                        <div>
                            <Avatar>
                                <AvatarImage
                                    src={instructor.image}
                                    alt="Teacher Image"
                                    className="shadow rounded-full"
                                />
                                <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">{instructor.name}</h4>
                            <p className="text-primary">{instructor.specialization}</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-1 items-center ">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <span className="text-[#707070] text-sm px-2"> (300) تقييم</span>
                    </div>
                </div>
            </section>

            <section className="my-12 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-5 lg:p-10 space-y-10">
               
                
                

                {instructor.qualification > 0 ?(
                    <>
                     <div className="flex items-start gap-3">
                    <img src="/moahelat.svg" alt="" />
                    <div>
                        <h4 className="font-bold">المؤهلات:</h4>
                        <div className="mt-3">
                             {instructor.qualification}
                        </div>
                    </div>
                </div>
                    </>
                ):(
                     <>
                    </>
                )}
                


{instructor.experience > 0 ?(
                    <>
                    <div className="flex items-start gap-3">
                    <img src="/kebra.png" alt="" />
                    <div>
                        <h4 className="font-bold">الخبرة:</h4>
                        <div className="mt-3">
{instructor.experience}                        
</div>
                    </div>
                </div>
                    </>
                ):(
                     <>
                    </>
                )}


{instructor.achievement > 0 ?(
                    <>
                   <div className="flex items-start gap-3">
                    <img src="/engaz.png" alt="" />
                    <div>
                        <h4 className="font-bold">الانجازات:</h4>
                        <div className="mt-3">
                            {instructor.achievement}
                        </div>
                    </div>
                </div> 
                    </>
                ):(
                     <>
                    </>
                )}

                
            </section>

            <section className="mb-12 lg:container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-5 py-10 lg:p-10 space-y-10">
                <BookPrivate id={instructor.id} />
            </section>


            <section className="mb-8 container shadow-[0px 4px 40px 0px #0000000D] bg-white rounded-3xl p-10 space-y-10">
                <CourseInstrctor id={instructor.id} />
            </section>

            <section className="mb-28">
                <Opinions />
            </section>

        </>
    );
}