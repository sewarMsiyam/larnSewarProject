import Image from "next/image"
import Link from 'next/link';

export default function Logo() {
    return (
    <div className="">
        <Link href="/">
            <Image src="/logo.png" alt="logo" width="110" height="36" className="m-auto" priority  />
        </Link>
    </div>
    );
}