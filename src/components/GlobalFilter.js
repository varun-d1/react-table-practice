import { useState } from "react";
import { useAsyncDebounce } from "react-table";
const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 1000);

    return (
        <div className="d-flex align-items-center">
            <div className="me-2">Search</div>
            <div style={{width:"200px"}}>
                <input
                    className="form-control"
                    value={value || ""}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default GlobalFilter;
