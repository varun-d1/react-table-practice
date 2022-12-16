import { TableView } from "./components/TableView";
import MOCK_DATA from "./components/data.json";
function App() {
    return (
        <div className="m-5">
            <TableView tableData={MOCK_DATA} globalSearch={true} tableFooter={true}/>
        </div>
    );
}

export default App;
