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
                        <TabsContent value="tawjihi">
                            tawjihi


                <div className="grid gap-2">
                    <Label htmlFor="email">البريد الالكتروني</Label>
                    <div className="relative">
                    <Input
                        id="email"
                        type="email"
                        className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="example@gmail.com"
                        // value={}
                        // onChange={}
                        required
                    />
                    </div>
                </div>



                        </TabsContent>
                        <TabsContent value="university">
                            university
                        </TabsContent>
                    </Tabs>

                </div>
            </section>

        </>
    );
}
