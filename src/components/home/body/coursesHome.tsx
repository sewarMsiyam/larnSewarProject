import { useTranslations } from 'next-intl';
import TitleSection from '@/components/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseCard from '@/components/ui/cardcourses';
export default function CoursesHome() {
    const t = useTranslations('HomePage');
    const courses = [
        {
            imageSrc: "/course2.png",
            title: "لغة الانجليزية",
            duration: "40 دقيقة",
            lessons: "08",
            exam: "1",
            summary: "01",
            teacherName: "الأستاذ محمد علي",
            teacherImage: "https://www.w3schools.com/howto/img_avatar.png",
            price: "20$",
        },
        {
            imageSrc: "/course2.png",
            title: "لغة الانجليزية",
            duration: "40 دقيقة",
            lessons: "08",
            exam: "1",
            summary: "01",
            teacherName: "الأستاذ محمد علي",
            teacherImage: "https://www.w3schools.com/howto/img_avatar.png",
            price: "20$",
        },
        {
            imageSrc: "/course2.png",
            title: "لغة الانجليزية",
            duration: "40 دقيقة",
            lessons: "08",
            exam: "1",
            summary: "01",
            teacherName: "الأستاذ محمد علي",
            teacherImage: "https://www.w3schools.com/howto/img_avatar.png",
            price: "20$",
        },
        {
            imageSrc: "/course2.png",
            title: "لغة الانجليزية",
            duration: "40 دقيقة",
            lessons: "08",
            exam: "1",
            summary: "01",
            teacherName: "الأستاذ محمد علي",
            teacherImage: "https://www.w3schools.com/howto/img_avatar.png",
            price: "20$",
        },
        {
            imageSrc: "/course2.png",
            title: "لغة الانجليزية",
            duration: "40 دقيقة",
            lessons: "08",
            exam: "1",
            summary: "01",
            teacherName: "الأستاذ محمد علي",
            teacherImage: "https://www.w3schools.com/howto/img_avatar.png",
            price: "20$",
        },

    ];

    return (
        <>

            <section className="md:container my-11">
                <TitleSection text="الدروس التعليمية" />

                <Tabs defaultValue="tawjihi" dir="rtl" className="text-center">
                    <TabsList className='mb-5'>
                        <TabsTrigger value="tawjihi">طالب توجيهي</TabsTrigger>
                        <TabsTrigger value="university">طالب جامعة</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tawjihi">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">

                        {courses.map((course, index) => (
                                <CourseCard
                                    key={index}
                                    imageSrc={course.imageSrc}
                                    title={course.title}
                                    duration={course.duration}
                                    lessons={course.lessons}
                                    exam={course.exam}
                                    summary={course.summary}
                                    teacherName={course.teacherName}
                                    teacherImage={course.teacherImage}
                                    price={course.price}
                                />
                            ))}

                        </div>
                    </TabsContent>
                    <TabsContent value="university">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <CourseCard
                                imageSrc="/course2.png"
                                title="لغة الانجليزية"
                                duration="40 دقيقة"
                                lessons="08"
                                exam="1"
                                summary="01"
                                teacherName="الأستاذ محمد علي"
                                teacherImage="https://www.w3schools.com/howto/img_avatar.png"
                                price="20$"
                            />
                            <CourseCard
                                imageSrc="/course2.png"
                                title="لغة الانجليزية"
                                duration="40 دقيقة"
                                lessons="08"
                                exam="1"
                                summary="01"
                                teacherName="الأستاذ محمد علي"
                                teacherImage="https://www.w3schools.com/howto/img_avatar.png"
                                price="20$"
                            />
                            <CourseCard
                                imageSrc="/course2.png"
                                title="لغة الانجليزية"
                                duration="40 دقيقة"
                                lessons="08"
                                exam="1"
                                summary="01"
                                teacherName="الأستاذ محمد علي"
                                teacherImage="https://www.w3schools.com/howto/img_avatar.png"
                                price="20$"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </>
    );
}