
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import DetailsInstructors from '@/components/pages/instructor/DetailsInstructors';


export default function InstructorsDetals({ params }: { params: { id: number } }) {
    return (
        <>
            <Breadcrumb className="container mb-3 mt-3">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-[#333333] font-medium">الرئيسية</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
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
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components" className="text-primary font-bold">تفاصيل المعلم</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <DetailsInstructors id={params.id} />
        

        </>
    );
}