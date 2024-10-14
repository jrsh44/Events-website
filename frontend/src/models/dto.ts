export interface IUserDto {
  firstName: string;
  lastName: string;
  email: string;
}

export enum EEventType {
  WORKSHOP = "WORKSHOP",
  CONCERT = "CONCERT",
  STANDUP = "STAND_UP",
  OTHER = "OTHER",
}

export interface IEventDto {
  title: string;
  description: string;
  date: Date;
  type: EEventType;
}
