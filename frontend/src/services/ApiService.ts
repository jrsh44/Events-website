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
      const response = await fetch(`${apiUrl}${request.url}`, {
        method: request.method,
        body: request.body,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      });

      if (!response.ok) throw new Error("Fetch failed");
      if (response.headers.get("Content-Type")?.includes("application/json"))
        return await response.json();
      return response;
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
