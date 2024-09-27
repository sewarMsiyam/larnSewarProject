
import Link from 'next/link';


export default async function Unauthenticated() {

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[80vh]">
                <div className="container p-4 bg-white rounded-lg shadow-md">
                    <div className="container py-10">
                        <p className="text-2xl text-center font-bold mb-4">  <br />يجب ان تكون مسجل دخول بالموقع <br /></p>
                        <div className="w-full mt-8">
                            <Link href="/student/login" className="before:ease relative overflow-hidden btn-primary font-medium py-4 px-6 md:px-3 lg:px-6 m-1 transition-all flex items-center justify-center w-full before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-100">
                                <span className="relative z-10">تسجيل دخول</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
