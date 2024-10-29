import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { authOptions } from "@/lib/authOptions"
import '@/app/globals.css'
import AOSWrapper from '@/components/AOSWrapper'
import SessionWrapper from '@/components/home/layout/SessionWrapper'
import Breadcrumb from "@/components/ui/breadcrumbHome"
import Unauthenticated from "@/components/Unauthenticated"
import ImgUser from "@/components/pages/Profile/ImgUser"
import Navigation from "@/components/pages/Profile/Navigation"

export const metadata: Metadata = {
    title: "سوار - بروفايل المعلم",
    description: "منصة سوار التعليمية - نظام تعليمي متكامل يخدم الطلاب والمعلمين في فلسطين، مصر، السعودية والأردن. تعلم بسهولة وفعالية مع أفضل المناهج العربية",
}

interface SessionUser {
    authToken?: string;
    [key: string]: any;
}

interface Session {
    user?: SessionUser;
    [key: string]: any;
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const locale = await getLocale()
    const messages = await getMessages()
    const session: Session | null = await getServerSession(authOptions)

    if (!session) {
        return (
            <NextIntlClientProvider messages={messages}>
                <Unauthenticated />
            </NextIntlClientProvider>
        )
    }

    if (!session.user?.authToken) {
        return (
            <NextIntlClientProvider messages={messages}>
                <Unauthenticated />
            </NextIntlClientProvider>
        )
    }

    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الملف الشخصي', href: '/instructor/profile', isActive: true }
    ]

    return (
        <NextIntlClientProvider messages={messages}>
            <AOSWrapper>
                <SessionWrapper>
                    <main className="min-h-screen bg-gray-50">
                        <Breadcrumb breadcrumbs={breadcrumbs} />
                        <section className="lg:container mb-20">
                            <div className="flex flex-col justify-center items-center space-y-10 -mt-20">
                                <ImgUser token={session.user.authToken} />
                            </div>
                            <div className="w-full mt-5">
                                <Navigation />
                                <div className="mt-10">
                                    <div className="bg-white rounded-lg p-2 lg:p-10 shadow-md">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </SessionWrapper>
            </AOSWrapper>
        </NextIntlClientProvider>
    )
}