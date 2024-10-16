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
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const PageRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!firstName) newErrors.firstName = t("register.errors.firstName");
    if (!lastName) newErrors.lastName = t("register.errors.lastName");
    if (!email) newErrors.email = t("register.errors.email");
    if (!password) newErrors.password = t("register.errors.password");
    if (password !== confirmPassword)
      newErrors.confirmPassword = t("register.errors.confirmPassword");

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const data = await Services.App.postRegister({ firstName, lastName, email, password });

      if (data) {
        if (!data.errorCode) {
          localStorage.setItem("token", data.token);
          navigate(EPath.Home);
          dispatch(
            appActions.setToast({ title: "Sukces", description: "Pomyślnie zarejestrowano" }),
          );
        } else {
          setErrors({
            firstName: data.validationErrors.firstName,
            lastName: data.validationErrors.lastName,
            email: data.validationErrors.email,
            password: data.validationErrors.password,
            confirmPassword: data.validationErrors.confirmPassword,
          });
        }
      }
    }
  };

  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("register.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="firstName">{t("register.firstName")}</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TypoValidation>{errors.firstName}</TypoValidation>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="lastName">{t("register.lastName")}</Label>
              <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <TypoValidation>{errors.lastName}</TypoValidation>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">{t("register.email")}</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TypoValidation>{errors.email}</TypoValidation>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">{t("register.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TypoValidation>{errors.password}</TypoValidation>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="confirmPassword">{t("register.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <TypoValidation>{errors.confirmPassword}</TypoValidation>
            </div>
          </div>
          <Button className="mt-10 w-full" type="submit">
            {t("register.submit")}
          </Button>
        </form>
        <Separator className="mt-6 mb-6" />
        <div className="flex items-center justify-center gap-2">
          <TypoBody>{t("register.alreadyHaveAccount")}</TypoBody>
          <ButtonLink onClick={() => navigate(EPath.Login)}>{t("register.login")}</ButtonLink>
        </div>
      </CardContent>
    </Card>
  );
};
