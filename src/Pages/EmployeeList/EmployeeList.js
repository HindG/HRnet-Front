import "./employee-list.css"
import "../Home/home.css"
import tableHeader from "../../Constants/tableHeader.constant"
import { useSelector } from 'react-redux'
import { useState, useRef, Fragment } from "react"
import produce from "immer";
import DropDown from "../../Components/DropDown/DropDown";
import pageSizeConstant from "../../Constants/pageSize.constant";
import EmptyState from "../../Components/EmptyState/EmptyState";
import Header from "../../Components/Header/Header";

function EmployeeList() {
    const employeeArray = useSelector(state => state.employee.employeesList)
    const [filteredArray, setFilteredArray] = useState(employeeArray)
    const [sortedTableHeader, setSortedTableHeader] = useState(tableHeader)
    const [pageSize, sepageSize] = useState(10)
    const [pageNumber, sePageNumber] = useState(1)
    const [displayDropdown, setDisplayDropdown] = useState(false)
    const ref = useRef()

    function filterArray(searchValue) {
        let filteredArray = employeeArray.filter(element => {
            const vals = []
            Object.keys(element).forEach(key => {
                vals.push(element[key])
            })
            const filterProperties = vals.filter(element => element?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase()))

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
                        if (a[value].toLocaleLowerCase() > b[value].toLocaleLowerCase()) return 1;
                        if (a[value].toLocaleLowerCase() < b[value].toLocaleLowerCase()) return -1;
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
                        if (a[value].toLocaleLowerCase() < b[value].toLocaleLowerCase()) return 1;
                        if (a[value].toLocaleLowerCase() > b[value].toLocaleLowerCase()) return -1;
                        return 0;
                    });
                }
            }))
        }
        if (sortedTableHeader[index].sort === "desc") {
            setSortedTableHeader(produce((draft) => { draft[index].sort = "none" }))

            setFilteredArray(filteredArray)
        }
        sePageNumber(1)
    }

    function handlepageSizeClick(value) {
        sepageSize(value)
        setDisplayDropdown(!displayDropdown)
        sePageNumber(1)
    }

    function handleDropDown() {
        setDisplayDropdown(!displayDropdown)
    }

    function getPageNumbers() {
        let paginationArray = []
        for (let i = 1; i <= Math.ceil(filteredArray.length / pageSize); i++) {
            paginationArray.push(<div key={i} className={`number-not-active ${i === pageNumber ? "number-active" : ""}`} onClick={() => sePageNumber(i)}>{i}</div>)
        }
        return paginationArray
    }

    function getPreviousPage() {
        sePageNumber(pageNumber - 1)
    }

    function getNextPage() {
        sePageNumber(pageNumber + 1)
    }

    function getPaginationTo() {
        if (filteredArray.length === 0) {
            return 0
        }
        if (pageSize < filteredArray.length && pageNumber * pageSize < filteredArray.length) {
            return pageNumber * pageSize
        }
        return filteredArray.length
    }

    function getPaginationFrom() {
        if (filteredArray.length === 0) {
            return 0
        }
        return (pageNumber - 1) * pageSize + 1
    }

    function getEntriesNumber() {
        if (filteredArray.length === 0) {
            return 0
        }
        return filteredArray.length
    }


    return (
        <Fragment>
            <Header
                isActive={true}
            />
            <div id="employee-div" className="container">
                {employeeArray.length === 0 ?
                    <EmptyState />
                    :
                    <>
                        <div className="searchbar-container">
                            <div className="dataTables_length" id="employee-table_length">
                                <div className="pagesize-container">Show
                                    <div>
                                        <DropDown
                                            handleOptionClick={handlepageSizeClick}
                                            selectList={pageSizeConstant}
                                            displayDropdown={displayDropdown}
                                            label={pageSize}
                                            handleDropdown={handleDropDown}
                                            reference={ref}
                                            containerClassName="pagesize-dropdown__container"
                                            labelClassName="pagesize-dropdown"
                                        />
                                    </div> entries
                                </div>
                            </div>
                            <input type="search" placeholder="Search" className="searchbar" aria-controls="employee-table" onChange={e => filterArray(e.target.value)} />
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr className="table-header">
                                        {sortedTableHeader
                                            .map((column, i) => {
                                                return (
                                                    <th
                                                        key={`thead-th-${column.label}-${i}`}
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
                                        {filteredArray
                                            .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                                            .map((employee, i) => {
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
                            <div className="pagination-container">
                                <div>Showing {getPaginationFrom()} to {getPaginationTo()} of {getEntriesNumber()} entries</div>
                                <div className="dataTables_paginate paging_simple_numbers page-size-container" id="employee-table_paginate">
                                    <div className={`paginate_button previous disabled ${pageNumber < 2 ? "disabled-pagination" : ""}`} onClick={pageNumber > 1 ? getPreviousPage : null}>Previous</div>
                                    {getPageNumbers()}
                                    <div className={`paginate_button next disabled ${pageNumber === Math.ceil(filteredArray.length / pageSize) ? "disabled-pagination" : ""}`} onClick={pageNumber < Math.ceil(filteredArray.length / pageSize) ? getNextPage : null}>Next</div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </Fragment>
    )
}

export default EmployeeList;