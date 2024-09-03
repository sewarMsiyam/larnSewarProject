
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Navbar() {
    const t = useTranslations('LayoutLanding');

    const navigation = [
      { name: t('home'), href: '/' },
      { name: t('framework'), href: '/login', },
      { name: t('features'), href: '/' },
      { name: t('packages'), href: '/'},
      { name: t('contact_us'), href: '/' },
    ]
    return (
        <nav className="">
        <ul className="flex flex-col md:flex-row items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='rounded-md px-3 py-2 text-sm font-medium'
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
    );
}