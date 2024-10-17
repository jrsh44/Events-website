import { store } from "../providers/store";
import { appActions } from "../slices/appSlice";

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
              title: "Brak autoryzacji",
              description: "Zaloguj się, aby kontynuować",
              variant: "destructive",
            }),
          );
          window.location.href = "/login";
        }
      }

      const response = await fetch(`${apiUrl}${request.url}`, {
        method: request.method,
        body: request.body,
        headers,
      });

      console.log(response);

      const responseClone = response.clone();

      const data = await response.json();

      if (!response.ok) {
        if (data.errorCode === "ES-02") {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
            return this.request(request);
          } else {
            store.dispatch(
              appActions.setToast({
                title: "Brak autoryzacji",
                description: "Twój token wygasł, zaloguj się ponownie",
                variant: "destructive",
              }),
            );
            window.location.href = "/login";
          }
        } else if (data.errorCode && data.errorMessage)
          store.dispatch(
            appActions.setToast({
              title: data.errorCode,
              description: data.errorMessage,
              variant: "destructive",
            }),
          );
      }

      return responseClone;
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
