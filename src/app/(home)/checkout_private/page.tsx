import Breadcrumb from "@/components/ui/breadcrumbHome"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";

import Image from "next/image";


export default function CheckoutCourse() {
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'تفاصيل الدفع', href: '/checkout_course', isActive: true }
    ]

    return (
        <>
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <div className="container my-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className="bg-white p-10 rounded-2xl shadow-md">
                            <h2 className="text-xl font-bold mb-4">تفاصيل الدفع</h2>
                            <RadioGroup dir="rtl">
                                <RadioGroupItem value="card">
                                    <span className="flex items-center gap-2">
                                        <Image
                                            src="/card-icon.png"
                                            alt="Payment Card"
                                            width={24}
                                            height={24}
                                            className="mr-2"
                                        />
                                        بطاقة الدفع
                                    </span>
                                </RadioGroupItem>
                                <RadioGroupItem value="bank">
                                    <span className="flex items-center gap-2">
                                        <Image
                                            src="/bank-icon.png"
                                            alt="Bank Transfer"
                                            width={24}
                                            height={24}
                                            className="mr-2"
                                        />
                                        تحويل بنكي
                                    </span>
                                </RadioGroupItem>
                                <RadioGroupItem value="vodafone">
                                    <span className="flex items-center gap-2">
                                        <Image
                                            src="/vodafone-logo.png"
                                            alt="Vodafone Cash"
                                            width={24}
                                            height={24}
                                            className="mr-2"
                                        />
                                        فودافون كاش
                                    </span>
                                </RadioGroupItem>
                            </RadioGroup>
                            <div className="grid gap-2 mt-8">
                                <Label htmlFor="nameCard">الاسم على البطاقة</Label>
                                <div className="relative">
                                    <Input
                                        id="nameCard"
                                        type="text"
                                        className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder=""
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2 mt-8">
                                <Label htmlFor="nameCard">الرقم على البطاقة</Label>
                                <div className="relative">
                                    <Input
                                        id="nameCard"
                                        type="text"
                                        className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder=""
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex w-full gap-5 mt-8">
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="nameCard">تاريخ الانتهاء</Label>
                                    <div className="relative">
                                        <Input
                                            id="nameCard"
                                            type="text"
                                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="nameCard">CVV</Label>
                                    <div className="relative">
                                        <Input
                                            id="nameCard"
                                            type="text"
                                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="mt-8 w-full bg-btn-authColor rounded-2xl py-6 text-white gap-1">
                                ادفع
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 25 25"
                                    fill="none" >
                                    <g clipPath="url(#clip0_516_4347)">
                                    <path
                                        d="M8.42761 13.305L13.7916 18.669L12.3776 20.083L4.59961 12.305L12.3776 4.52698L13.7916 5.94098L8.42761 11.305L20.5996 11.305V13.305H8.42761Z"
                                        fill="#ffffff"
                                    />
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_516_4347">
                                        <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                        transform="matrix(-1 0 0 -1 24.5996 24.3051)"
                                        />
                                    </clipPath>
                                    </defs>
                                </svg>
                            </Button>      
                        </div>
                    </div>
                    
                    <div className="bg-white p-10 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-4">
                        <Avatar>
                            <AvatarImage src="instructor" alt="name" className="rounded-full" />
                            <AvatarFallback>س</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg">الأستاذ محمد علي</h3>
                        <p>مدرس فيزياء</p>

                        <div className="py-5 bg-[#F9F9F9] w-full rounded-xl flex justify-around items-center font-bold">
                            <div>
                                <p>التاريخ:</p>
                                <p>الوقت:</p>
                            </div>
                            <div>
                                <p className="text-primary">11 سبتمبر 2024</p>
                                <p className="text-primary">11 سبتمبر 2024</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <p>المجموع الفرعي</p>
                            <b className="text-[#FE7A36]">50$</b>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <p>خصم (10%)</p>
                            <b className="text-[#FE7A36]">-10$</b>
                        </div>
                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                        <div className="flex justify-between items-center w-full">
                            <p> المبلغ الكلي</p>
                            <b className="text-[#FE7A36]">40$</b>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}