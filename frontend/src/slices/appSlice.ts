import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppToastProps } from "@/components/ui/toast";
import { EUserRole, IUser } from "@/models/user";
import { EPath } from "@/providers/router";

interface IAppSlice {
  loadingCount: number;
  user: IUser;
  toast?: IAppToastProps;
}

const initialUser: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  role: EUserRole.None,
};

const initialState: IAppSlice = {
  loadingCount: 0,
  user: initialUser,
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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      window.location.href = EPath.Home;
      state.user = initialUser;
      localStorage.removeItem("token");
    },
    setToast: (state, action: PayloadAction<IAppToastProps | undefined>) => {
      state.toast = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const appActions = { ...appSlice.actions };
