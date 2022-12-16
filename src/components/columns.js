export const COLUMNS = [
    {
        Header: "Name",
        Footer: "Name",
        accessor: "name",
        disableFilters: true,
    },
    {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
        disableFilters: true,
    },
    {
        Header: "Email",
        Footer: "Email",
        accessor: "email",
        disableFilters: true,
    },
    {
        Header: "Date",
        Footer: "Date",
        accessor: "date",
        disableFilters: true,
    },
    {
        Header: "Action",
        Footer: "Action",
        Cell: ({row:{values}}) => (
            <button onClick={()=>console.log(values)}>Click Me</button>
          ),
        disableFilters: true,
    },
];
