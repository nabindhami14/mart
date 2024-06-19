import { IVendor } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  Check,
  CrossIcon,
  DoorOpen,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { Badge } from "../../../ui/badge";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<IVendor>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isVerified ? "default" : "destructive"}>
          {row.original.isVerified ? "VERIFIED" : "NOT VERIFIED"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
              <DoorOpen className="w-4 h-4 mr-2" />
              Open
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {row.original.isVerified ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <CrossIcon className="w-4 h-4 mr-2" />
              )}
              {row.original.isVerified ? "NOT VERIFY" : "VERIFY"}
            </DropdownMenuItem>
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
