import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsPayment"
import { Textarea } from "@/components/ui/textarea";

import Image from "next/image";


export default function CheckoutBank() {
    return (
     
                    <TabsContent value="bank">
                        <div className="grid gap-2 mt-8">
                            <Label htmlFor="nameCard">الوصف</Label>
                            <div className="relative">
                                <Textarea
                                    id="message"
                                    //  value={}
                                    // onChange={(e) => setContent(e.target.value)}
                                    rows={5}
                                    className="border rounded-xl mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="mt-8 w-full bg-btn-authColor rounded-2xl py-6 text-white gap-1">
                            ادفع
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 25 25"
                                fill="none"
                            >
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
                    </TabsContent>
    );
}