"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabsProfile";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { updateProfile, fetchProfileData } from '@/app/api/dataFetch';
import { Textarea } from "@/components/ui/textarea";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@/contexts/UserContext';
import { useSession } from 'next-auth/react';

type CheckoutFormProps = {
    token: string;
};
export default function UpdateInformation({ token }: CheckoutFormProps) {
    const t = useTranslations('HomePage');
    const { data: session, update: updateSession } = useSession();
    const { updateUser } = useUser();
    const [content, setContent] = useState(``);
    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null,
        email: '',
        phone: '',
        phone_code: '',

        qualification: '',
        experience: '',
        achievement: '',

        years_of_experience: '',
        hourly_rate_price: '',

    });

    const loadProfileData = useCallback(async () => {
        if (!token) return;

        try {
            const profileData = await fetchProfileData('instructor/instructor_details', token);
            console.log("profileData")
            console.log(profileData)
            if (profileData && profileData.item) {
                setFormData({
                    name: profileData.item.name || '',
                    image: profileData.item.image || '',
                    email: profileData.item.email || '',
                    phone: profileData.item.phone || '',
                    phone_code: profileData.item.phone_code || '',
                    qualification: profileData.item.qualification || '',
                    experience: profileData.item.experience || '',
                    achievement: profileData.item.achievement || '',
                    years_of_experience: profileData.item.years_of_experience || '',
                    hourly_rate_price: profileData.item.hourly_rate_price || '',

                });
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
        }
    }, []);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            email: formData.email,
            qualification_ar: formData.qualification,
            experience_ar: formData.experience,
            achievement_ar: formData.achievement,
            years_of_experience: formData.years_of_experience,
            hourly_rate_price: formData.hourly_rate_price,
        };
        try {
            const response = await updateProfile('instructor/update', token as string, data);
            if (response && response.status === 200 && response.item) {
                toast.success('تم تحديث البيانات', {
                    autoClose: 1500,
                });

                setFormData(prevFormData => ({
                    ...prevFormData,
                    name: response.item.first_name || prevFormData.name,
                    qualification: response.item.qualification || prevFormData.qualification,
                    experience: response.item.experience || prevFormData.experience,
                    achievement: response.item.achievement || prevFormData.achievement,
                    years_of_experience: response.item.years_of_experience || prevFormData.years_of_experience,
                    hourly_rate_price: response.item.hourly_rate_price || prevFormData.hourly_rate_price,
                }));
                updateUser({
                    name: response.item.name || response.item.first_name || formData.name,
                    email: response.item.email || formData.email,
                    image: response.item.image || formData.image,
                    userType: 'instructor',
                });
            } else {
                console.error('Unexpected server response:', response);
                toast.error('فشل تعديل البيانات!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error instanceof Error) {
                console.error(`An error occurred while updating the profile: ${error.message}`);
            } else {
                console.error('An unknown error occurred while updating the profile. Please try again.');
            }
        }


    };

    return (
        <>
            <h4 className='font-bold text-lg mb-4'> معلومات عامة </h4>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <Label htmlFor="name">الاسم </Label>
                        <Input
                            id="name"
                            type="text"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <Label htmlFor="email">البريد الالكتروني</Label>
                        <Input
                            id="email"
                            type="email"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-not-allowed"
                            value={formData.email}
                            readOnly
                        />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <div className="flex gap-x-3">
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="056666666"
                                value={formData.phone}
                                readOnly
                                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-not-allowed"
                            />
                            <Input
                                id="phone_code"
                                type="number"
                                placeholder="056"
                                value={formData.phone_code}
                                readOnly
                                className="border-none rounded-full mt-1 block w-[70px] bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <Label htmlFor="years_of_experience">سنوات الخبرة  </Label>
                        <Input
                            id="years_of_experience"
                            type="number"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.years_of_experience}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="col-span-2 lg:col-span-1">
                        <Label htmlFor="hourly_rate_price">سعر الساعة الخصوصي  </Label>
                        <Input
                            id="hourly_rate_price"
                            type="number"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.hourly_rate_price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="qualification">المؤهلات</Label>
                        <Textarea
                            id="qualification"
                            className="border-none rounded-2xl mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.qualification}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="experience">الخبرة</Label>
                        <Textarea
                            id="experience"
                            className="border-none rounded-2xl mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.experience}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="achievement">الإنجازات </Label>
                        <Textarea
                            id="achievement"
                            className="border-none rounded-2xl mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={formData.achievement}
                            onChange={handleChange}
                        />
                    </div>

                    <div></div>
                    <div className="text-end mt-10">
                        <Button type="submit" className="btn-primary rounded-2xl font-medium py-2.5 px-8 md:px-3 lg:px-16 m-1 text-white before:ease relative overflow-hidden btn-primary transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                            حفظ التغيرات
                        </Button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}
