import { IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3, MoreHorizontal, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isArchived ? "default" : "destructive"}>
          {row.original.isArchived ? "ARCHIVED" : "NOT ARCHIVED"}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit3 className="w-4 h-4 mr-2" />
              EDIT
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem></DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="w-4 h-4 mr-2" />
              DELETE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
