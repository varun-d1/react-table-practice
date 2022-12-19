import { TableView } from "./components/TableView";
import MOCK_DATA from "./components/data.json";
import {COLUMNS} from "./components/columns"

function App() {
    return (
        <div className="m-5">
            <TableView tableData={MOCK_DATA} globalSearch={true} tableFooter={true}tableColumns={COLUMNS}/>
        </div>
    );
}

export default App;
