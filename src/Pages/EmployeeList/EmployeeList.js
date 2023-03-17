import "./employee-list.css"
import "../Home/home.css"
import { Link } from "react-router-dom";
import tableHeader from "../../Constants/tableHeader.constant"

function EmployeeList() {

    return (
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <div className="searchbar-container">
                <div className="dataTables_length" id="employee-table_length">
                    <label>Show
                        <select name="employee-table_length" aria-controls="employee-table">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select> entries
                    </label>
                </div>
                <div id="employee-table_filter" className="dataTables_filter">
                    <label>Search:
                        <input type="search" placeholder="" aria-controls="employee-table" />
                    </label>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {tableHeader.map((column, i) => {
                                return (
                                    <th key={`thead-th-${i}`} className="sorting" tabIndex="0" aria-controls="employee-table" rowSpan="1" colSpan="1" width={120}>{column}</th>
                                )
                            })}
                        </tr>
                    </thead>
                </table>

            </div>
            <Link to="/">Home</Link>
        </div>
    )
}

export default EmployeeList;