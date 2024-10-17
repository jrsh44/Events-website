export enum EUserRole {
  Admin = "ADMIN",
  Manager = "MANAGER",
  None = "NONE",
  User = "USER",
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
}
