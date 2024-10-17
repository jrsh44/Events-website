import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { t } from "@/providers/intl";

interface ITablePaggination {
  page: number;
  setPage: (prev: number) => void;
  maxPage: number;
}

interface ITableDataProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  pagginationParams?: ITablePaggination;
}

export const TableData = <T extends object>(props: ITableDataProps<T>) => {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className=" rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={props.columns.length} className="h-24 text-center">
                  {t("table.noData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!!props.pagginationParams && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {t("table.paggination.description", {
              page: (props.pagginationParams.page + 1).toString(),
              maxPage: props.pagginationParams.maxPage.toString(),
            })}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => props.pagginationParams?.setPage(props.pagginationParams.page - 1)}
              disabled={props.pagginationParams.page === 0}
            >
              {t("table.paggination.prev")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => props.pagginationParams?.setPage(props.pagginationParams.page + 1)}
              disabled={props.pagginationParams.page === props.pagginationParams.maxPage - 1}
            >
              {t("table.paggination.next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
