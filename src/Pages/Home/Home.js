import { Fragment, useState, useRef, useEffect } from "react"
import "./home.css"
import { Modale } from "modale-hind08"
import DropDown from "./Components/DropDown/DropDown"
import stateList from "../../Constants/stateList.constant"
import departmentList from "../../Constants/departmentList"

function Home() {
    const [displayDepartmentDropdown, setDisplayDepartmentDropdown] = useState(false)
    const [displayStateDropdown, setDisplayStateDropdown] = useState(false)
    const [displaySaveModal, setDisplaySaveModal] = useState(false)
    const [displayCalendarModal, setDisplayCalendarModal] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState("Select Departement")
    const [selectedState, setSelectedState] = useState("Select State")
    const refState = useRef()
    const refDep = useRef()

    function handleDepartmentDropdown() {
        setDisplayDepartmentDropdown(!displayDepartmentDropdown)
        setDisplayStateDropdown(false)
    }

    function handleStateDropDown() {
        setDisplayStateDropdown(!displayStateDropdown)
        setDisplayDepartmentDropdown(false)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (refState.current && !refState.current.contains(e.target)) {
                setDisplayStateDropdown(false)
            }

            if (refDep.current && !refDep.current.contains(e.target)) {
                setDisplayDepartmentDropdown(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    })


    function handleDepartmentOptionClick(value) {
        setSelectedDepartment(value)
        setDisplayDepartmentDropdown(false)
    }

    function handleStateOptionClick(value) {
        setSelectedState(value)
        setDisplayStateDropdown(false)
    }

    return (
        <Fragment>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                View Current Employees
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input id="date-of-birth" type="text" />

                    <div className="position-relative">
                        <label htmlFor="start-date">Start Date</label>
                        <input id="start-date" type="text" onClick={() => setDisplayCalendarModal(!displayCalendarModal)} />
                        {displayCalendarModal && <div />}
                    </div>

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />

                        <label htmlFor="state">State</label>
                        <DropDown
                            handleOptionClick={handleStateOptionClick}
                            selectList={stateList}
                            displayDropdown={displayStateDropdown}
                            label={selectedState}
                            handleDropdown={handleStateDropDown}
                            reference={refState}
                        />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>
                    <label htmlFor="department">Department</label>
                    <DropDown
                        handleOptionClick={handleDepartmentOptionClick}
                        selectList={departmentList}
                        displayDropdown={displayDepartmentDropdown}
                        label={selectedDepartment}
                        handleDropdown={handleDepartmentDropdown}
                        reference={refDep}
                    />
                </form>

                <button onClick={() => setDisplaySaveModal(true)}>Save</button>
            </div>
            {displaySaveModal && <Modale closeModal={() => setDisplaySaveModal(false)} />}
        </Fragment>
    )
}

export default Home;