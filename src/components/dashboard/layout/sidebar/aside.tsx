import Image from "next/image"
import Link from "next/link"
import {
  Home,
  Search,
  ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Aside() {
    return (
      <>
       <sidebar className="fixed inset-y-0 left-0 z-10 hidden w-52 flex-col border-r sm:flex">
       
       <nav className="flex flex-col items-start ps-5 gap-4 px-2 sm:py-5">

       <Link href="#" className="flex text-center">
         <div className="">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
         </div>
       </Link>
       {/* <div className="w-full h-px bg-gray-200 my-3"></div> */}

         <Link href="/" className="flex h-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 ">
           <Home className="h-5 w-5 mx-2" />
           <span className="">Home</span>
         </Link>
         <Link href="/dashboard" className="flex h-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 ">
           <Home className="h-5 w-5 mx-2" />
           <span className="">Dashboard</span>
         </Link>
         <Link href="/dashboard/test1" className="flex h-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 ">
           <ShoppingCart className="h-5 w-5 mx-2" />
           <span className=""> DataTable</span>
         </Link>
         <Link href="/dashboard/test2" className="flex h-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 ">
           <Home className="h-5 w-5 mx-2" />
           <span className="">DataTable custom</span>
         </Link>
         <Link href="/dashboard/student" className="flex h-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 ">
           <ShoppingCart className="h-5 w-5 mx-2" />
           <span className="">Dashboard 2 </span>
         </Link>
       </nav>
     </sidebar>
      </>
    );
  }
  