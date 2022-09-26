import { useState } from "react";
import { useAsyncDebounce } from "react-table";
const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 1000);

    return (
        <div>
            <span>
                Search{" "}
                <input
                    value={value || ""}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                />
            </span>
        </div>
    );
};

export default GlobalFilter;
