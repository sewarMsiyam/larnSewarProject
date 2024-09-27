import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import Image from "next/image";

export default function PrivetCourse() {
    const t = useTranslations('HomePage');
    return (
        <>
            <TabsContent value="privetCourse">
                privet Course 
            </TabsContent>
        </>
    );
}
