import { TypoValidation } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/providers/intl";
import { EPath } from "@/providers/router";
import { useAppDispatch } from "@/providers/store";
import { Services } from "@/services/Services";
import { appActions } from "@/slices/appSlice";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const PagePasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      if (!token) return;
      const response = await Services.App.checkResetToken(token);
      if (response) {
        if (!response.ok) {
          navigate(EPath.Login);
        }
      }
    };

    checkToken();
  }, [token]);

  const validatePassword = () => {
    if (!password) setError(t("validation.required"));
    else if (password !== passwordConfirm) setError(t("validation.samePassword"));

    return password && password === passwordConfirm;
  };

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    if (validatePassword() && token) {
      const response = await Services.App.updatePassword(token, { password });
      if (response) {
        if (response.ok) {
          dispatch(
            appActions.setToast({
              title: t("toast.title.success"),
              description: t("toast.description.passwordForgot.update"),
            }),
          );
          navigate(EPath.Login);
        } else {
          if (response.headers.get("content-type")?.includes("application/json")) {
            const data = await response.json();
            if (data.validationErrors) {
              setError(data.validationErrors.password);
            } else {
              setError(data.errorMessage);
            }
          }
        }
      }
    }
  };

  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("passwordReset.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordReset}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">{t("passwordReset.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TypoValidation>{error}</TypoValidation>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">{t("passwordReset.confirmPassword")}</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-10 w-full" type="submit">
            {t("passwordReset.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
