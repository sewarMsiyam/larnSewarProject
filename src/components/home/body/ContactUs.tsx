"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { postData } from '@/app/api/dataFetch';
import Image from 'next/image';
import TitleSection from '@/components/title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUs() {
  const t = useTranslations('HomePage');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await postData('contact_us', { name, email, content });

      if (response && response.status == 200) {
        toast.success('تم إرسال الرسالة بنجاح!');
        setName('');
        setEmail('');
        setContent('');
      } else {
        toast.error('فشل في إرسال الرسالة.');
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرسالة.');
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
            <Image src="/concatus.png" width="400" height="20" alt="" className="w-full lg:w-[590px]" />
          </div>
          <div className="">
            <Card className='border-[#DDDDDD] lg:rounded-[40px] lg:p-7'>
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
                    <Textarea
                      id="message"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={5}
                      className="border bg-white rounded-xl mt-1 block w-full  ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                  </div>

                  <div className="text-end">
                    <Button type="submit" disabled={loading} className="btn-primary rounded-2xl font-medium py-2.5 px-8 md:px-3 lg:px-16 m-1 text-white before:ease relative overflow-hidden btn-primary transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                      {loading ? 'جاري الارسال...' : 'إرسال'}
                    </Button>
                  </div>
                </form>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

