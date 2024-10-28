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
import ImgUser from "@/components/pages/instructorProfile/ImgUser"
import Navigation from "@/components/pages/instructorProfile/Navigation"

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

    // If no session exists, show unauthenticated component
    if (!session) {
        return (
            <NextIntlClientProvider messages={messages}>
                <Unauthenticated />
            </NextIntlClientProvider>
        )
    }

    // If session exists but no auth token, show error message
    if (!session.user?.authToken) {
        return (
            <NextIntlClientProvider messages={messages}>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center p-8 bg-white rounded-lg shadow-md">
                        <p className="text-red-600 text-lg font-semibold mb-4">
                            يجب ان تكون مسجل دخول
                        </p>
                        <Link
                            href="/auth/login"
                            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
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