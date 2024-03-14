import { link } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleCheck,
  CircleX,
  CrossIcon,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../Table/DataTableColumnHeader";
import Image from "next/image";

const linkColumnHelper = createColumnHelper<link>();

const selection = linkColumnHelper.display({
  id: "select",
  header: ({ table }) => (
    <div className="items-center inline-flex">
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    </div>
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
});
const coverImage = linkColumnHelper.display({
  id: "coverImage",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Cover" />
  ),
  cell: ({ row }) => {
    const data = row.original;
    return (
      <img
        src={
          //data.coverImage ||
          "https://placehold.co/50x50"
        }
        alt={`Cover image for ${data.title}`}
        width={50}
        height={50}
      />
    );
  },
  enableSorting: false,
  enableHiding: false,
});

const title = linkColumnHelper.accessor("title", {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Title" />
  ),
  footer: (props) => props.column.id,
});

const publishDate = linkColumnHelper.accessor("published", {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Published" />
  ),
  cell: ({ cell }) => {
    const value = cell.getValue();
    const icon = value ? (
      <CircleCheck className="text-green-500" />
    ) : (
      <CircleX className="text-red-500" />
    );
    return icon;
  },
  footer: (props) => props.column.id,
});

const actions = linkColumnHelper.display({
  id: "actions",
  cell: ({ row }) => {
    const payment = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(payment.id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
});

const columns = [selection, publishDate, coverImage, title, actions];

export default columns;
