import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, XCircle } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";
import { sectionSchema } from "./schema";

export const dashboardColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="font-medium text-sm">{row.original.name}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.email}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 gap-1 flex items-center">
        {row.original.is_verified ? (
          <>
            <CircleCheck className="w-4 h-4 stroke-border fill-green-500 dark:fill-green-400" />
            <span>Verified</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4 stroke-border fill-red-500 dark:fill-red-400" />
            <span>Unverified</span>
          </>
        )}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "profile_image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile Image" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.profile_image;
      const name = row.original.name;
      return (
        <div className="flex items-center justify-start">
          <Avatar className="h-10 w-10">
            <AvatarImage src={imageUrl || ""} alt={name} />
            <AvatarFallback>{name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
    enableSorting: false,
  },
];
