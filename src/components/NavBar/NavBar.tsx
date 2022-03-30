import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./navbar.scss";
const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-left">
        <Link to={`/`}>Home</Link>
      </div>
      <div className="nav-right">
        <Link to={`/search`}>
          <BsSearch />
        </Link>
        <Link to={`/jobs`}>Jobs</Link>
        <Link to={`/employees`}>Employees</Link>
        <Link to={`/assign`}>Assign Job</Link>
      </div>
    </div>
  );
};

export default NavBar;
