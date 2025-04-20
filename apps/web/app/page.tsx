import { Button } from "@m-nav/ui/components/button"
import NavHeader from "@/components/nav-header"

export default function Page() {
  return (
    <div className="container relative mx-auto min-h-screen w-full px-0">
      <div className="flex">
        <div className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block">
        </div>
        <div className="sm:pl-[16rem]">
          <NavHeader />
        </div>
      </div>
    </div>
  )
}
