"use client";
import { TabsContent } from "@/components/ui/tabsProfile"
import { Calendar } from "@/components/ui/calendar"

type CheckoutFormProps = {
    token: string;
};
export default function HouerLib({ token }: CheckoutFormProps) {
    return (
        <>
            <TabsContent value="houerLib" className="bg-white rounded-lg p-2 lg:p-10 shadow-md">
                الساعات المكتبية 


                <Calendar
                    mode="single"
                    // selected={selectedDate}
                    // onSelect={handleDateSelect}
                    // disabled={isDateUnavailable}
                    // modifiers={{ unavailable: isDateUnavailable }}
                    className="rounded-xl shadow-sm border w-full"
                />

            </TabsContent>

        </>
    );
}