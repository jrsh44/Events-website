import { configureStore, isRejected, Middleware } from "@reduxjs/toolkit";
import { appReducer } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";

const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejected(action)) console.error(action.error.stack || action.error.message);
  return next(action);
};

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorLogger),
});

type TStore = ReturnType<typeof store.getState>;
type TDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<TStore>();
export const useAppDispatch = useDispatch.withTypes<TDispatch>();
