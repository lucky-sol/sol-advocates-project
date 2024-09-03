"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { IAdvocate } from "@/db/schema"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatPhoneNumber } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"


const createHeader = (header: string) => {
    return function CustomHeader({ column }: { column: any }) {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                {header}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
}

export const columns: ColumnDef<IAdvocate>[] = [
    {
        accessorKey: "lastName",
        header: createHeader("Last Name"),
    },
    {
        accessorKey: "firstName",
        header: createHeader("First Name"),
    },
    {
        accessorKey: "city",
        header: createHeader("City"),
    },
    {
        accessorKey: "degree",
        header: createHeader("Degree"),
    },
    {
        accessorKey: "specialties",
        header: createHeader("Specialties"),
    },
    {
        accessorKey: "yearsOfExperience",
        header: createHeader("Years of Experience"),
    },
    {
        accessorKey: "phoneNumber",
        header: createHeader("Phone Number"),
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const advocate = row.original;
            const { toast } = useToast();

            return (
                <>
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={
                                        () => {
                                            navigator.clipboard.writeText(advocate.lastName);
                                            toast({
                                                description: "Copied ✅",
                                                duration: 2000
                                            })
                                        }}
                                >
                                    Copy Last Name
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem> <DialogTrigger>Open</DialogTrigger></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent>
                            <DialogTitle>Details</DialogTitle>
                            <DialogDescription>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{advocate.lastName}, {advocate.firstName} {advocate.degree ?? ""}</CardTitle>
                                        <CardDescription>
                                            <div>{advocate.city}, <Link href={`tel:${advocate.phoneNumber}`}>{formatPhoneNumber(advocate.phoneNumber?.toString() ?? "")}</Link></div>
                                            <p>Experience: {advocate.yearsOfExperience} years</p>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <h3>Specialties</h3>
                                        <ul className="list-disc pl-4 pt-2">
                                            {
                                                advocate.specialties
                                                    .sort((a: string, b: string) => a.localeCompare(b))
                                                    .map((specialty, i) => (
                                                        <li key={i}>{specialty}</li>
                                                    ))
                                            }
                                        </ul>

                                    </CardContent>
                                </Card>
                            </DialogDescription>

                        </DialogContent>
                    </Dialog>
                </>
            )
        },
    }
]
