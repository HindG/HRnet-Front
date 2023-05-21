import Logo from "../../../src/img/logo-hrnet.png"
import "./header.css"
import { Link } from "react-router-dom";

function Header(props) {
    const titleLinkClassName = props.isActive ? "" : "text-decoration-none"

    return (
        <div className="header-container">
            <Link to="/"><img src={Logo} alt="HRnet-logo" className="header-logo" /></Link>
            <Link to="/employee-list" className={titleLinkClassName}><h3 className="header-title">Employees</h3></Link>
        </div>
    )
}

export default Header;