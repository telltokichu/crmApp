import { useEffect, useState } from "react";
import { getAllPolicies } from "@/services/policyService";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Policy = {
    id: string;
    policy_number: string;
    policy_type: string;
    coverage_amount: number;
    start_date: string;
    end_date: string;
    status: string;
};

export default function PoliciesPage() {
    const [data, setData] = useState<Policy[]>([]);
    const [tableSorting, setTableSorting] = useState<SortingState>([]);

    useEffect(() => {
        (async () => {
            const result = await getAllPolicies();
            setData(result);
        })();
    }, []);

    const columns: ColumnDef<Policy>[] = [
        {
            accessorKey: "policy_number",
            header: "Policy Number",
        },
        {
            accessorKey: "policy_type",
            header: "Type",
        },
        {
            accessorKey: "coverage_amount",
            header: "Coverage",
            cell: ({ row }) => `₹${row.original.coverage_amount.toLocaleString()}`,
        },
        {
            accessorKey: "start_date",
            header: "Start Date",
        },
        {
            accessorKey: "end_date",
            header: "End Date",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;
                const base = "capitalize font-semibold px-2 py-0.5 rounded text-xs ";
                const style =
                    status === "active"
                        ? "bg-green-100 text-green-800"
                        : status === "expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800";
                return <span className={base + style}>{status}</span>;
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: tableSorting,
        },
        onSortingChange: setTableSorting,
    });

    return (
        <div className="w-full px-8 py-6">
            <h1 className="text-2xl font-bold mb-4">Policies</h1>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none px-6 py-3"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {{
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted() as string] ?? null}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="border-b border-muted">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="px-6 py-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
