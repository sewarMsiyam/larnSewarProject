import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/navResponsev"
import Navbar from "@/components/home/layout/header/itemNav"
import EndNav from "@/components/home/layout/header/endnav"
import { Session } from 'next-auth';

interface HeaderAuthProps {
  session: Session | null;
}

const MobNav: React.FC<HeaderAuthProps> = ({ session }) => {

  return (
    <Sheet>
      <SheetTrigger>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 stroke-2 stroke-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <br />
          <SheetTitle>
          </SheetTitle>
          <SheetDescription>
            <Navbar />
            <EndNav />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
export default MobNav;
