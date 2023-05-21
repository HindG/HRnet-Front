import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function DropDown(props) {

    return (
        <div ref={props.reference}>
            <div className="departement-dropdown" onClick={props.handleDropdown}>{props.label}
                {props.displayDropdown && <ArrowDropUpIcon className="departement-dropdown-img" />}
                {!props.displayDropdown && <ArrowDropDownIcon className="departement-dropdown-img" />}
            </div>
            {props.displayDropdown &&
                <div className={`dropdown__container departement-dropdown ${props.isDepartement ? "departement-dropdown__container" : ""}`}>
                    {props.selectList.map((list, i) => <div key={`dropdown-${props.label}-${i}`} className="departement-dropdown__option" onClick={() => props.handleOptionClick(list)}>{list}</div>)}
                </div>
            }
        </div>
    )
}

export default DropDown;