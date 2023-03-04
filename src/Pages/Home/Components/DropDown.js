import arrowUp from "./arrow-up.png"
import arrowDown from "./arrow-down.png"

function DropDown(props) {

    return (
        <div ref={props.reference}>
            <div className="departement-dropdown padding-4" onClick={props.handleDropdown}>{props.label}
                {props.displayDropdown && <img src={arrowUp} alt="" className="departement-dropdown-img" />}
                {!props.displayDropdown && <img src={arrowDown} alt="" className="departement-dropdown-img" />}
            </div>
            {props.displayDropdown &&
                <div className="departement-dropdown__container departement-dropdown">
                    {props.selectList.map((list, i) => <div key={`dropdown-${props.label}-${i}`} className="departement-dropdown__option" onClick={() => props.handleOptionClick(list)}>{list}</div>)}
                </div>
            }
        </div>
    )
}

export default DropDown;