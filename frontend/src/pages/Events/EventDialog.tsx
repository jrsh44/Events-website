import { EEventType, IEvent, IEventValidate } from "@/models/event";
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
import { DatePicker } from "@/components/DatePicker";
import { formatDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const dialogType = {
  add: {
    title: "event.dialog.addEvent",
    description: "event.dialog.addEventDescription",
    submit: "event.dialog.addEventSubmit",
  },
  edit: {
    title: "event.dialog.editEvent",
    description: "event.dialog.editEventDescription",
    submit: "event.dialog.editEventSubmit",
  },
};

interface IEventDialogProps {
  children: React.ReactNode;
  event: IEvent | null;
  setEvent: React.Dispatch<React.SetStateAction<IEvent | null>>;
  error: IEventValidate;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  type: "add" | "edit";
  handleDelete?: (id: number) => void;
}

export const EventDialog = (props: IEventDialogProps) => (
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
            <Label htmlFor="title">{t("event.dialog.titleLabel")}</Label>
            <Input
              id="title"
              value={props.event?.title || ""}
              className="col-span-3"
              onChange={(e) =>
                props.setEvent((prev) =>
                  prev
                    ? { ...prev, title: e.target.value }
                    : {
                        title: e.target.value,
                        description: "",
                        date: "",
                        type: EEventType.Other,
                      },
                )
              }
            />
            <TypoValidation>{props.error.title}</TypoValidation>
          </div>
          <div className="flex flex-col gap-1">
            <Label>{t("event.dialog.dateLabel")}</Label>
            <DatePicker
              date={props.event?.date ? new Date(props.event.date) : undefined}
              setDate={(date) =>
                props.setEvent((prev) => {
                  if (prev) {
                    if (date) {
                      return { ...prev, date: formatDate(date) };
                    }
                    return prev;
                  }
                  if (date)
                    return {
                      title: "",
                      description: "",
                      date: formatDate(date),
                      type: EEventType.Other,
                    };
                  return null;
                })
              }
            />

            <TypoValidation>{props.error.date}</TypoValidation>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="type">{t("event.dialog.typeLabel")}</Label>
            <Select
              name="type"
              value={props.event?.type || EEventType.Other}
              onValueChange={(value) =>
                props.setEvent((prev) =>
                  prev
                    ? { ...prev, type: value as EEventType }
                    : { title: "", description: "", date: "", type: value as EEventType },
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("event.dialog.selectType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EEventType.Conference}>
                  {t("event.dialog.conference")}
                </SelectItem>
                <SelectItem value={EEventType.Interview}>{t("event.dialog.interview")}</SelectItem>
                <SelectItem value={EEventType.Workshop}>{t("event.dialog.workshop")}</SelectItem>
                <SelectItem value={EEventType.Other}>{t("event.dialog.other")}</SelectItem>
              </SelectContent>
            </Select>
            <TypoValidation>{props.error.type}</TypoValidation>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">{t("event.dialog.descriptionLabel")}</Label>
            <Textarea
              id="description"
              value={props.event?.description}
              onChange={(e) =>
                props.setEvent((prev) =>
                  prev
                    ? { ...prev, description: e.target.value }
                    : {
                        title: "",
                        description: e.target.value,
                        date: "",
                        type: EEventType.Other,
                      },
                )
              }
            />
            <TypoValidation>{props.error.description}</TypoValidation>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          {props.type === "edit" && props.event && props.event.id && (
            <Button
              type="button"
              variant="destructive"
              className="mr-auto"
              onClick={() => props.event && props.event.id && props.handleDelete?.(props.event.id)}
            >
              {t("event.dialog.delete")}
            </Button>
          )}
          <Button type="submit">{t(dialogType[props.type].submit)}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
);
