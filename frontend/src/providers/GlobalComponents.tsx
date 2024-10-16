import { Spinner } from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "./store";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { appActions } from "@/slices/appSlice";

export const GlobalComponents = () => {
  const loadingCount = useAppSelector((state) => state.app.loadingCount);
  const toastData = useAppSelector((state) => state.app.toast);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toastData) {
      toast({
        title: toastData.title,
        description: toastData.description,
        variant: toastData.variant,
        action: toastData.action,
      });
      dispatch(appActions.setToast(undefined));
    }
  }, [toastData]);

  return (
    <>
      {!!loadingCount && <Spinner />}
      <Toaster />
    </>
  );
};
