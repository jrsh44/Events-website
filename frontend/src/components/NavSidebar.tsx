import { t } from "@/providers/intl";
import { EPath } from "@/providers/router";
import { HomeIcon, TicketsIcon, UserIcon, UsersIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoSvg from "@/assets/logo.svg";
import { TypoH4 } from "./Typo";
import { Separator } from "./ui/separator";
import { ButtonLink } from "./ButtonLink";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/providers/store";
import { EUserRole } from "@/models/user";
import { appActions } from "@/slices/appSlice";

export const NavSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const { firstName, role } = useAppSelector((state) => state.app.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathBegin = "/" + pathname.split("/")[1];
  const dispatch = useAppDispatch();

  const navLinks: { titleTrKey: string; to: EPath; Icon: ReactNode; authorities: EUserRole[] }[] = [
    {
      titleTrKey: "nav.home",
      to: EPath.Home,
      Icon: <HomeIcon />,
      authorities: [EUserRole.None, EUserRole.User, EUserRole.Manager, EUserRole.Admin],
    },
    {
      titleTrKey: "nav.events",
      to: EPath.Events,
      Icon: <TicketsIcon />,
      authorities: [EUserRole.User, EUserRole.Manager, EUserRole.Admin],
    },
    {
      titleTrKey: "nav.profile",
      to: EPath.Profile,
      Icon: <UserIcon />,
      authorities: [EUserRole.User, EUserRole.Manager, EUserRole.Admin],
    },
    {
      titleTrKey: "nav.users",
      to: EPath.Users,
      Icon: <UsersIcon />,
      authorities: [EUserRole.Manager, EUserRole.Admin],
    },
  ];

  const handleSidebarHide = () => {
    if (isSidebarVisible) {
      setIsSidebarVisible(false);
      const timeoutId = setTimeout(() => setIsSidebarHidden(true), 300);
      return () => clearTimeout(timeoutId);
    } else {
      setIsSidebarVisible(true);
      setIsSidebarHidden(false);
    }
  };

  return (
    <div className="absolute top-0 bottom-0 z-10 flex sm:relative bg-background ">
      <nav
        className={`flex flex-col gap-10 items-center p-10 w-full flex-1 sm:w-[300px] border-r border-neutral-600 transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarHidden ? "hidden" : ""}`}
      >
        <img src={logoSvg} alt="Logo" className="h-18" />
        <Separator />
        <div className="flex flex-col w-full gap-2">
          {navLinks.map((navlink) => {
            if (!navlink.authorities.includes(role)) return null;
            return (
              <button
                key={navlink.titleTrKey}
                onClick={() => navigate(navlink.to)}
                className={`flex items-center p-3 text-neutral-300 rounded text-lg leading-6 tracking-wide transition-none select-none hover:bg-neutral-800 cursor-pointer ${
                  pathBegin === navlink.to
                    ? "font-semibold bg-neutral-900 text-neutral-100"
                    : "font-normal"
                }`}
              >
                <div className="mr-3 transition-none">{navlink.Icon}</div>
                {t(navlink.titleTrKey)}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 mt-auto items-center">
          <UserIcon
            size={48}
            className="p-2 rounded border border-primary-light bg-primary-weak text-primary text-neutral-300"
          />
          {firstName ? (
            <div>
              <TypoH4 className="font-normal text-neutral-300">
                {t("nav.footer.welcome")} {firstName}
              </TypoH4>
              <ButtonLink onClick={() => dispatch(appActions.logout())}>
                {t("nav.footer.logout")}
              </ButtonLink>
            </div>
          ) : (
            <div>
              <TypoH4 className="font-normal text-neutral-300">{t("nav.footer.welcome")}</TypoH4>
              <ButtonLink onClick={() => navigate(EPath.Login)}>{t("nav.footer.login")}</ButtonLink>
            </div>
          )}
        </div>
      </nav>
      <button
        onClick={handleSidebarHide}
        className={`absolute z-10 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-neutral-800 text-neutral-300 p-2 rounded-full shadow-lg shadow-neutral-950 transition-all duration-300 ${
          isSidebarVisible ? "left-[90%] sm:left-[300px]" : "left-2"
        }`}
      >
        {isSidebarVisible ? <ChevronLeftIcon size={24} /> : <ChevronRightIcon size={24} />}
      </button>
    </div>
  );
};
