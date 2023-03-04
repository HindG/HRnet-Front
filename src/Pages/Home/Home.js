import { Fragment, useState, useRef, useEffect } from "react"
import "./home.css"
import { Modale } from "modale-hind08"
import DropDown from "./Components/DropDown"

function Home() {
    const [displayDepartmentDropdown, setDisplayDepartmentDropdown] = useState(false)
    const [displayStateDropdown, setDisplayStateDropdown] = useState(false)
    const [displayModal, setdisplayModal] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState("Select Departement")
    const [selectedState, setSelectedState] = useState("Select State")
    const departmentList = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]
    const stateList =
        ["Alabama", "Alaska", "Arizona", "Arkansas", "California",
            "North Carolina", "South Carolina", "Colorado", "Connecticut", "North Dakota",
            "South Dakota", "Delaware", "Florida", "Georgia", "Hawaii",
            "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
            "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
            "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
            "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "Tennessee", "Texas", "Utah", "Vermont",
            "Virginia", "West Virginia", "Washington", "Wisconsin", "Wyoming"]
    const stateRef = useRef()
    const departmentRef = useRef()

    function handleDepartmentDropdown() {
        setDisplayDepartmentDropdown(!displayDepartmentDropdown)
    }

    function handleStateDropDown() {
        setDisplayStateDropdown(!displayStateDropdown)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (displayDepartmentDropdown && stateRef.current && !stateRef.current.contains(e.target)) {
                setDisplayDepartmentDropdown(false)
            }
            if (displayStateDropdown && departmentRef.current && !departmentRef.current.contains(e.target)) {
                setDisplayStateDropdown(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [displayDepartmentDropdown, displayStateDropdown])


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

                    <label htmlFor="start-date">Start Date</label>
                    <input id="start-date" type="text" />

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
                            reference={stateRef}
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
                        reference={departmentRef}
                    />
                </form>

                <button onClick={() => setdisplayModal(true)}>Save</button>
            </div>
            {displayModal && <Modale closeModal={() => setdisplayModal(false)} />}
        </Fragment>
    )
}

export default Home;