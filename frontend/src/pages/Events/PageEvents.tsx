import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { TableData } from "@/components/TableData";
import { TypoBody, TypoH1 } from "@/components/Typo";
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
import { useAppDispatch, useAppSelector } from "@/providers/store";
import { Services } from "@/services/Services";
import { ColumnDef } from "@tanstack/react-table";
import {
  CalendarPlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FilterXIcon,
  PencilLineIcon,
} from "lucide-react";
import { useEffect, useState, FormEvent } from "react";
import { PageNotFound } from "../NotFound/PageNotFound";
import { DialogTrigger } from "@/components/ui/dialog";
import { t } from "@/providers/intl";
import { EventDialog } from "./EventDialog";
import { roleAuth } from "@/models/auth";
import { appActions } from "@/slices/appSlice";

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
  const dispatch = useAppDispatch();

  const { role } = useAppSelector((state) => state.app.user);
  const isEventRead = roleAuth.eventRead.includes(role);
  const isEventModify = roleAuth.eventModify.includes(role);

  const handleSort = (column: keyof IEvent) => {
    const newSortDirection =
      filters.sortBy === column && filters.sortDirection === "asc" ? "desc" : "asc";
    handleEventsFetch({ ...filters, sortBy: column, sortDirection: newSortDirection, page: 0 });
  };

  const renderSortIcon = (column: keyof IEvent) => {
    if (filters.sortBy !== column) return null;
    return filters.sortDirection === "asc" ? (
      <ChevronUpIcon className="inline-block ml-2" />
    ) : (
      <ChevronDownIcon className="inline-block ml-2" />
    );
  };

  const columns: ColumnDef<IEvent>[] = [
    {
      accessorKey: "id",
      header: () => (
        <div onClick={() => handleSort("id")} className="flex items-center cursor-pointer">
          ID {renderSortIcon("id")}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => (
        <div onClick={() => handleSort("title")} className="flex items-center cursor-pointer">
          {t("events.titleLabel")} {renderSortIcon("title")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => (
        <div onClick={() => handleSort("description")} className="flex items-center cursor-pointer">
          {t("events.descriptionLabel")} {renderSortIcon("description")}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: () => (
        <div onClick={() => handleSort("date")} className="flex items-center cursor-pointer">
          {t("events.dateLabel")} {renderSortIcon("date")}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: () => (
        <div onClick={() => handleSort("type")} className="flex items-center cursor-pointer">
          {t("events.typeLabel")} {renderSortIcon("type")}
        </div>
      ),
    },
    ...(isEventModify
      ? [
          {
            accessorKey: "edit",
            header: () => <div className="text-right">{t("events.actions")}</div>,
            cell: ({ row }: { row: { original: IEvent } }) => (
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
        ]
      : []),
  ];

  const handleEventsFetch = async (newFilters: IEventFilter) => {
    if (!isEventRead) return;
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

    if (!modifiedEvent?.title) newErrors.title = t("validation.required");
    if (!modifiedEvent?.date) newErrors.date = t("validation.required");
    if (!modifiedEvent?.type) newErrors.type = t("validation.required");
    if (!modifiedEvent?.description) newErrors.description = t("validation.required");

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (validateEvent() && modifiedEvent) {
      const response = await Services.App.updateEvent(
        (modifiedEvent?.id ?? -1).toString(),
        modifiedEvent,
      );
      if (response) {
        if (response.ok) {
          handleEventsFetch(filters);
          dispatch(
            appActions.setToast({
              title: t("toast.title.success"),
              description: t("toast.description.event.update"),
            }),
          );
        }
      }
    }
  };

  const handleAddEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (validateEvent() && modifiedEvent) {
      const response = await Services.App.createEvent(modifiedEvent);

      if (response) {
        if (response.ok) {
          handleEventsFetch(filters);
          setModifiedEvent(null);
          dispatch(
            appActions.setToast({
              title: t("toast.title.success"),
              description: t("toast.description.event.update"),
            }),
          );
        }
      }
    }
  };

  const handleDeleteEvent = async (id: number) => {
    const response = await Services.App.deleteEvent(id.toString());

    if (response) {
      if (response.ok) {
        handleEventsFetch(filters);
        dispatch(
          appActions.setToast({
            title: t("toast.title.success"),
            description: t("toast.description.event.delete"),
          }),
        );
      }
    }
  };

  return isEventRead ? (
    <div className="flex flex-col p-10 gap-8">
      <div className="flex flex-col gap-4">
        <TypoH1>{t("events.title")}</TypoH1>
        <TypoBody className="text-neutral-500">{t("events.description")}</TypoBody>
      </div>
      <div className="flex flex-col gap-6">
        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 flex-col md:flex-row"
          key={filtersKey}
        >
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
          <div className="flex gap-4 justify-self-end">
            {isEventModify && (
              <EventDialog
                event={modifiedEvent}
                setEvent={setModifiedEvent}
                error={errors}
                handleSubmit={handleAddEvent}
                type="edit"
              >
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="p-2"
                    onClick={() => {
                      setModifiedEvent(null);
                      setErrors(initialErrors);
                    }}
                  >
                    <CalendarPlusIcon />
                  </Button>
                </DialogTrigger>
              </EventDialog>
            )}
            <Button
              onClick={handleResetFilters}
              variant="destructive"
              className="p-2 justify-self-end w-10"
            >
              <FilterXIcon />
            </Button>
          </div>
        </div>
        <EventDialog
          event={modifiedEvent}
          setEvent={setModifiedEvent}
          error={errors}
          handleSubmit={handleUpdate}
          handleDelete={handleDeleteEvent}
          type="edit"
        >
          <TableData
            columns={columns}
            data={filteredEvents.records}
            pagginationParams={{
              maxPage: Math.ceil(filteredEvents.total / filters.take),
              page: filters.page,
              setPage: (page) => handleEventsFetch({ ...filters, page }),
            }}
          />
        </EventDialog>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};
