"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { postData } from '@/app/api/dataFetch';
import Image from 'next/image';
import TitleSection from '@/components/title';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function ContactUs() {
  const t = useTranslations('HomePage');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {
      const response = await postData('/send_message', { name, email, content });

      if (response && response.message === 'Message sent successfully!') {
        setStatus('Message sent successfully!');
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred while sending the message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='container my-20'>
        <TitleSection text="اتصل بنا" />

        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-5'>
          <div>
            <Image src="/concatus.png" width="400" height="20" alt="" className="w-full w-[590px]" />
          </div>
          <div className="">

            <Card className='lg:rounded-[40px] lg:p-7'>
              <CardHeader>
                <CardTitle className="text-xl text-center mb-2">نحن هنا لمساعدتك!</CardTitle>
                <CardDescription className="text-center text-[#707070] w-4/5 mx-auto">فريقنا المتخصص هنا للإجابة على جميع استفساراتك ومساعدتك في تحقيق أهدافك بكل سهولة.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                  <div className="space-y-1">
                    <Label htmlFor="name">الاسم كامل</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    className="border bg-white rounded-xl mt-1 block w-full  ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    className="border bg-white rounded-xl mt-1 block w-full ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="message">رسالتك</Label>
                    <textarea
                      id="message"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={5}
                    className="border bg-white rounded-xl mt-1 block w-full ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                  <div className="text-end">
                    <Button type="submit" disabled={loading} className="btn-primary rounded-2xl font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 text-white">
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
                {status && <p className="mt-4 text-green-500">{status}</p>}
              </CardContent>
            </Card>





          </div>
        </div>
      </div>

    </>
  );
}
