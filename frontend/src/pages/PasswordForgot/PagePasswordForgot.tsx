import { TypoValidation } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IResetPasswordRequest } from "@/models/auth";
import { t } from "@/providers/intl";
import { EPath } from "@/providers/router";
import { useAppDispatch } from "@/providers/store";
import { Services } from "@/services/Services";
import { appActions } from "@/slices/appSlice";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PagePasswordForgot = () => {
  const [resetRequest, setResetRequest] = useState<IResetPasswordRequest>({ email: "" });
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateMail = () => {
    if (!resetRequest.email) {
      setError(t("validation.required"));
      return false;
    }
    setError("");
    return true;
  };

  const handlePasswordForgot = async (e: FormEvent) => {
    e.preventDefault();
    if (validateMail()) {
      const response = await Services.App.resetPasswordRequest(resetRequest);
      if (response) {
        if (response.ok) {
          dispatch(
            appActions.setToast({
              description: "Na podany adres email został wysłany link umożliwiający reset hasła",
            }),
          );
          navigate(EPath.Login);
        } else {
          if (response.headers.get("content-type")?.includes("application/json")) {
            const data = await response.json();
            if (data.validationErrors) {
              setError(data.validationErrors.email);
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
        <CardTitle>{t("passwordForgot.title")}</CardTitle>
        <CardDescription>{t("passwordForgot.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordForgot}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t("passwordForgot.email")}</Label>
              <Input
                id="email"
                value={resetRequest.email}
                onChange={(e) => setResetRequest({ email: e.target.value })}
              />
              <TypoValidation>{error}</TypoValidation>
            </div>
          </div>
          <Button className="mt-10 w-full" type="submit">
            {t("passwordForgot.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
