import { EPath } from "@/providers/router";
import { store } from "../providers/store";
import { appActions } from "../slices/appSlice";
import { t } from "@/providers/intl";

interface IRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
  noAuth?: boolean;
}

const apiUrl = `${import.meta.env.VITE_APP_BE_URL}`;

export class ApiService {
  protected get = async (url: string, body?: BodyInit, noAuth?: boolean) =>
    this.request({ url, method: "GET", body, noAuth: noAuth });

  protected post = async (url: string, body: BodyInit, noAuth?: boolean) =>
    this.request({ url, method: "POST", body, noAuth: noAuth });

  protected put = async (url: string, body: BodyInit) => this.request({ url, method: "PUT", body });

  protected delete = async (url: string) => this.request({ url, method: "DELETE" });

  private request = async (request: IRequest): Promise<Response | undefined> => {
    store.dispatch(appActions.incrementLoadingCount());

    try {
      const headers = new Headers({
        "Content-Type": "application/json",
      });

      if (!request.noAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          headers.append("Authorization", `Bearer ${token}`);
        } else {
          store.dispatch(
            appActions.setToast({
              title: t("toast.title.noAuth"),
              description: t("toast.description.auth.login"),
              variant: "destructive",
            }),
          );
          window.location.href = EPath.Login;
          return undefined;
        }
      }

      const response = await fetch(`${apiUrl}${request.url}`, {
        method: request.method,
        body: request.body,
        headers,
      });

      const responseClone = response.clone();

      if (!response.ok) {
        if (response.headers.get("Content-Type")?.startsWith("application/json")) {
          const data = await response.json();
          if (data.code && data.message)
            if (data.code.startsWith("TOKEN")) {
              localStorage.removeItem("token");
            }
          store.dispatch(
            appActions.setToast({
              title: data.code,
              description: data.message,
              variant: "destructive",
            }),
          );
        } else {
          throw response;
        }
      }

      return responseClone;
    } catch (error) {
      const responseError = error as Response;
      let parsedError = null;

      try {
        parsedError = await responseError.json().catch();
      } finally {
        window.location.href = `${EPath.Error}/${parsedError?.statusCode || responseError.status}`;
      }
    } finally {
      setTimeout(() => {
        store.dispatch(appActions.decrementLoadingCount());
      }, 50);
    }
  };
}
