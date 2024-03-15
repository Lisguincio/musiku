import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { link } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { CircleCheck, CircleX, MoreVertical } from "lucide-react";
import { DataTableColumnHeader } from "../Table/DataTableColumnHeader";
import { Checkbox } from "../ui/checkbox";
import LinkOptionDropdown from "./LinkOptionDropdown";
import useTogglePublished from "@/mutations/useTogglePublished";
import { Switch } from "../ui/switch";
import LinkPublishedToggle from "./LinkPublishedToggle";

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
  size: 200,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Title" />
  ),
  footer: (props) => props.column.id,
});

const published = linkColumnHelper.display({
  id: "published",
  cell: ({ row }) => <LinkPublishedToggle link={row.original} />,
  footer: (props) => props.column.id,
});

const actions = linkColumnHelper.display({
  id: "actions",
  cell: ({ row }) => <LinkOptionDropdown link={row.original} />,
});

const columns = [selection, published, coverImage, title, actions];

export default columns;
