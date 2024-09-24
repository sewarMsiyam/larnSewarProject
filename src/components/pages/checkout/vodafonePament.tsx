import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsPayment"
import { Textarea } from "@/components/ui/textarea";

import Image from "next/image";


export default function CheckoutVodafone() {
    return (
        <TabsContent value="vodafone">Change your vodafone here.</TabsContent>
    );
}