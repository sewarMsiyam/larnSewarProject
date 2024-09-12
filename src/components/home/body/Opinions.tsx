"use client";
import { useEffect, useState } from 'react';
import { fetchAll } from '@/app/api/dataFetch';
import { Review } from '@/app/api/interfaces';
import TitleSection from '@/components/title';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Star from '@/components/svgIcon/star';
import SkeletonReview from '@/components/ui/SkeletonReview';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from 'next-intl';
import { Skeleton } from "@/components/ui/skeleton";

export default function Opinions() {
    const t = useTranslations('HomePage');

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const endpoint = 'reviews';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchAll<Review>(endpoint);
                if (Array.isArray(data)) {
                    setReviews(data);
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
            <div className="container mt-20">
                <TitleSection text="آراء طلابنا" />
                <Carousel
                    opts={{ direction: "rtl" }}
                    orientation="horizontal"
                    dir="rtl">
                    <CarouselContent>
                        {[1, 2, 3].map((index) => (
                            <CarouselItem key={index} className="md:basis-1/2">
                                <div className="bg-[#F5F5F5] p-8 rounded-xl" dir='rtl'>
                                    <div className="flex gap-2 mb-3">
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                    </div>
                                    <Skeleton className="h-4 w-[250px] mb-3" />
                                    <div className="flex gap-3">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div>
                                            <Skeleton className="w-[100px] h-[20px] mb-1" /> 
                                            <Skeleton className="w-[80px] h-[16px]" />
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-20">
                <TitleSection text="آراء طلابنا" />
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mt-20">
            <TitleSection text="آراء طلابنا" />
            <Carousel
                opts={{ direction: "rtl" }}
                orientation="horizontal"
                dir="rtl">
                <CarouselContent>
                    {reviews.map((review, index) => (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <div className="bg-[#F5F5F5] p-8 rounded-xl" dir='rtl'>
                                <div className="flex gap-2 mb-3">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} />
                                    ))}
                                </div>
                                <p className="text-[#333333] text-justify mb-3">
                                    {review.comment}
                                </p>
                                <div className="flex gap-3">
                                    <Avatar>
                                        {review.customer_img ? (
                                            <AvatarImage src={review.customer_img} />
                                        ) : (
                                            <AvatarFallback>{review.customer_name.charAt(0)}</AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <h5 className="text-[#333333] opacity-90">{review.customer_name}</h5>
                                        <p className="text-xs text-[#333333]">{review.customer_position}</p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
