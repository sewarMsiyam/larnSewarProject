"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Photos = {
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export const columns: ColumnDef<Photos>[] = [
  {
    accessorKey: "chekbox",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
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

  },
  {
    accessorKey: "id",
    header: "id",
    enableSorting: true,
    enableHiding: true,

  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href="#" className="underline">{row.original.title}</Link>
    ),
  },
  // {
  //   accessorKey: "url",
  //   header: "url",
  // },
  {
    accessorKey: "thumbnailUrl",
    header: "image",
    cell: ({ row }) => (
      <img
        src={row.original.thumbnailUrl}
        alt="img"
        width={50}
        height={50}
      />
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
     <div>
     <Button className="mx-1">Edite {row.original.id}</Button>
       
       <AlertDialog>
         <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mx-1">
            Delete

            
           {/* <Button className="mx-1" variant="destructive"> Delete </Button> */}
           </AlertDialogTrigger>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
             <AlertDialogDescription>
             Are you sure [{row.original.id}]?
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel>Cancel</AlertDialogCancel>
             <AlertDialogAction>Continue</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>

     </div>
    ),
  },
]
