import { IForgotPassword, ILogin, IRegister, IResetPasswordRequest } from "@/models/auth";
import { ApiService } from "./ApiService";
import { IEvent, IEventFilter } from "@/models/event";
import { IUser, IUserCredentials, IUserFilter } from "@/models/user";

export class AppService extends ApiService {
  // Unauthenticated
  public login = (body: ILogin) => this.post("/login", JSON.stringify(body), true);
  public register = (body: IRegister) => this.post("/register", JSON.stringify(body), true);
  public resetPasswordRequest = (body: IResetPasswordRequest) =>
    this.post("/password/reset-request", JSON.stringify(body), true);
  public updatePassword = (token: string, body: IForgotPassword) =>
    this.post(`/password/update?token=${token}`, JSON.stringify(body), true);
  public checkResetToken = (token: string) =>
    this.get(`/password/check-token?token=${token}`, undefined, true);

  public searchArchivedEvents = (body: IEventFilter) =>
    this.post("/event/archived-search", JSON.stringify(body), true);

  // Authenticated
  public getCurrentUser = () => this.get("/user");
  public searchEvents = (body: IEventFilter) => this.post("/event/search", JSON.stringify(body));
  public updateEvent = (id: string, body: IEvent) => this.put(`/event/${id}`, JSON.stringify(body));
  public createEvent = (body: IEvent) => this.post("/event", JSON.stringify(body));
  public deleteEvent = (id: string) => this.delete(`/event/${id}`);

  public searchUsers = (body: IUserFilter) => this.post("/user/search", JSON.stringify(body));
  public updateUser = (id: string, body: IUser) => this.put(`/user/${id}`, JSON.stringify(body));
  public createUser = (body: IUserCredentials) => this.post("/user", JSON.stringify(body));
  public deleteUser = (id: string) => this.delete(`/user/${id}`);
}
