import "./employee-list.css"
import "../Home/home.css"
import { Link } from "react-router-dom";
import tableHeader from "../../Constants/tableHeader.constant"
import { useSelector } from 'react-redux'
import { useState } from "react"
import produce from "immer";

function EmployeeList() {
    const employeeArray = useSelector(state => state.employee.employeesList)
    const [filteredArray, setFilteredArray] = useState(employeeArray)
    const [sortedTableHeader, setSortedTableHeader] = useState(tableHeader)

    function filterArray(searchValue) {
        let filteredArray = employeeArray.filter(element => {
            const vals = Object.keys(element).map(key => element[key])
            const filterProperties = vals.filter(element => element?.toLowerCase().includes(searchValue?.toLowerCase()))

            return filterProperties.length > 0
        })

        setFilteredArray(filteredArray)

    }

    function handleSort(index, value) {
        if (sortedTableHeader[index].sort === "none") {
            setSortedTableHeader(produce((draft) => { draft.forEach(element => element.sort = "none") }))
            setSortedTableHeader(produce((draft) => { draft[index].sort = "asc" }))

            setFilteredArray(produce((draft) => {
                if (value === "startDate" || value === "birthDate") {
                    draft.sort(function (a, b) {
                        if (new Date(a[value]) > new Date(b[value])) return 1;
                        if (new Date(a[value]) < new Date(b[value])) return -1;
                        return 0;
                    });
                }
                else {
                    draft.sort(function (a, b) {
                        if (a[value] > b[value]) return 1;
                        if (a[value] < b[value]) return -1;
                        return 0;
                    });
                }
            }))
        }
        if (sortedTableHeader[index].sort === "asc") {
            setSortedTableHeader(produce((draft) => { draft.forEach(element => element.sort = "none") }))
            setSortedTableHeader(produce((draft) => { draft[index].sort = "desc" }))

            setFilteredArray(produce((draft) => {
                if (value === "startDate" || value === "birthDate") {
                    draft.sort(function (a, b) {
                        if (new Date(a[value]) < new Date(b[value])) return 1;
                        if (new Date(a[value]) > new Date(b[value])) return -1;
                        return 0;
                    });
                }
                else {
                    draft.sort(function (a, b) {
                        if (a[value] < b[value]) return 1;
                        if (a[value] > b[value]) return -1;
                        return 0;
                    });
                }
            }))
        }
        if (sortedTableHeader[index].sort === "desc") {
            setSortedTableHeader(produce((draft) => { draft[index].sort = "none" }))

            setFilteredArray(employeeArray)
        }
    }


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
                        <input type="search" placeholder="" aria-controls="employee-table" onChange={e => filterArray(e.target.value)} />
                    </label>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr className="table-header">
                            {sortedTableHeader.map((column, i) => {
                                return (
                                    <th
                                        key={`thead-th-${i}`}
                                        className={`sorting th-employees ${column.sort === "none" ? "sorting-both" : ""} ${column.sort === "asc" ? "sorting-asc" : ""} ${column.sort === "desc" ? "sorting-desc" : ""}`}
                                        tabIndex="0" aria-controls="employee-table"
                                        rowSpan="1"
                                        colSpan="1"
                                        width={84}
                                        onClick={() => handleSort(i, column.value)}>{column.label}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    {filteredArray?.length > 0 &&
                        <tbody>
                            {filteredArray.map((employee, i) => {
                                return (
                                    <tr key={`employee-row-${i}`}>
                                        {Object.keys(employee).map((key, j) => {
                                            return (
                                                <td colSpan="1" width={100} key={`employee-cell-${i}-${j}`} className="td-employees">
                                                    {employee[key]}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    }
                </table>

            </div>
            <Link to="/">Home</Link>
        </div>
    )
}

export default EmployeeList;