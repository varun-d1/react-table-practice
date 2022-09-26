import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from "./data.json";
import { COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

export const Table = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter,
        };
    }, []);

    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
    );
    console.log(tableInstance);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups, state, setGlobalFilter } =
        tableInstance;

    const { globalFilter } = state;
    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table className="table table-bordered" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span className="ml-1">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <i className="fa fa-sort-asc" />
                                            ) : (
                                                <i className="fa fa-sort-desc" />
                                            )
                                        ) : (
                                            <i className="fa fa-sort" />
                                        )}
                                    </span>
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </>
    );
};
