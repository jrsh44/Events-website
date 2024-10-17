export enum EEventType {
  Workshop = "WORKSHOP",
  Conference = "CONFERENCE",
  Interview = "INTERVIEW",
  Other = "OTHER",
}

export interface IEventValidate {
  title: string;
  description: string;
  date: string;
  type: string;
}

export interface IEventFilter {
  page: number;
  take: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  title?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: EEventType;
}

export interface IEvent {
  id?: number;
  title: string;
  description: string;
  date?: string;
  type: EEventType;
}

export interface IFilteredEvents {
  records: IEvent[];
  total: number;
}
