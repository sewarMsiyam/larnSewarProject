import { ReactNode } from 'react';
import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import '@/app/globals.css'
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/navResponsev"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "dashboard",
  description: "Generated by create next app",
};
import Link from 'next/link';
import Image from "next/image"
type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>

        <NextIntlClientProvider messages={messages}>

          {/* <div className="flex flex-col flex-grow" id="kt_app_root">
            <div className="flex flex-col flex-grow" id="kt_app_page">
              <div id="kt_app_header" className="bg-white shadow-sm">
                <div className="container mx-auto flex items-center justify-between p-4" id="kt_app_header_container">
                  <div className="lg:hidden flex items-center ms-[-12px] me-1 me-md-2" title="Show sidebar menu">
                    <button className="w-9 h-9 p-1 flex items-center justify-center text-primary" id="kt_app_sidebar_mobile_toggle">
                      <span className="w-6 h-6 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                          <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center flex-grow-1 lg:flex-grow-0">
                    <a href="../../demo1/dist/index.html" className="lg:hidden">
                      <img alt="Logo" src="assets/media/logos/default-small.svg" className="h-8" />
                    </a>
                  </div>


                  <div className="flex items-stretch justify-between flex-grow">
                    <div className="flex items-stretch">
                      <div className="flex flex-col lg:flex-row my-5 lg:my-0 items-stretch font-semibold px-2 lg:px-0" id="kt_app_header_menu" data-kt-menu="true">
                        <div  className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg me-0 lg:me-2 p-2">
                          <span className="flex items-center">
                            <span className="text-gray-800">Dashboards</span>
                            <span className="lg:hidden ml-2">▼</span>
                          </span>

                        </div>
                        <div className="flex items-center p-2 rounded-lg cursor-pointer">
                          <span className="flex items-center text-gray-800">Pages</span>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div> */}



          <div className="flex">
            <aside className="hidden lg:flex flex-col fixed w-56 h-screen bg-gray-100 transition-all ease-in-out delay-150">
              <div className="py-4">
                <Link href="/">
                  <Image src="/logo.png" alt="logo" width="110" height="36" className="m-auto" priority />
                </Link>
              </div>
              <hr />
              <div className="py-4">
                <nav className="px-4">
                  <ul>
                    <li>
                      <Accordion type="single" className="w-full" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg>
                              <span className="ps-3">Dashboard</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="ps-3 border-s">
                            <ul className="pl-6">
                              <li className="mb-2">
                                <Link href="#" className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                                  <span className="ps-3">Sub Dashboard 1</span>
                                </Link>
                              </li>
                              <li className="mb-2">
                                <Link href="#" className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                                  <span className="ps-3">Sub Dashboard 2</span>
                                </Link>
                              </li>
                              <li className="mb-2">
                                <Link href="#" className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                                  <span className="ps-3">Sub Dashboard 3</span>
                                </Link>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  </ul>
                </nav>







                <nav className="px-4">
                  <ul>
                    <li>
                      <Accordion type="single" className='w-full' collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg> 
                              <span className="ps-3">Dashboard</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="ps-3 border-s">
                            <Link href="#" className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg> 
                              <span className="ps-3">Dashboard</span>
                            </Link>                         
                            <Link href="#" className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg> 
                              <span className="ps-3">Dashboard</span>
                            </Link>                         
                            <Link href="#" className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg> 
                              <span className="ps-3">Dashboard</span>
                            </Link>                         
                            <Link href="#" className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg> 
                              <span className="ps-3">Dashboard</span>
                            </Link>                         
                            <Link href="#" className="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg> 
                              <span className="ps-3">Dashboard</span>
                            </Link>                       
                      </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  </ul>
                </nav>









              </div>
            </aside>


            <div className="lg:ms-56 transition-all ease-in-out delay-150">
              <header className="fixed flex justify-between items-center w-full bg-gray-100 h-16">
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                      </svg>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <br />
                        <SheetTitle>
                          <Image src="/logo" alt="logo" width="20" height="20" priority />
                        </SheetTitle>
                        <SheetDescription>
                          sssss
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="lg:hidden">
                  logo
                </div>
                <div className="lg:hidden">
                  icons
                </div>

                <div className="hidden lg:block">
                  <Input type="search" placeholder="search" />
                </div>

                {/* <nav className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                    header
                    <LocaleSwitcher />
                    </div>
                  </nav> */}

              </header>
              <main className="mt-16">{children}{children}{children}{children}{children}{children}{children}</main>
            </div>
          </div>

        </NextIntlClientProvider>


        {/* <div className="flex w-full flex-col bg-muted">
          <Aside />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-52">
            <HomeHeaderDash />
            <LocaleSwitcher />
            <NextIntlClientProvider messages={messages}>
              <main className="">
                {children}
              </main>
            </NextIntlClientProvider>

          </div>
        </div> */}






      </body>
    </html>
  )
}
