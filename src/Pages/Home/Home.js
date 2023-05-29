import { Fragment, useState, useRef, useEffect } from "react"
import "./home.css"
import { Modale } from "modale-hind08"
import DropDown from "./Components/DropDown/DropDown"
import stateList from "../../Constants/stateList.constant"
import departmentList from "../../Constants/departmentList.constant"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import * as userActions from "../../Features/employee.slice"

function Home() {
    const [displayDepartmentDropdown, setDisplayDepartmentDropdown] = useState(false)
    const [displayStateDropdown, setDisplayStateDropdown] = useState(false)
    const [displaySaveModal, setDisplaySaveModal] = useState(false)
    const [displayErrorModal, setDisplayErrorModal] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState("Select Departement")
    const [selectedState, setSelectedState] = useState("Select State")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [startDate, setStartDate] = useState();
    const refState = useRef()
    const refDep = useRef()
    const dispatch = useDispatch();

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

    function handleSave() {
        if (firstName === "" || lastName === "") {
            setDisplayErrorModal(true)
        }
        else {
            const user = [
                firstName,
                lastName,
                startDate ? startDate.toLocaleDateString('en-us') : null,
                selectedDepartment !== "Select Departement" ? selectedDepartment : "",
                birthDate ? birthDate.toLocaleDateString('en-us') : null,
                street,
                city,
                selectedState !== "Select State" ? selectedState : "",
                zipCode,
            ]
            dispatch(userActions.create(user))
            setSelectedDepartment("Select Departement")
            setSelectedState("Select State")
            setFirstName("")
            setLastName("")
            setStreet("")
            setCity("")
            setZipCode("")
            setBirthDate()
            setStartDate()
            setDisplaySaveModal(true)
        }
    }

    return (
        <Fragment>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employee-list">View Current Employees</Link>
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" onChange={e => setFirstName(e.target.value)} value={firstName} />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" onChange={e => setLastName(e.target.value)} value={lastName} />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                        id="date-of-birth" />

                    <div className="position-relative">
                        <label htmlFor="start-date">Start Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            id="start-date" />
                    </div>

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" onChange={e => setStreet(e.target.value)} value={street} />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" onChange={e => setCity(e.target.value)} value={city} />

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
                        <input id="zip-code" type="number" onChange={e => setZipCode(e.target.value)} value={zipCode} />
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

                <button className="validation-btn" onClick={() => handleSave()}>Save</button>
            </div>
            {displaySaveModal && <Modale closeModal={() => setDisplaySaveModal(false)} />}
            {displayErrorModal && <div className="error-modal">
                <span className="error-modal-text">Firstname and lastname can't be empty</span>
                <button className="validation-btn" onClick={() => setDisplayErrorModal(false)}>Close</button>
            </div>}
        </Fragment>
    )
}

export default Home;