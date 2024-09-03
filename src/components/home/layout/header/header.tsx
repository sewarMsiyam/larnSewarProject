import Logo from "@/components/home/layout/header/logo"
import Navbar from "@/components/home/layout/header/itemnav"
import EndNav from "@/components/home/layout/header/endnav"
import MobNav from "@/components/home/layout/header/resMobNav"



export default function Header() {

  return (
    <>
          <header className="d-flex w-full py-4">
            <div className="container">
              <div className="flex justify-between items-center">
                <Logo />
                <div className="md:hidden">
                  <MobNav />
                </div>
                <div className="hidden md:flex justify-between items-center w-full ">
                  <div></div>
                  <Navbar />
                  <EndNav />  
                </div>
              </div>
            </div>
          </header>
    </>
  )
}
