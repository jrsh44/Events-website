import { store } from "../providers/store";
import { appActions } from "../slices/appSlice";

interface IRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
}

const apiUrl = `${import.meta.env.VITE_APP_BE_URL}`;

export class ApiService {
  protected get = async (url: string) => this.request({ url, method: "GET" });

  protected post = async (url: string, body: BodyInit) =>
    this.request({ url, method: "POST", body });

  protected put = async (url: string, body: BodyInit) => this.request({ url, method: "PUT", body });

  protected delete = async (url: string) => this.request({ url, method: "DELETE" });

  private request = async (request: IRequest) => {
    store.dispatch(appActions.incrementLoadingCount());

    try {
      const headers = new Headers({
        "Content-Type": "application/json",
      });

      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(`${apiUrl}${request.url}`, {
        method: request.method,
        body: request.body,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errorCode && data.errorMessage)
          store.dispatch(
            appActions.setToast({
              title: data.errorCode,
              description: data.errorMessage,
              variant: "destructive",
            }),
          );
      }

      return data;
    } catch (error) {
      const responseError = error as Response;
      let parsedError = null;

      try {
        parsedError = await responseError.json().catch();
      } finally {
        window.location.href = `/error/${parsedError?.statusCode || responseError.status}`;
      }
    } finally {
      setTimeout(() => {
        store.dispatch(appActions.decrementLoadingCount());
      }, 50);
    }
  };
}
