import { TypoBody } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { t } from "@/providers/intl";
import { EPath } from "@/providers/router";
import { Services } from "@/services/Services";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PageLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const response = await Services.App.postLogin({ email, password });
    
    if(response) {
      const data = await response.json();
      if(response.ok) {
        localStorage.setItem("token", data.token);
        navigate(EPath.Home);
      } else {
        setError(data.errorMessage);
      }
    }

  }

  return (
    <Card className="flex flex-col w-full border-0 sm:border-[1px] sm:w-[450px] sm:flex sm:flex-col">
      <CardHeader>
        <CardTitle>{t("login.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        <Button className="mt-10 w-full" type="submit">{t("login.submit")}</Button>
        </form>
        {error && <TypoBody className="text-red-500">{error}</TypoBody>}
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
