import { Outlet } from "react-router-dom";
import { NavSidebar } from "./NavSidebar";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect } from "react";
import { Services } from "@/services/Services";
import { useAppDispatch } from "@/providers/store";
import { appActions } from "@/slices/appSlice";

export const AuthLayout = () => (
  <div className="flex h-screen flex-col">
    <div className="flex flex-col w-full h-full overflow-y-auto items-center justify-center ">
      <Outlet />
    </div>
  </div>
);

export const MainLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserData = async () => {
      if (localStorage.getItem("token")) {
        const response = await Services.App.getCurrentUser();

        if (response) {
          const data = await response.json();
          if (response.ok) {
            dispatch(appActions.setUser(data));
          } else {
            dispatch(appActions.logout());
          }
        }
      }
    };
    getUserData();
  }, []);

  return (
    <div className="relative flex h-[100vh] w-full">
      <NavSidebar />
      <ScrollArea className=" relative flex flex-col max-w-full h-full flex-1 overflow-y-auto">
        <Outlet />
      </ScrollArea>
    </div>
  );
};
