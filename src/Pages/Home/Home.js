import { Fragment, useState, useRef, useEffect } from "react"
import "./home.css"
import { Modale } from "modale-hind08"
import DropDown from "../../Components/DropDown/DropDown"
import stateList from "../../Constants/stateList.constant"
import departmentList from "../../Constants/departmentList.constant"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux'
import * as userActions from "../../Features/employee.slice"
import Header from "../../Components/Header/Header"
import ArrowLottie from "./arrow-up.json"
import { Player, Controls } from '@lottiefiles/react-lottie-player';

function Home() {
    const [displayDepartmentDropdown, setDisplayDepartmentDropdown] = useState(false)
    const [displayStateDropdown, setDisplayStateDropdown] = useState(false)
    const [displaySaveModal, setDisplaySaveModal] = useState(false)
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
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
            setDisplayErrorMessage(true)
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

    function scrollUp() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="form-container">
                    <h2 className="form-title">Create Employee</h2>
                    <form action="#" id="create-employee">
                        <input type="text" id="first-name" onChange={e => {
                            setFirstName(e.target.value)
                            setDisplayErrorMessage(false)
                        }
                        }
                            placeHolder="First Name"
                            value={firstName}
                            className="form-input"
                        />
                        <input type="text" id="last-name" onChange={e => {
                            setLastName(e.target.value)
                            setDisplayErrorMessage(false)
                        }
                        }
                            placeHolder="Last Name"
                            value={lastName}
                            className="form-input"
                        />
                        <DatePicker
                            selected={birthDate}
                            onChange={(date) => setBirthDate(date)}
                            placeholderText="Date of Birth"
                            className="form-input"
                        />
                        <div className="position-relative">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="Start Date"
                                className="form-input form-input-last"
                            />
                        </div>
                        <fieldset className="address">
                            <input
                                id="street"
                                type="text"
                                onChange={e => setStreet(e.target.value)}
                                value={street}
                                placeHolder="Street"
                                className="form-input form-input-address"
                            />
                            <input
                                id="city"
                                type="text"
                                onChange={e => setCity(e.target.value)}
                                value={city}
                                placeHolder="City"
                                className="form-input form-input-address"
                            />
                            <DropDown
                                handleOptionClick={handleStateOptionClick}
                                selectList={stateList}
                                displayDropdown={displayStateDropdown}
                                label={selectedState}
                                handleDropdown={handleStateDropDown}
                                reference={refState}
                                placeHolder="State form-input-address"
                            />
                            <input
                                id="zip-code"
                                type="number"
                                onChange={e => setZipCode(e.target.value)}
                                value={zipCode}
                                placeHolder="Zip Code"
                                className="form-input form-input-address form-input-last"
                            />
                        </fieldset>
                        <DropDown
                            handleOptionClick={handleDepartmentOptionClick}
                            selectList={departmentList}
                            displayDropdown={displayDepartmentDropdown}
                            label={selectedDepartment}
                            handleDropdown={handleDepartmentDropdown}
                            reference={refDep}
                            isDepartement
                        />
                    </form>
                    {displayErrorMessage && <span className="error-text">Firstname and lastname can't be empty</span>}
                    <button className="validation-btn" onClick={() => handleSave()}>Save</button>
                </div>
            </div>
            <div className="arrowlottie_container" onClick={() => scrollUp()}>
                <Player
                    autoplay
                    src={ArrowLottie}
                    style={{ height: '65px', width: '65px' }}
                >
                    <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                </Player>
            </div>
            {displaySaveModal && <Modale closeModal={() => setDisplaySaveModal(false)} />}
        </Fragment>
    )
}

export default Home;