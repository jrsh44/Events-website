import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { TableData } from "@/components/TableData";
import { TypoBody, TypoH1, TypoH2 } from "@/components/Typo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { EEventType, IEvent, IEventFilter, IFilteredEvents } from "@/models/event";
import { t } from "@/providers/intl";
import { Services } from "@/services/Services";
import { SelectValue } from "@radix-ui/react-select";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon, FilterXIcon } from "lucide-react";
import { useEffect, useState } from "react";

const initialFilters: IEventFilter = {
  page: 0,
  take: 10,
  sortBy: "id",
  sortDirection: "asc",
  dateFrom: undefined,
  dateTo: undefined,
  title: undefined,
  type: undefined,
};

export const PageHome = () => {
  const [filters, setFilters] = useState<IEventFilter>(initialFilters);
  const [filteredEvents, setFilteredEvents] = useState<IFilteredEvents>({ records: [], total: 0 });
  const [filtersKey, setFiltersKey] = useState(0);

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
  ];

  const handleEventsFetch = async (newFilters: IEventFilter) => {
    setFilters(newFilters);
    const response = await Services.App.searchArchivedEvents(newFilters);
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

  return (
    <div className="flex flex-col p-10 gap-8">
      <div className="flex flex-col gap-4">
        <TypoH1>{t("home.title")}</TypoH1>
        <TypoBody className="text-neutral-500">{t("home.description")}</TypoBody>
      </div>
      <Separator />
      <div className="flex flex-col gap-6">
        <TypoH2>{t("home.archivedEvents")}</TypoH2>
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
          <Button
            onClick={handleResetFilters}
            variant="destructive"
            className="p-2 justify-self-end w-10"
          >
            <FilterXIcon />
          </Button>
        </div>
        <TableData
          columns={columns}
          data={filteredEvents.records}
          pagginationParams={{
            maxPage: Math.ceil(filteredEvents.total / filters.take),
            page: filters.page,
            setPage: (page) => handleEventsFetch({ ...filters, page }),
          }}
        />
      </div>
    </div>
  );
};
