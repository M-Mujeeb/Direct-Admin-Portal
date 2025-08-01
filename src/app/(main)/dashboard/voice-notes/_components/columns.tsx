import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Loader, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

import { sectionSchema } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

export const dashboardColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fan Name" />,
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.header}
      </div>
    ),
    enableSorting: false,
  },
   {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Celebrity" />,
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.type}
      </div>
    ),
    enableSorting: false,
  },
   {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date & Time" />,
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.type}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Done" ? (
          <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
        ) : (
          <Loader />
        )}
        {row.original.status}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "target",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="Action" />,
    cell: ({ row }) => (
      <>
       <Badge variant="outline" className="text-muted-foreground px-1.5">
        Accept
      </Badge>
       <Badge variant="outline" className="text-muted-foreground px-1.5">
        Reject
      </Badge>
      </>
      
    ),
    enableSorting: false,
  },
 
  
];
