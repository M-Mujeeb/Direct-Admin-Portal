import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, XCircle, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

import { sectionSchema } from "./schema";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
;
import { Info } from "lucide-react";
import { useDeleteCelebrityMutation } from "@/services/auth-api";
import { ClipLoader } from "react-spinners";
import { EditCelebrityDialog } from "./EditCelebrityDialog";


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
      <div className="font-medium text-sm">
          {row.original.email}
      </div>
    ),
    enableSorting: false,
  },
 {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 gap-1 flex items-center">
        {row.original.status ? (
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
  accessorKey: "about",
  header: ({ column }) => (
    <DataTableColumnHeader
      className="w-full text-left"
      column={column}
      title="About"
    />
  ),
  cell: ({ row }) => {
    const about = row.original.about;

    return (
      <div className="text-sm max-w-xs line-clamp-2 text-muted-foreground">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto text-left hover:underline">
              {about!.slice(0, 80)}
              {about!.length > 80 && "..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-md text-sm text-muted-foreground whitespace-pre-wrap">
            {about}
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  enableSorting: false,
}
,
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
  {
    accessorKey: "celebrity_type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Celebrity Type" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.celebrity_type}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
 {
  id: "actions",
  cell: ({ row }) => {
    const id = row.original.id;
    const [deleteCelebrity, { isLoading }] = useDeleteCelebrityMutation();
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleDelete = async () => {
      try {
        await deleteCelebrity(id).unwrap();
        toast.success("Celebrity deleted successfully");
        setOpenDelete(false);
      } catch (error) {
        toast.error("Failed to delete celebrity");
        console.error("Delete error:", error);
      }
    };

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
              <EllipsisVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpenEdit(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpenDelete(true);
              }}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditCelebrityDialog
          celebrity={row.original}
          open={openEdit}
          onOpenChange={setOpenEdit}
        />
        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete the celebrity.
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                onClick={handleDelete}
              >
                {isLoading ? <ClipLoader color="white" size={18} /> : "Yes, delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
  enableSorting: false,
}

];
