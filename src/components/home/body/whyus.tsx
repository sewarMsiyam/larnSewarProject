import TitleSection from '@/components/title';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function WhyUs() {
    return (
        <>
            <div className="container mt-20">
                <TitleSection text="لماذا نحن" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-20">
                    <div className='relative'>
                        <div className='bg-primary flex gap-10 justify-center items-center w-fit h-20 rounded-3xl px-5 absolute -top-12 right-24'>
                            <h6 className="text-center text-white text-xs"><span className="text-base font-bold">2000</span><br />طالب وأكثر</h6>
                            <div>
                                <div className='flex'>
                                    <Avatar className='border-2 border-white -ms-5'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar className='border-2 border-white -ms-5'>
                                        <AvatarImage src="https://www.w3schools.com/howto/img_avatar.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar className='border-2 border-white -ms-5'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar className='border-2 border-white -ms-5'>
                                        <AvatarImage src="https://www.w3schools.com/howto/img_avatar.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[url('/whyusbg.svg')] bg-contain bg-no-repeat bg-center flex justify-center items-center">
                            <img src="/whyus.png" alt="" className="w-100 lg:w-[65%] p-3" style={{ borderRadius: '8.688rem 1.75rem 2.438rem 1.688rem' }} />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl text-center md:text-right font-bold mb-10">تعلّم بتميز.. لماذا نحن خيارك الأفضل؟</h2>
                        <div className="flex items-start lg:w-[80%] mb-5">
                            <div className="flex justify-center items-center p-2 rounded-2xl me-4 bg-[#EEEEEE]">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.2902 14.3604V18.6137C28.2902 21.707 25.7835 24.2137 22.6902 24.2137H17.9435C17.2102 24.2137 16.6102 24.8004 16.6102 25.547V26.6404C16.6102 27.3737 17.2102 27.9737 17.9435 27.9737H20.9568C21.4768 27.9737 21.9035 28.387 21.9035 28.9204C21.9035 29.4404 21.4768 29.867 20.9568 29.867H10.3702C9.85016 29.867 9.42349 29.4404 9.42349 28.9204C9.42349 28.387 9.85016 27.9737 10.3702 27.9737H13.3835C14.1168 27.9737 14.7168 27.3737 14.7168 26.6404V25.547C14.7168 24.8004 14.1168 24.2137 13.3835 24.2137H8.58349C5.50349 24.2137 2.99683 21.707 2.99683 18.6137V10.1204C2.99683 7.04036 5.50349 4.53369 8.58349 4.53369H14.3302C15.0635 4.53369 15.6635 5.13369 15.6635 5.86702V8.73369C15.6635 11.307 17.3835 13.027 19.9435 13.027H26.9568C27.6902 13.027 28.2902 13.627 28.2902 14.3604Z" fill="url(#paint0_linear_206_445)" />
                                    <path d="M29.6502 3.67985L28.1436 4.73318V4.17318C28.1436 2.90652 27.1169 1.89318 25.8636 1.89318H20.1569C18.7836 1.87985 17.6636 2.99985 17.6636 4.37318V8.74652C17.6636 9.89318 18.2369 11.0265 19.9436 11.0265H25.8502C27.1169 11.0265 28.1302 9.99985 28.1302 8.74652V8.17318L29.6369 9.22652C30.3969 9.74652 30.9969 9.42652 30.9969 8.51985V4.38652C30.9969 3.47985 30.3969 3.17318 29.6502 3.67985Z" fill="url(#paint1_linear_206_445)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_206_445" x1="12.4327" y1="4.53369" x2="13.855" y2="29.867" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0AD491" />
                                            <stop offset="1" stopColor="#003366" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_206_445" x1="22.7952" y1="1.89307" x2="21.1698" y2="27.3697" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0AD491" />
                                            <stop offset="1" stopColor="#003366" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">حصص خصوصية لجميع المراحل</h3>
                                <p className='text-xs text-[#333333]'>اختر معلمك المثالي واحجز حصتك من المرحلة الابتدائية إلى الثانوية، بأبسط الخطوات ومن راحة منزلك.</p>
                            </div>
                        </div>
                        <div className="flex items-start lg:w-[80%] mb-5">
                            <div className="flex justify-center items-center p-2 rounded-2xl me-4 bg-[#EEEEEE]">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.2902 14.3604V18.6137C28.2902 21.707 25.7835 24.2137 22.6902 24.2137H17.9435C17.2102 24.2137 16.6102 24.8004 16.6102 25.547V26.6404C16.6102 27.3737 17.2102 27.9737 17.9435 27.9737H20.9568C21.4768 27.9737 21.9035 28.387 21.9035 28.9204C21.9035 29.4404 21.4768 29.867 20.9568 29.867H10.3702C9.85016 29.867 9.42349 29.4404 9.42349 28.9204C9.42349 28.387 9.85016 27.9737 10.3702 27.9737H13.3835C14.1168 27.9737 14.7168 27.3737 14.7168 26.6404V25.547C14.7168 24.8004 14.1168 24.2137 13.3835 24.2137H8.58349C5.50349 24.2137 2.99683 21.707 2.99683 18.6137V10.1204C2.99683 7.04036 5.50349 4.53369 8.58349 4.53369H14.3302C15.0635 4.53369 15.6635 5.13369 15.6635 5.86702V8.73369C15.6635 11.307 17.3835 13.027 19.9435 13.027H26.9568C27.6902 13.027 28.2902 13.627 28.2902 14.3604Z" fill="url(#paint0_linear_206_445)" />
                                    <path d="M29.6502 3.67985L28.1436 4.73318V4.17318C28.1436 2.90652 27.1169 1.89318 25.8636 1.89318H20.1569C18.7836 1.87985 17.6636 2.99985 17.6636 4.37318V8.74652C17.6636 9.89318 18.2369 11.0265 19.9436 11.0265H25.8502C27.1169 11.0265 28.1302 9.99985 28.1302 8.74652V8.17318L29.6369 9.22652C30.3969 9.74652 30.9969 9.42652 30.9969 8.51985V4.38652C30.9969 3.47985 30.3969 3.17318 29.6502 3.67985Z" fill="url(#paint1_linear_206_445)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_206_445" x1="12.4327" y1="4.53369" x2="13.855" y2="29.867" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0AD491" />
                                            <stop offset="1" stopColor="#003366" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_206_445" x1="22.7952" y1="1.89307" x2="21.1698" y2="27.3697" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0AD491" />
                                            <stop offset="1" stopColor="#003366" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">حصص خصوصية لجميع المراحل</h3>
                                <p className='text-xs text-[#333333]'>اختر معلمك المثالي واحجز حصتك من المرحلة الابتدائية إلى الثانوية، بأبسط الخطوات ومن راحة منزلك.</p>
                            </div>
                        </div>
                        <div className="flex items-start lg:w-[80%] mb-5">
                            <div className="flex justify-center items-center p-2 rounded-2xl me-4 bg-[#EEEEEE]">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.2902 14.3604V18.6137C28.2902 21.707 25.7835 24.2137 22.6902 24.2137H17.9435C17.2102 24.2137 16.6102 24.8004 16.6102 25.547V26.6404C16.6102 27.3737 17.2102 27.9737 17.9435 27.9737H20.9568C21.4768 27.9737 21.9035 28.387 21.9035 28.9204C21.9035 29.4404 21.4768 29.867 20.9568 29.867H10.3702C9.85016 29.867 9.42349 29.4404 9.42349 28.9204C9.42349 28.387 9.85016 27.9737 10.3702 27.9737H13.3835C14.1168 27.9737 14.7168 27.3737 14.7168 26.6404V25.547C14.7168 24.8004 14.1168 24.2137 13.3835 24.2137H8.58349C5.50349 24.2137 2.99683 21.707 2.99683 18.6137V10.1204C2.99683 7.04036 5.50349 4.53369 8.58349 4.53369H14.3302C15.0635 4.53369 15.6635 5.13369 15.6635 5.86702V8.73369C15.6635 11.307 17.3835 13.027 19.9435 13.027H26.9568C27.6902 13.027 28.2902 13.627 28.2902 14.3604Z" fill="url(#paint0_linear_206_445)" />
                                    <path d="M29.6502 3.67985L28.1436 4.73318V4.17318C28.1436 2.90652 27.1169 1.89318 25.8636 1.89318H20.1569C18.7836 1.87985 17.6636 2.99985 17.6636 4.37318V8.74652C17.6636 9.89318 18.2369 11.0265 19.9436 11.0265H25.8502C27.1169 11.0265 28.1302 9.99985 28.1302 8.74652V8.17318L29.6369 9.22652C30.3969 9.74652 30.9969 9.42652 30.9969 8.51985V4.38652C30.9969 3.47985 30.3969 3.17318 29.6502 3.67985Z" fill="url(#paint1_linear_206_445)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_206_445" x1="12.4327" y1="4.53369" x2="13.855" y2="29.867" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0AD491" />
                                            <stop offset="1" stopColor="#003366" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_206_445" x1="22.7952" y1="1.89307" x2="21.1698" y2="27.3697" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0AD491" />
                                            <stop offset="1" stopColor="#003366" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">حصص خصوصية لجميع المراحل</h3>
                                <p className='text-xs text-[#333333]'>اختر معلمك المثالي واحجز حصتك من المرحلة الابتدائية إلى الثانوية، بأبسط الخطوات ومن راحة منزلك.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

