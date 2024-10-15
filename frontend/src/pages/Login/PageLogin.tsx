import { TypoBody } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { t } from "@/providers/intl";
import { EPath } from "@/providers/router";
import { useNavigate } from "react-router-dom";

export const PageLogin = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("login.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input id="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input id="password" type="password" />
            </div>
          </div>
        </form>
        <Button className="mt-10 w-full">{t("login.submit")}</Button>
        <Separator className="mt-6 mb-6" />
        <div className="flex items-center justify-center">
          <TypoBody>{t("login.noAccount")}</TypoBody>
          <Button variant="link" onClick={() => navigate(EPath.Register)}>
            {t("login.register")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
