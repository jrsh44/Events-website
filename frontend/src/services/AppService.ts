import { IForgotPassword, ILogin, IRegister, IResetPassword } from "@/models/auth";
import { ApiService } from "./ApiService";
import { IEventFilter } from "@/models/event";

export class AppService extends ApiService {
  public login = (body: ILogin) => this.post("/login", JSON.stringify(body), true);
  public register = (body: IRegister) => this.post("/register", JSON.stringify(body), true);
  public forgotPassword = (body: IForgotPassword) =>
    this.post("/forgot-password", JSON.stringify(body), true);
  public resetPassword = (body: IResetPassword) =>
    this.post("/reset-password", JSON.stringify(body), true);

  public searchArchivedEvents = (body: IEventFilter) =>
    this.post("/event/archived-search", JSON.stringify(body), true);
  public searchEvents = (body: IEventFilter) => this.post("/event/search", JSON.stringify(body));
}
