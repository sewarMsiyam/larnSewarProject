
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsPayment"
import Image from "next/image";
import CheckoutCard from "@/components/pages/checkout/cardPament";
import CheckoutBank from "@/components/pages/checkout/bankPament";
import CheckoutVodafone from "@/components/pages/checkout/vodafonePament";

type CheckoutFormProps = {
    token: string;
};

export default function CheckoutForm({ token }: CheckoutFormProps) {
    return (
        <div className="col-span-2">
            <div className="bg-white p-10 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-4">تفاصيل الدفع</h2>
                <Tabs defaultValue="bank" dir="rtl">
                    <TabsList>
                        <RadioGroup dir="rtl" defaultValue="card">
                            {/* <TabsTrigger value="card" asChild>
                                <RadioGroupItem value="card" >
                                <div className="flex items-center gap-2">
                                    <Image
                                    src="/card-icon.png"
                                    alt="Payment Card"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                    />
                                    بطاقة الدفع
                                </div>
                                </RadioGroupItem>
                            </TabsTrigger> */}

                            <TabsTrigger value="bank" asChild>
                                <RadioGroupItem value="bank">
                                <div className="flex items-center gap-2">
                                    <Image
                                    src="/bank-icon.png"
                                    alt="Bank Transfer"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                    />
                                    تحويل بنكي
                                </div>
                                </RadioGroupItem>
                            </TabsTrigger>

                            <TabsTrigger value="vodafone" asChild>
                                <RadioGroupItem value="vodafone">
                                <div className="flex items-center gap-2">
                                    <Image
                                    src="/vodafone-logo.png"
                                    alt="Vodafone Cash"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                    />
                                    فودافون كاش
                                </div>
                                </RadioGroupItem>
                            </TabsTrigger>
                        </RadioGroup>
                    </TabsList>
                    <CheckoutCard />
                    <CheckoutBank token={token} />
                    <CheckoutVodafone token={token} />
                </Tabs>
            </div>
        </div>
    );
}