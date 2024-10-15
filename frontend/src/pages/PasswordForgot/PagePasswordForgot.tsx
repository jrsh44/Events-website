import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/providers/intl";

export const PagePasswordForgot = () => {
  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("passwordForgot.title")}</CardTitle>
        <CardDescription>{t("passwordForgot.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t("passwordForgot.email")}</Label>
              <Input id="email" />
            </div>
          </div>
        </form>
        <Button className="mt-10 w-full">{t("passwordForgot.submit")}</Button>
      </CardContent>
    </Card>
  );
};
