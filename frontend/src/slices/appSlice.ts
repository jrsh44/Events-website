import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEventDto, IUserDto } from "../models/dto";
import { ToastActionElement, ToastProps } from "@/components/ui/toast";

interface IAppSlice {
  loadingCount: number;
  user: IUserDto;
  events: IEventDto[];
  eventsArchived: IEventDto[];
  users: IUserDto[];
  toast?: {
    title?: string;
    description: string;
    variant?: ToastProps["variant"];
    action?: ToastActionElement;
  };
}

const initialState: IAppSlice = {
  loadingCount: 0,
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  events: [],
  eventsArchived: [],
  users: [],
};

const appThunks = {
  getEvents: createAsyncThunk("app/getEvents", async (_, thunkApi) => {
    // const response = await Services.App.getEvents();
    // if (!response.ok) throw new Error("Fetch failed");
    // return await response.json();
    thunkApi.dispatch(appSlice.actions.setEvents([]));
  }),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    incrementLoadingCount: (state) => {
      state.loadingCount += 1;
    },
    decrementLoadingCount: (state) => {
      state.loadingCount -= 1;
    },
    setUser: (state, action: PayloadAction<IUserDto>) => {
      state.user = action.payload;
    },
    setEvents: (state, action: PayloadAction<IEventDto[]>) => {
      state.events = action.payload;
    },
    setEventsArchived: (state, action: PayloadAction<IEventDto[]>) => {
      state.eventsArchived = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUserDto[]>) => {
      state.users = action.payload;
    },
    setToast: (state, action: PayloadAction<IAppSlice["toast"]>) => {
      state.toast = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const appActions = { ...appSlice.actions, ...appThunks };
