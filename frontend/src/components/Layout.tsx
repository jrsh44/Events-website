import { Outlet } from "react-router-dom";

export const AuthLayout = () => (
  <div className="flex h-screen flex-col">
    <div className="flex flex-col w-full h-full overflow-y-auto items-center justify-center ">
      <Outlet />
    </div>
  </div>
);

export const MainLayout = () => (
  <div className="flex flex-col w-full h-full p-10 gap-10 overflow-y-auto">
    <Outlet />
  </div>
);
