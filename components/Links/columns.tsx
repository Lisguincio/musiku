import { link } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../Table/DataTableColumnHeader";
import { Checkbox } from "../ui/checkbox";
import LinkOptionDropdown from "./LinkOptionDropdown";

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
      <div className="w-[50px] ">
        <img
          src={data.coverImage || "https://placehold.co/50x50"}
          alt={`Cover image for ${data.title}`}
          width={50}
          height={50}
        />
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
});

const title = linkColumnHelper.accessor("title", {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Title" />
  ),
  cell: ({ row }) => (
    <p className="flex max-w-[800px] ">{row.original.title}</p>
  ),
  footer: (props) => props.column.id,
});

const author = linkColumnHelper.accessor("author", {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Author" />
  ),
  cell: ({ row }) => <p>{row.original.author}</p>,
});

const releaseDate = linkColumnHelper.display({
  id: "releaseDate",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Published at" />
  ),
});

const actions = linkColumnHelper.display({
  id: "actions",
  cell: ({ row }) => <LinkOptionDropdown link={row.original} />,
});

const columns = [selection, coverImage, title, author, releaseDate, actions];

export default columns;
