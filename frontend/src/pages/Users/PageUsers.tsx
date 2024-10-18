import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableData } from "@/components/TableData";
import { TypoBody, TypoH1 } from "@/components/Typo";
import { DialogTrigger } from "@/components/ui/dialog";
import { IUserFilter, IFilteredUsers, IUserCredentials } from "@/models/user";
import { Services } from "@/services/Services";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FilterXIcon,
  PencilLineIcon,
  UserPlusIcon,
} from "lucide-react";
import { PageNotFound } from "../NotFound/PageNotFound";
import { useAppDispatch, useAppSelector } from "@/providers/store";
import { t } from "@/providers/intl";
import { UserDialog } from "./UserDialog";
import { roleAuth } from "@/models/auth";
import { appActions } from "@/slices/appSlice";

const initialFilters: IUserFilter = {
  page: 0,
  take: 10,
  sortBy: "id",
  sortDirection: "asc",
};

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  password: "",
};

export const PageUsers = () => {
  const [filters, setFilters] = useState<IUserFilter>(initialFilters);
  const [filteredUsers, setFilteredUsers] = useState<IFilteredUsers>({ records: [], total: 0 });
  const [filtersKey, setFiltersKey] = useState(0);
  const [modifiedUser, setModifiedUser] = useState<IUserCredentials | null>(null);
  const [errors, setErrors] = useState(initialErrors);
  const dispatch = useAppDispatch();

  const handleSort = (column: keyof IUserCredentials) => {
    const newSortDirection =
      filters.sortBy === column && filters.sortDirection === "asc" ? "desc" : "asc";
    handleUsersFetch({ ...filters, sortBy: column, sortDirection: newSortDirection, page: 0 });
  };

  const renderSortIcon = (column: keyof IUserCredentials) => {
    if (filters.sortBy !== column) return null;
    return filters.sortDirection === "asc" ? (
      <ChevronUpIcon className="inline-block ml-2" />
    ) : (
      <ChevronDownIcon className="inline-block ml-2" />
    );
  };

  const columns: ColumnDef<IUserCredentials>[] = [
    {
      accessorKey: "id",
      header: () => (
        <div onClick={() => handleSort("id")} className="flex items-center cursor-pointer">
          ID {renderSortIcon("id")}
        </div>
      ),
    },
    {
      accessorKey: "firstName",
      header: () => (
        <div onClick={() => handleSort("firstName")} className="flex items-center cursor-pointer">
          {t("users.firstNameLabel")} {renderSortIcon("firstName")}
        </div>
      ),
    },
    {
      accessorKey: "lastName",
      header: () => (
        <div onClick={() => handleSort("lastName")} className="flex items-center cursor-pointer">
          {t("users.lastNameLabel")} {renderSortIcon("lastName")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => (
        <div onClick={() => handleSort("email")} className="flex items-center cursor-pointer">
          {t("users.emailLabel")} {renderSortIcon("email")}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => (
        <div onClick={() => handleSort("role")} className="flex items-center cursor-pointer">
          {t("users.roleLabel")} {renderSortIcon("role")}
        </div>
      ),
    },
    {
      accessorKey: "edit",
      header: () => <div className="text-right">{t("users.actions")}</div>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
              onClick={() => {
                setModifiedUser(row.original);
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
  const isUserModify = roleAuth.userModify.includes(role);

  const handleUsersFetch = async (newFilters: IUserFilter) => {
    if (!isUserModify) return;
    setFilters(newFilters);
    const response = await Services.App.searchUsers(newFilters);
    if (response) {
      const data = await response.json();
      if (response.ok) {
        setFilteredUsers(data);
      }
    }
  };

  const handleResetFilters = () => {
    handleUsersFetch(initialFilters);
    setFiltersKey((prev) => prev + 1);
  };

  useEffect(() => {
    handleUsersFetch(initialFilters);
  }, []);

  const validateUser = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
    };

    if (!modifiedUser?.firstName) newErrors.firstName = t("validation.required");
    if (!modifiedUser?.lastName) newErrors.lastName = t("validation.required");
    if (!modifiedUser?.email) newErrors.email = t("validation.required");
    if (!modifiedUser?.role) newErrors.role = t("validation.required");

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const validateUserCredentials = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
    };

    if (!modifiedUser?.firstName) newErrors.firstName = t("validation.required");
    if (!modifiedUser?.lastName) newErrors.lastName = t("validation.required");
    if (!modifiedUser?.email) newErrors.email = t("validation.required");
    if (!modifiedUser?.role) newErrors.role = t("validation.required");
    if (!modifiedUser?.password) newErrors.password = t("validation.required");

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (validateUser() && modifiedUser) {
      const response = await Services.App.updateUser(
        (modifiedUser?.id ?? -1).toString(),
        modifiedUser,
      );
      if (response) {
        if (response.ok) {
          handleUsersFetch(filters);
          dispatch(
            appActions.setToast({
              title: t("toast.title.success"),
              description: t("Pomyślnie zaktualizowano użytkownika"),
            }),
          );
        } else {
          const data = await response.json();
          setErrors({
            firstName: data.validationErrors.firstName,
            lastName: data.validationErrors.lastName,
            email: data.validationErrors.email,
            role: data.validationErrors.role,
            password: "",
          });
        }
      }
    }
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (validateUserCredentials() && modifiedUser) {
      const response = await Services.App.createUser(modifiedUser);

      if (response) {
        if (response.ok) {
          handleUsersFetch(filters);
          setModifiedUser(null);
          dispatch(
            appActions.setToast({
              title: t("toast.title.success"),
              description: t("toast.description.user.add"),
            }),
          );
        } else {
          const data = await response.json();
          setErrors({
            firstName: data.validationErrors.firstName,
            lastName: data.validationErrors.lastName,
            email: data.validationErrors.email,
            role: data.validationErrors.role,
            password: data.validationErrors.password,
          });
        }
      }
    }
  };

  const handleDelete = async (id: number) => {
    const response = await Services.App.deleteUser(id.toString());

    if (response) {
      if (response.ok) {
        handleUsersFetch(filters);
        dispatch(
          appActions.setToast({
            title: t("toast.title.success"),
            description: t("toast.description.user.delete"),
          }),
        );
      }
    }
  };

  return isUserModify ? (
    <div className="flex flex-col p-10 gap-8">
      <div className="flex flex-col gap-4">
        <TypoH1>{t("users.title")}</TypoH1>
        <TypoBody className="text-neutral-500">{t("users.description")}</TypoBody>
      </div>
      <div className="flex flex-col gap-6">
        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-col lg:flex-row"
          key={filtersKey}
        >
          <Input
            name="firstName"
            placeholder={t("users.filterByFirstName")}
            value={filters.firstName}
            onChange={(e) =>
              setFilters((prevFilters) => ({ ...prevFilters, firstName: e.target.value }))
            }
            onBlur={() => handleUsersFetch(filters)}
          />
          <Input
            name="lastName"
            placeholder={t("users.filterByLastName")}
            value={filters.lastName}
            onChange={(e) =>
              setFilters((prevFilters) => ({ ...prevFilters, lastName: e.target.value }))
            }
            onBlur={() => handleUsersFetch(filters)}
          />
          <Input
            name="email"
            placeholder={t("users.filterByEmail")}
            value={filters.email}
            onChange={(e) =>
              setFilters((prevFilters) => ({ ...prevFilters, email: e.target.value }))
            }
            onBlur={() => handleUsersFetch(filters)}
          />
          <div className="flex gap-4 justify-self-end">
            <UserDialog
              user={modifiedUser}
              setUser={setModifiedUser}
              error={errors}
              handleSubmit={handleCreate}
              type="add"
            >
              <DialogTrigger asChild>
                <Button variant="secondary" className="p-2" onClick={() => setModifiedUser(null)}>
                  <UserPlusIcon />
                </Button>
              </DialogTrigger>
            </UserDialog>
            <Button onClick={handleResetFilters} variant="destructive" className="p-2 w-10">
              <FilterXIcon />
            </Button>
          </div>
        </div>
        <UserDialog
          user={modifiedUser}
          setUser={setModifiedUser}
          error={errors}
          handleSubmit={handleUpdate}
          handleDelete={handleDelete}
          type="edit"
        >
          <TableData
            columns={columns}
            data={filteredUsers.records}
            pagginationParams={{
              maxPage: Math.ceil(filteredUsers.total / filters.take),
              page: filters.page,
              setPage: (page) => handleUsersFetch({ ...filters, page }),
            }}
          />
        </UserDialog>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};
