import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { EUserRole } from "@/models/user";
import { t } from "@/providers/intl";
import { useAppSelector } from "@/providers/store";
import { PageNotFound } from "../NotFound/PageNotFound";

export const PageProfile = () => {
  const { firstName, lastName, email, role } = useAppSelector((state) => state.app.user);

  return role !== EUserRole.None ? (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{t("profile.title")}</h1>
      <Separator />
      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400">
              {t("profile.firstName")}
            </label>
            <Input name="firstName" value={firstName} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400">
              {t("profile.lastName")}
            </label>
            <Input name="lastName" value={lastName} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400">
              {t("profile.email")}
            </label>
            <Input name="email" value={email} readOnly />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};
