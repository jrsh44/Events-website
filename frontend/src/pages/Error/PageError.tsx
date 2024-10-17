import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { EPath } from "@/providers/router";
import { t } from "@/providers/intl";

export const PageError = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(EPath.Home);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{t("error.title")}</h1>
      <p className="text-lg mb-8">{t("error.description")}</p>
      <Button onClick={handleGoHome}>{t("error.goHome")}</Button>
    </div>
  );
};
