import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { TableData } from "@/components/TableData";
import { TypoBody, TypoH1, TypoValidation } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { EEventType, IEvent, IEventFilter, IFilteredEvents } from "@/models/event";
import { EUserRole } from "@/models/user";
import { useAppSelector } from "@/providers/store";
import { Services } from "@/services/Services";
import { ColumnDef } from "@tanstack/react-table";
import { FilterXIcon, PencilLineIcon } from "lucide-react";
import { useEffect, useState, FormEvent } from "react";
import { PageNotFound } from "../NotFound/PageNotFound";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { DatePicker } from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/providers/intl";

const initialFilters: IEventFilter = {
  page: 0,
  take: 10,
  sortBy: "id",
  sortDirection: "asc",
};

const initialErrors = {
  title: "",
  date: "",
  type: "",
  description: "",
};

export const PageEvents = () => {
  const [filters, setFilters] = useState<IEventFilter>(initialFilters);
  const [filteredEvents, setFilteredEvents] = useState<IFilteredEvents>({ records: [], total: 0 });
  const [filtersKey, setFiltersKey] = useState(0);
  const [modifiedEvent, setModifiedEvent] = useState<IEvent | null>(null);
  const [errors, setErrors] = useState(initialErrors);

  const columns: ColumnDef<IEvent>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: t("events.titleLabel") },
    { accessorKey: "description", header: t("events.descriptionLabel") },
    { accessorKey: "date", header: t("events.dateLabel") },
    { accessorKey: "type", header: t("events.typeLabel") },
    {
      accessorKey: "edit",
      header: () => <div className="text-right">{t("events.actions")}</div>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
              onClick={() => {
                setModifiedEvent(row.original);
                setErrors(initialErrors);
              }}
            >
              <PencilLineIcon />
            </Button>
          </DialogTrigger>
        </div>
      ),
    },
  ];

  const { role } = useAppSelector((state) => state.app.user);
  const isUserAuthenticated = role !== EUserRole.None;

  const handleEventsFetch = async (newFilters: IEventFilter) => {
    if (!isUserAuthenticated) return;
    setFilters(newFilters);
    const response = await Services.App.searchEvents(newFilters);
    if (response) {
      const data = await response.json();
      if (response.ok) {
        setFilteredEvents(data);
      }
    }
  };

  const handleResetFilters = () => {
    handleEventsFetch(initialFilters);
    setFiltersKey((prev) => prev + 1);
  };

  useEffect(() => {
    handleEventsFetch(initialFilters);
  }, []);

  const validateEvent = () => {
    const newErrors = {
      title: "",
      date: "",
      type: "",
      description: "",
    };

    if (!modifiedEvent?.title) newErrors.title = t("events.errors.title");
    if (!modifiedEvent?.date) newErrors.date = t("events.errors.date");
    if (!modifiedEvent?.type) newErrors.type = t("events.errors.type");
    if (!modifiedEvent?.description) newErrors.description = t("events.errors.description");

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateEvent()) {
      // Save event data logic here
      // Example:
      // const response = await Services.App.updateEvent(modifiedEvent);
      // if (response.ok) {
      //   handleEventsFetch(filters);
      //   setModifiedEvent(null);
      // }
    }
  };

  return isUserAuthenticated ? (
    <div className="flex flex-col p-10 gap-8">
      <div className="flex flex-col gap-4">
        <TypoH1>{t("events.title")}</TypoH1>
        <TypoBody className="text-neutral-500">{t("events.description")}</TypoBody>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4" key={filtersKey}>
          <Input
            name="title"
            placeholder={t("home.filterByTitle")}
            value={filters.title}
            onChange={(e) =>
              setFilters((prevFilters) => ({ ...prevFilters, title: e.target.value }))
            }
            onBlur={() => handleEventsFetch(filters)}
          />
          <Select
            name="type"
            value={filters.type}
            onValueChange={(value) => handleEventsFetch({ ...filters, type: value as EEventType })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("home.filterByType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EEventType.Conference}>{t("home.conference")}</SelectItem>
              <SelectItem value={EEventType.Interview}>{t("home.interview")}</SelectItem>
              <SelectItem value={EEventType.Workshop}>{t("home.workshop")}</SelectItem>
              <SelectItem value={EEventType.Other}>{t("home.other")}</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange
            dateRange={{
              from: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
              to: filters.dateTo ? new Date(filters.dateTo) : undefined,
            }}
            setDate={(dateRange) =>
              handleEventsFetch({
                ...filters,
                dateFrom: formatDate(dateRange?.from),
                dateTo: formatDate(dateRange?.to),
              })
            }
          />
          <Button onClick={handleResetFilters} variant="destructive" className="p-2">
            <FilterXIcon />
          </Button>
        </div>
        <Dialog>
          <TableData
            columns={columns}
            data={filteredEvents.records}
            pagginationParams={{
              maxPage: Math.ceil(filteredEvents.total / filters.take),
              page: filters.page,
              setPage: (page) => handleEventsFetch({ ...filters, page }),
            }}
          />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("events.editEvent")}</DialogTitle>
              <DialogDescription>{t("events.editEventDescription")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="title">{t("events.titleLabel")}</Label>
                  <Input
                    id="title"
                    value={modifiedEvent?.title}
                    className="col-span-3"
                    onChange={(e) =>
                      setModifiedEvent((prev) => (prev ? { ...prev, title: e.target.value } : null))
                    }
                  />
                  <TypoValidation>{errors.title}</TypoValidation>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="date" className="text-left">
                    {t("events.dateLabel")}
                  </Label>
                  <DatePicker
                    date={modifiedEvent?.date ? new Date(modifiedEvent?.date) : undefined}
                    setDate={(date) =>
                      setModifiedEvent((prev) =>
                        prev ? { ...prev, date: formatDate(date) || "" } : null,
                      )
                    }
                  />
                  <TypoValidation>{errors.date}</TypoValidation>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="type">{t("events.typeLabel")}</Label>
                  <Select
                    name="type"
                    value={modifiedEvent?.type}
                    onValueChange={(value) =>
                      setModifiedEvent((prev) =>
                        prev ? { ...prev, type: value as EEventType } : null,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("home.filterByType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={EEventType.Conference}>{t("home.conference")}</SelectItem>
                      <SelectItem value={EEventType.Interview}>{t("home.interview")}</SelectItem>
                      <SelectItem value={EEventType.Workshop}>{t("home.workshop")}</SelectItem>
                      <SelectItem value={EEventType.Other}>{t("home.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <TypoValidation>{errors.type}</TypoValidation>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="description">{t("events.descriptionLabel")}</Label>
                  <Textarea
                    id="description"
                    value={modifiedEvent?.description}
                    onChange={(e) =>
                      setModifiedEvent((prev) =>
                        prev ? { ...prev, description: e.target.value } : null,
                      )
                    }
                    className="col-span-3"
                  />
                  <TypoValidation>{errors.description}</TypoValidation>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Button type="button" variant="destructive">
                  {t("events.delete")}
                </Button>
                <Button type="submit">{t("events.saveChanges")}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};
