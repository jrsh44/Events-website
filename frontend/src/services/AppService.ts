import { IForgotPassword, ILogin, IRegister, IResetPassword } from "@/models/auth";
import { ApiService } from "./ApiService";

export class AppService extends ApiService {
  public postLogin = (body: ILogin) => this.post("/login", JSON.stringify(body));
  public postRegister = (body: IRegister) => this.post("/register", JSON.stringify(body));
  public postForgotPassword = (body: IForgotPassword) =>
    this.post("/forgot-password", JSON.stringify(body));
  public postResetPassword = (body: IResetPassword) =>
    this.post("/reset-password", JSON.stringify(body));
}
