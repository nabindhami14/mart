import { IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3, MoreHorizontal, Trash } from "lucide-react";

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
    accessorKey: "customer.name",
    header: "Customer Name",
  },
  {
    accessorKey: "customer.email",
    header: "Customer Email",
  },
  {
    accessorKey: "amount",
    header: "Total Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Timestamp",
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
