import Link from 'next/link';

interface BreadcrumbProps {
  breadcrumbs: {
    label: string;
    href: string;
    isActive?: boolean; // for highlighting the active breadcrumb
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <section className="bg-gridColor">
      <div className="container">
        <div className="py-16">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-5">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <Link href={breadcrumb.href} className={`${breadcrumb.isActive ? 'font-bold text-primary px-3' : 'text-[#333] me-3'}`}>
                      {breadcrumb.label}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
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
                            fill="#333333"
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
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
