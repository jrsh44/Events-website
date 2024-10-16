import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout } from "../components/Layout";
import { PageArchivedEvents } from "../pages/ArchivedEvents/PageArchivedEvents";
import { PageError } from "../pages/Error/PageError";
import { PageEvents } from "../pages/Events/PageEvents";
import { PageHome } from "../pages/Home/PageHome";
import { PageLogin } from "../pages/Login/PageLogin";
import { PagePasswordForgot } from "../pages/PasswordForgot/PagePasswordForgot";
import { PagePasswordReset } from "../pages/PasswordReset/PagePasswordReset";
import { PageProfile } from "../pages/Profile/PageProfile";
import { PageRegister } from "../pages/Register/PageRegister";
import { PageUsers } from "../pages/Users/PageUsers";
import { PageNotFound } from "@/pages/NotFound/PageNotFound";

export enum EPath {
  ArchivedEvents = "/archived-events",
  Error = "/error",
  Events = "/events",
  Home = "/",
  Login = "/login",
  PasswordForgot = "/password-forgot",
  PasswordReset = "/password-reset",
  Register = "/register",
  Profile = "/profile",
  Users = "/users",
  NotFound = "*",
}

const routes = [
  {
    element: <AuthLayout />,
    children: [
      {
        element: <PageLogin />,
        path: EPath.Login,
      },
      {
        element: <PageRegister />,
        path: EPath.Register,
      },
      {
        element: <PagePasswordForgot />,
        path: EPath.PasswordForgot,
      },
      {
        element: <PagePasswordReset />,
        path: EPath.PasswordReset,
      },
      {
        element: <PageError />,
        path: `${EPath.Error}/:code`,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        element: <PageProfile />,
        path: EPath.Profile,
      },
      {
        element: <PageEvents />,
        path: EPath.Events,
      },
      {
        element: <PageHome />,
        path: EPath.Home,
      },
      {
        element: <PageArchivedEvents />,
        path: EPath.ArchivedEvents,
      },
      {
        element: <PageUsers />,
        path: EPath.Users,
      },
      {
        element: <PageNotFound />,
        path: EPath.NotFound, 
      }
    ],
  },
];

export const router = createBrowserRouter(routes);
