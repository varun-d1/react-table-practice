import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";

import "./style.css";
import { COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

export const TableView = (props) => {
    const { globalSearch, tableFooter, tableData } = props;

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => tableData, []);

    
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
        usePagination,
    );


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        footerGroups,
        state,
        setGlobalFilter,
        page,
        nextPage,
        gotoPage,
        pageCount,
        previousPage,
        canNextPage,
        setPageSize,
        canPreviousPage,
        pageOptions,
    } = tableInstance;
   
    const { globalFilter, pageIndex, pageSize } = state;
 
    return (
        <div className="card py-4">
            {/* Header Start */}
            <div className="py-2 px-1 d-flex flex-row">
                {globalSearch && <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />}
            </div>
            {/* Header End */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-md " {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="text-center"
                                    >
                                        {column.render("Header")}
                                        <span className="ms-2">
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
                                        {column.canFilter && <div> {column.render("Filter")}</div>}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
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
                    {tableFooter && (
                        <tfoot>
                            {footerGroups.map((footerGroup) => (
                                <tr {...footerGroup.getFooterGroupProps()} className="text-center">
                                    {footerGroup.headers.map((column) => (
                                        <td {...column.getFooterProps()} className="font-weight-bold fw-bold">{column.render("Footer")}</td>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    )}
                </table>
            </div>
            {/* Footer Start */}
            <div className="px-1">
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div style={{ marginRight: "10px" }}>
                            Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length} </strong>
                        </div>
                        <div>
                            <select
                                className="form-control form-control-sm"
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                            >
                                {[10, 20, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div style={{ marginRight: "6px" }}> Go to Page:</div>
                        <div>
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(pageNumber);
                                }}
                                value={pageIndex}
                                style={{ width: "50px", textAlign: "center" }}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            <i className="fa fa-fast-backward"></i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary ms-2"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary mx-2"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            Next
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            <i className="fa fa-fast-forward"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* Footer End */}
        </div>
    );
};
