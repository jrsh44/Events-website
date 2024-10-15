import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/providers/intl";

export const PagePasswordReset = () => {
  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("passwordReset.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">{t("passwordReset.password")}</Label>
              <Input id="password" type="password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">{t("passwordReset.confirmPassword")}</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
        </form>
        <Button className="mt-10 w-full">{t("passwordReset.submit")}</Button>
      </CardContent>
    </Card>
  );
};
