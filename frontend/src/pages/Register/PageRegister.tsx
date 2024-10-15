import { TypoBody } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { t } from "@/providers/intl";
import { EPath } from "@/providers/router";
import { useNavigate } from "react-router-dom";

export const PageRegister = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("register.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">{t("register.firstName")}</Label>
              <Input id="firstName" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">{t("register.lastName")}</Label>
              <Input id="lastName" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t("register.email")}</Label>
              <Input id="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">{t("register.password")}</Label>
              <Input id="password" type="password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">{t("register.confirmPassword")}</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
        </form>
        <Button className="mt-10 w-full">{t("register.submit")}</Button>
        <Separator className="mt-6 mb-6" />
        <div className="flex items-center justify-center">
          <TypoBody>{t("register.alreadyHaveAccount")}</TypoBody>
          <Button variant="link" onClick={() => navigate(EPath.Login)}>
            {t("register.login")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
