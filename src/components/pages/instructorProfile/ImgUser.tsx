"use client";
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useRef } from 'react';
import { updateProfile } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";

export default function ImgUser() {
    const t = useTranslations('HomePage');
    const session = useSession();
    const token = (session?.data?.user as { authToken?: string | null })?.authToken;

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        photo: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prevFormData) => ({
            ...prevFormData,
            photo: file ? URL.createObjectURL(file) : null,
        }));

        // Ask for confirmation to save the image
        if (file) {
            const confirmed = window.confirm('هل أنت متأكد من حفظ الصورة؟');
            if (confirmed) {
                handleSubmit();
            }
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click(); // Trigger the file input when avatar is clicked
    };

    const handleSubmit = async () => {
        const data = { 
            name: formData.name, 
            photo: formData.photo 
        };

        try {
            const response = await updateProfile('instructor/update', token as string, data);
            if (response && response.status === 200 && response.item) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    name: response.item.name || prevFormData.name,
                    photo: response.item.photo || prevFormData.photo,
                }));
            } else {
                console.error('Unexpected server response:', response);
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
            <Avatar>
                <AvatarImage
                    src={formData.photo || ''}
                    alt="User Image"
                    className="shadow rounded-full cursor-pointer"
                    onClick={handleAvatarClick} // Open file picker on avatar click
                />
                <AvatarFallback>{formData.name}</AvatarFallback>
            </Avatar>

            <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700">Image</Label>
                <Input
                    type="file"
                    id="photo"
                    ref={fileInputRef} // Attach the ref to the input
                    onChange={handleFileChange}
                />
            </div>
        </>
    );
}
