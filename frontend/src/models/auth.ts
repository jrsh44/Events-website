import { EUserRole } from "./user";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IResetPasswordRequest {
  email: string;
}

export interface IForgotPassword {
  password: string;
}

export const roleAuth = {
  archivedRead: [EUserRole.Admin, EUserRole.Manager, EUserRole.User, EUserRole.None],
  eventRead: [EUserRole.Admin, EUserRole.Manager, EUserRole.User],
  eventModify: [EUserRole.Admin, EUserRole.Manager],
  userModify: [EUserRole.Admin],
};
