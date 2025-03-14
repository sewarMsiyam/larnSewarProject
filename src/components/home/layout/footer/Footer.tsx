"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogoFooter from "@/components/home/layout/footer/logoFooter";
import { fetchOneP } from '@/app/api/dataFetch';
import { Snettigs } from '@/app/api/interfaces';

const Footer = () => {
    const [settings, setSettings] = useState<Snettigs | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchOneP('social_media');
                if (data) {
                    setSettings(data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
                setError('حدث خطأ أثناء تحميل البيانات');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <footer className="bg-footer-gradient">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-5 py-20 gap-10">
                    <div className="col-span-2 space-y-10 text-center">
                        <LogoFooter />
                        <div className="flex justify-center items-center gap-4 text-white">
                            {loading ? (
                                <div className="flex gap-4"></div>
                            ) : error ? (
                                <div className="text-sm text-red-400">فشل تحميل روابط التواصل الاجتماعي</div>
                            ) : (
                                <>
                                    {settings?.facebook && (
                                        <Link href={settings.facebook} className="w-9 h-9 border rounded-full flex justify-center items-center hover:bg-white hover:text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 18 19" fill="none">
                                                <path d="M4.93823 8.35938V11.3594H7.18823V16.6094H10.1882V11.3594H12.4382L13.1882 8.35938H10.1882V6.85938C10.1882 6.66046 10.2673 6.4697 10.4079 6.32905C10.5486 6.18839 10.7393 6.10938 10.9382 6.10938H13.1882V3.10938H10.9382C9.94367 3.10938 8.98984 3.50446 8.28658 4.20772C7.58332 4.91099 7.18823 5.86481 7.18823 6.85938V8.35938H4.93823Z" fill="currentColor" />
                                            </svg>
                                        </Link>
                                    )}
                                    {settings?.instagram && (
                                        <Link href={settings.instagram} className="w-9 h-9 border rounded-full flex justify-center items-center hover:bg-white hover:text-primary">
                                            <svg width="18" height="18" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_109_578)">
                                                    <path d="M12.8682 2.20402C16.1383 2.20402 16.5256 2.21836 17.8117 2.27573C19.0069 2.32833 19.6523 2.52913 20.0826 2.69646C20.6516 2.91638 21.0627 3.18412 21.4882 3.60962C21.9185 4.03991 22.1815 4.44629 22.4014 5.01522C22.5687 5.44551 22.7695 6.09572 22.8221 7.28618C22.8795 8.57703 22.8938 8.96429 22.8938 12.2297C22.8938 15.4999 22.8795 15.8871 22.8221 17.1732C22.7695 18.3684 22.5687 19.0139 22.4014 19.4441C22.1815 20.0131 21.9137 20.4242 21.4882 20.8498C21.0579 21.28 20.6516 21.543 20.0826 21.7629C19.6523 21.9302 19.0021 22.131 17.8117 22.1836C16.5208 22.241 16.1335 22.2554 12.8682 22.2554C9.59798 22.2554 9.21072 22.241 7.92465 22.1836C6.72941 22.131 6.08398 21.9302 5.65369 21.7629C5.08476 21.543 4.67359 21.2753 4.24809 20.8498C3.8178 20.4195 3.55485 20.0131 3.33493 19.4441C3.16759 19.0139 2.96679 18.3637 2.9142 17.1732C2.85683 15.8823 2.84249 15.4951 2.84249 12.2297C2.84249 8.95951 2.85683 8.57225 2.9142 7.28618C2.96679 6.09094 3.16759 5.44551 3.33493 5.01522C3.55485 4.44629 3.82258 4.03513 4.24809 3.60962C4.67838 3.17934 5.08476 2.91638 5.65369 2.69646C6.08398 2.52913 6.73419 2.32833 7.92465 2.27573C9.21072 2.21836 9.59798 2.20402 12.8682 2.20402ZM12.8682 0C9.54539 0 9.12945 0.0143429 7.82425 0.0717143C6.52383 0.129086 5.62979 0.339448 4.85527 0.640648C4.04729 0.956191 3.36361 1.37213 2.68472 2.05581C2.00104 2.73471 1.5851 3.41838 1.26955 4.22158C0.968354 5.00088 0.757992 5.89014 0.700621 7.19056C0.643249 8.50054 0.628906 8.91648 0.628906 12.2392C0.628906 15.562 0.643249 15.978 0.700621 17.2832C0.757992 18.5836 0.968354 19.4776 1.26955 20.2521C1.5851 21.0601 2.00104 21.7438 2.68472 22.4227C3.36361 23.1016 4.04729 23.5223 4.85049 23.8331C5.62979 24.1343 6.51904 24.3446 7.81946 24.402C9.12467 24.4594 9.54061 24.4737 12.8634 24.4737C16.1861 24.4737 16.6021 24.4594 17.9073 24.402C19.2077 24.3446 20.1017 24.1343 20.8763 23.8331C21.6795 23.5223 22.3631 23.1016 23.042 22.4227C23.7209 21.7438 24.1416 21.0601 24.4524 20.2569C24.7536 19.4776 24.964 18.5884 25.0213 17.2879C25.0787 15.9827 25.0931 15.5668 25.0931 12.244C25.0931 8.92126 25.0787 8.50532 25.0213 7.20012C24.964 5.8997 24.7536 5.00566 24.4524 4.23115C24.1512 3.41838 23.7353 2.73471 23.0516 2.05581C22.3727 1.37692 21.689 0.956191 20.8858 0.645429C20.1065 0.344229 19.2173 0.133867 17.9168 0.0764953C16.6069 0.0143429 16.1909 0 12.8682 0Z" fill="currentColor" />
                                                    <path d="M12.868 5.95239C9.39704 5.95239 6.58105 8.76838 6.58105 12.2394C6.58105 15.7103 9.39704 18.5263 12.868 18.5263C16.339 18.5263 19.155 15.7103 19.155 12.2394C19.155 8.76838 16.339 5.95239 12.868 5.95239ZM12.868 16.3175C10.6162 16.3175 8.78986 14.4912 8.78986 12.2394C8.78986 9.98752 10.6162 8.16119 12.868 8.16119C15.1198 8.16119 16.9462 9.98752 16.9462 12.2394C16.9462 14.4912 15.1198 16.3175 12.868 16.3175Z" fill="currentColor" />
                                                    <path d="M20.8715 5.7036C20.8715 6.51636 20.2118 7.17135 19.4038 7.17135C18.591 7.17135 17.936 6.51158 17.936 5.7036C17.936 4.89083 18.5958 4.23584 19.4038 4.23584C20.2118 4.23584 20.8715 4.89561 20.8715 5.7036Z" fill="currentColor" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_109_578">
                                                        <rect width="24.4785" height="24.4785" fill="currentColor" transform="translate(0.628906)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Link>
                                    )}
                                    {settings?.twitter && (
                                        <Link href={settings.twitter} className="w-9 h-9 border rounded-full flex justify-center items-center hover:bg-white hover:text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 19" fill="none">
                                                <path d="M16.2273 3.82758C15.4773 4.19508 14.7423 4.34433 13.9773 4.57008C13.1365 3.62133 11.89 3.56883 10.6923 4.01733C9.49455 4.46583 8.71005 5.56233 8.7273 6.82008V7.57008C6.29355 7.63233 4.12605 6.52383 2.7273 4.57008C2.7273 4.57008 -0.409205 10.1448 5.7273 12.8201C4.3233 13.7553 2.92305 14.3861 1.22729 14.3201C3.7083 15.6723 6.41205 16.1373 8.7528 15.4578C11.4378 14.6778 13.6443 12.6656 14.491 9.65133C14.7436 8.73458 14.8691 7.78747 14.8638 6.83658C14.8623 6.64983 15.9963 4.75758 16.2273 3.82683V3.82758Z" fill="currentColor" />
                                            </svg>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col text-white gap-4 text-sm">
                        <h5 className="lg:mb-4 font-bold text-base">لينكات سريعة</h5>
                        <Link href="/instructor/register">انضم كمعلم</Link>
                        <Link href="/course">الدروس التعليمية</Link>
                        <Link href="/">بنك الأسئلة</Link>
                    </div>
                    <div className="flex flex-col text-white gap-4 text-sm">
                        <h5 className="lg:mb-4 font-bold text-base">اتصل بنا</h5>
                        {settings?.whatsapp && (
                            <Link href={`https://wa.me/${settings.whatsapp}`}>{settings.whatsapp}</Link>
                        )}
                        {settings?.email && (
                            <Link href={`mailto:${settings.email}`}>{settings.email}</Link>
                        )}
                    </div>
                    <div className="flex flex-col text-white gap-4 text-sm">
                        <h5 className="lg:mb-4 font-bold text-base">الخصوصية</h5>
                        <Link href="/privacy-policy">سياسة الخصوصية</Link>
                        <Link href="/terms-conditions">الشروط والأحكام</Link>
                    </div>
                </div>
                <div className="pb-5">
                    <p className="text-white text-center">
                        حقوق الطبع والنشر&copy; {new Date().getFullYear()} ، جميع الحقوق محفوظة لدي{" "}
                        <Link className="font-bold underline" href="https://sadeim.com">
                            شركة سديم
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;



