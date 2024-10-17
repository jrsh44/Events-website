import { ButtonLink } from "@/components/ButtonLink";
import { TypoBody, TypoValidation } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { t } from "@/providers/intl";
import { EPath } from "@/providers/router";
import { useAppDispatch } from "@/providers/store";
import { Services } from "@/services/Services";
import { appActions } from "@/slices/appSlice";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PageLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) newErrors.email = t("login.errors.email");
    if (!password) newErrors.password = t("login.errors.password");

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await Services.App.login({ email, password });

      if (response) {
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          navigate(EPath.Home);
          dispatch(appActions.setToast({ title: "Sukces", description: "Pomyślnie zalogowano" }));
          dispatch(
            appActions.setUser({
              firstName: data.firstName,
              role: data.role,
              email: data.email,
              lastName: data.lastName,
            }),
          );
        }
      }
    }
  };

  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("login.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TypoValidation>{errors.email}</TypoValidation>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between">
                <TypoValidation>{errors.password}</TypoValidation>
                <ButtonLink
                  className="text-sm text-left w-fit"
                  onClick={() => navigate(EPath.PasswordForgot)}
                >
                  {t("login.forgotPassword")}
                </ButtonLink>
              </div>
            </div>
          </div>
          <Button className="mt-10 w-full" type="submit">
            {t("login.submit")}
          </Button>
        </form>
        <Separator className="mt-6 mb-6" />
        <div className="flex items-center justify-center gap-2">
          <TypoBody>{t("login.noAccount")}</TypoBody>
          <ButtonLink onClick={() => navigate(EPath.Register)}>{t("login.register")}</ButtonLink>
        </div>
      </CardContent>
    </Card>
  );
};
