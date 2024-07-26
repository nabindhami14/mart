import { IVendor } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DoorOpen, MoreHorizontal, Trash } from "lucide-react";

import VerifyVendorDialog from "@/components/dialog/verify-vendor-dialog";
import { Badge } from "@/components/ui/badge";
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
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
    accessorKey: "createdAt",
    header: "Registration",
    cell: ({ row }) => {
      return <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>;
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
              <VerifyVendorDialog
                vendorId={row.original.id}
                isVerified={row.original.isVerified}
              ></VerifyVendorDialog>
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
