export enum EUserRole {
  Admin = "ADMIN",
  Manager = "MANAGER",
  None = "NONE",
  User = "USER",
}

export interface IUserValidate {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
}

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
}

export interface IUserCredentials extends IUser {
  password?: string;
}

export interface IUserFilter {
  page: number;
  take: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: EUserRole;
}

export interface IFilteredUsers {
  records: IUser[];
  total: number;
}
