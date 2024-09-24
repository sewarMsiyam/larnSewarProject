import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function ProfileIndex() {
    const t = useTranslations('HomePage');
    return (
        <>
            <section className="container">
                <div className="flex flex-col justify-center items-center space-y-10 -mt-10">                
                    <Avatar>
                        <AvatarImage
                            src=''
                            alt="Teacher Image"
                            className="shadow rounded-full"
                        />
                        <AvatarFallback>sewar</AvatarFallback>
                    </Avatar>


                    <Tabs defaultValue="tawjihi" dir="rtl" className='w-full'>
                        <TabsList className='mb-5'>
                            <TabsTrigger value="tawjihi">dd</TabsTrigger>
                            <TabsTrigger value="university">معلم جامعة</TabsTrigger>
                        </TabsList>
                        <TabsContent value="university">
                            university
                        </TabsContent>
                    </Tabs>

                </div>
            </section>

        </>
    );
}
