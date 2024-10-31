'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const t = useTranslations('LayoutLanding');
  const pathname = usePathname();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: 'توجيهي', href: '/courses/tawjihi' },
    { name: 'جامعة', href: '/courses/university' },
    { name: 'المعلمون', href: '/instructor' },
    { name: t('contact_us'), href: '/contact_us' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="p-2">
      <ul className="flex flex-col md:flex-row items-center gap-2">
        {navigation.map((item) => (
          <li key={item.name} className="relative">
            <Link
              href={item.href}
              className={`
                relative
                block
                px-3
                py-2
                text-medium
                transition-all
                duration-300
                hover:text-primary
                ${isActive(item.href) ? 'text-primary font-semibold' : 'text-gray-600'}
                group
              `}
            >
              {item.name}
              <span
                className={`
                  absolute
                  bottom-0
                  right-0
                  w-full
                  h-0.5
                  bg-primary
                  transform
                  origin-right
                  transition-all
                  duration-300
                  ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0'}
                  group-hover:scale-x-100
                `}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}