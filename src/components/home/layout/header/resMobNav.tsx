import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/navResponsev"
import Logo from "@/components/home/layout/header/logo"
// import Navbar from "@/components/home/layout/header/itemnav"
import EndNav from "@/components/home/layout/header/endnav"

export default function MobNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <br />
          <SheetTitle><Logo /></SheetTitle>
          <SheetDescription>
            {/* <Navbar /> */}
            <EndNav />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}