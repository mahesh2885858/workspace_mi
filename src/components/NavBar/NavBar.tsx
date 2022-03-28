import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-left">
        <Link to={`/`}>Home</Link>
      </div>
      <div className="nav-right">
        <Link to={`/jobs`}>Jobs</Link>

        <Link to={`/employees`}>Employees</Link>
        <Link to={`/assign`}>Assign Job</Link>
      </div>
    </div>
  );
};

export default NavBar;
