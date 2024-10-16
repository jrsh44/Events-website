import { Outlet } from "react-router-dom";
import { NavSidebar } from "./NavSidebar";
import { ScrollArea } from "./ui/scroll-area";

export const AuthLayout = () => (
  <div className="flex h-screen flex-col">
    <div className="flex flex-col w-full h-full overflow-y-auto items-center justify-center ">
      <Outlet />
    </div>
  </div>
);

export const MainLayout = () => (
  <div className="relative flex h-[100vh] w-full">
    <NavSidebar />
    <ScrollArea className=" relative flex flex-col max-w-full h-full flex-1 overflow-y-auto">
      <Outlet />
    </ScrollArea>
  </div>
);
