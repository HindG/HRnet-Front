import { Fragment, useState, useRef, useEffect } from "react"
import "./home.css"
// import { NpmModale } from "modale-hind08"

function Home() {
    const [displayDepartmentDropdown, setDisplayDepartmentDropdown] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState("Select Departement")
    const ref = useRef()

    function handleDepartmentDropdown() {
        setDisplayDepartmentDropdown(!displayDepartmentDropdown)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (displayDepartmentDropdown && ref.current && !ref.current.contains(e.target)) {
                setDisplayDepartmentDropdown(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [displayDepartmentDropdown])

    function handleOptionClick(value) {
       setSelectedDepartment(value)
       setDisplayDepartmentDropdown(false)

    }

    return (
        <Fragment>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container"></div>
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
                        <select name="state" id="state"></select>

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>
                    <label htmlFor="department">Department</label>
                    <div ref={ref}>
                        <div className="departement-dropdown padding-4" onClick={handleDepartmentDropdown}>{selectedDepartment}</div>
                        {displayDepartmentDropdown &&
                            <div className="departement-dropdown__container departement-dropdown">
                                <div className="departement-dropdown__option" onClick={() => handleOptionClick("Sales")}>Sales</div>
                                <div className="departement-dropdown__option" onClick={() => handleOptionClick("Marketing")}>Marketing</div>
                                <div className="departement-dropdown__option" onClick={() => handleOptionClick("Engineering")}>Engineering</div>
                                <div className="departement-dropdown__option" onClick={() => handleOptionClick("Human Resources")}>Human Resources</div>
                                <div className="departement-dropdown__option" onClick={() => handleOptionClick("Legal")}>Legal</div>
                            </div>
                        }
                    </div>
                    <select name="department" id="department">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                </form>

                <button>Save</button>
            </div>
            {/* <NpmModale /> */}
        </Fragment>
    )
}

export default Home;