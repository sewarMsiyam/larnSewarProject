"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { postData } from '@/app/api/dataFetch';
import Image from 'next/image';
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
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-5'>
          <div>
            <Image src="/concatus.png" width="400" height="20" alt="" className="w-full" />
          </div>
          <div className="">

            <Card>
              <CardHeader>
                <CardTitle>نحن هنا لمساعدتك!</CardTitle>
                <CardDescription>فريقنا المتخصص هنا للإجابة على جميع استفساراتك ومساعدتك في تحقيق أهدافك بكل سهولة.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    className="border rounded-2xl mt-1 block w-full  ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-2xl mt-1 block w-full ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="message">{t('message')}</Label>
                    <textarea
                      id="message"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    className="border rounded-2xl mt-1 block w-full ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className='text-white-foreground'>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
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
