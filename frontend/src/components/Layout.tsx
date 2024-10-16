import { Outlet } from "react-router-dom";
import { NavSidebar } from "./NavSidebar";

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
    <div className=" relative flex flex-col max-w-full h-full flex-1 p-10 gap-10 overflow-y-auto">
      <Outlet />
    </div>
  </div>
);
