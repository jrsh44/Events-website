import { EUserRole, IUserCredentials, IUserValidate } from "@/models/user";
import { t } from "@/providers/intl";
import { TypoValidation } from "../../components/Typo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";

const dialogType = {
  add: {
    title: "user.dialog.addUser",
    description: "user.dialog.addUserDescription",
    submit: "user.dialog.addUserSubmit",
  },
  edit: {
    title: "user.dialog.editUser",
    description: "user.dialog.editUserDescription",
    submit: "user.dialog.editUserSubmit",
  },
};

interface IUserDialogProps {
  children: React.ReactNode;
  user: IUserCredentials | null;
  setUser: React.Dispatch<React.SetStateAction<IUserCredentials | null>>;
  error: IUserValidate;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  type: "add" | "edit";
  handleDelete?: (id: number) => void;
}

export const UserDialog = (props: IUserDialogProps) => (
  <Dialog>
    {props.children}
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{t(dialogType[props.type].title)}</DialogTitle>
        <DialogDescription>{t(dialogType[props.type].description)}</DialogDescription>
      </DialogHeader>
      <form onSubmit={props.handleSubmit}>
        <div className="grid w-full items-center gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="firstName">{t("user.dialog.firstNameLabel")}</Label>
            <Input
              id="firstName"
              value={props.user?.firstName || ""}
              className="col-span-3"
              onChange={(e) =>
                props.setUser((prev) =>
                  prev
                    ? { ...prev, firstName: e.target.value }
                    : {
                        firstName: e.target.value,
                        lastName: "",
                        email: "",
                        role: EUserRole.User,
                      },
                )
              }
            />
            <TypoValidation>{props.error.firstName}</TypoValidation>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="lastName">{t("user.dialog.lastNameLabel")}</Label>
            <Input
              id="lastName"
              value={props.user?.lastName || ""}
              className="col-span-3"
              onChange={(e) =>
                props.setUser((prev) =>
                  prev
                    ? { ...prev, lastName: e.target.value }
                    : {
                        firstName: "",
                        lastName: e.target.value,
                        email: "",
                        role: EUserRole.User,
                      },
                )
              }
            />
            <TypoValidation>{props.error.lastName}</TypoValidation>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">{t("user.dialog.emailLabel")}</Label>
            <Input
              id="email"
              value={props.user?.email || ""}
              className="col-span-3"
              onChange={(e) =>
                props.setUser((prev) =>
                  prev
                    ? { ...prev, email: e.target.value }
                    : {
                        firstName: "",
                        lastName: "",
                        email: e.target.value,
                        role: EUserRole.User,
                      },
                )
              }
            />
            <TypoValidation>{props.error.email}</TypoValidation>
          </div>
          {props.type === "add" && (
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">{t("user.dialog.password")}</Label>
              <Input
                id="password"
                value={(props.user && props.user.password) || ""}
                className="col-span-3"
                onChange={(e) =>
                  props.setUser((prev) =>
                    prev
                      ? { ...prev, password: e.target.value }
                      : {
                          firstName: "",
                          lastName: "",
                          email: "",
                          role: EUserRole.User,
                          password: e.target.value,
                        },
                  )
                }
              />
              <TypoValidation>{props.error.password}</TypoValidation>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <Label htmlFor="role">{t("user.dialog.roleLabel")}</Label>
            <Select
              name="role"
              value={props.user?.role || EUserRole.User}
              onValueChange={(value) =>
                props.setUser((prev) =>
                  prev
                    ? { ...prev, role: value as EUserRole }
                    : {
                        firstName: "",
                        lastName: "",
                        email: "",
                        role: value as EUserRole,
                      },
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("user.dialog.selectRole")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EUserRole.Admin}>{t("user.dialog.admin")}</SelectItem>
                <SelectItem value={EUserRole.Manager}>{t("user.dialog.manager")}</SelectItem>
                <SelectItem value={EUserRole.User}>{t("user.dialog.user")}</SelectItem>
              </SelectContent>
            </Select>
            <TypoValidation>{props.error.role}</TypoValidation>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          {props.type === "edit" && props.user && props.user.id && (
            <Button
              type="button"
              variant="destructive"
              className="mr-auto"
              onClick={() => props.user && props.user.id && props.handleDelete?.(props.user.id)}
            >
              {t("user.dialog.delete")}
            </Button>
          )}
          <Button type="submit">{t(dialogType[props.type].submit)}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
);
