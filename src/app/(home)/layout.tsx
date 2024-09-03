import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
 
export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <h1 className="text-5xl">Header</h1>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}