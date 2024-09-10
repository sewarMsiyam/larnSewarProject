import Link from 'next/link';
import Image from "next/image"


const LogoFooter = () => {
    return (
                        <Link href="/">
                            <Image src="/logowhite.png" alt="logo" width="200" height="36" className="m-auto" priority />
                        </Link>
    );
};

export default LogoFooter;



