import { Link } from "react-router-dom";
import { employeeType } from "../Types/Types";
import "./employees.scss";
type employPropsType = {
  allemployees: employeeType[];
  gotoEmployeePage: (e: string) => void;
};
const Employees = (props: employPropsType) => {
  return (
    <div className="employee-container">
      <Link to={`/addemploy`}>Add an employe</Link>
      <div className="employee-details">
        {props.allemployees.map((employee) => {
          return (
            <div
              className="each-employee"
              key={employee.id}
              onClick={() => props.gotoEmployeePage(employee.id)}
            >
              <p className="employee-name">{employee.name}</p>

              <div className="employee-status">
                status:
                <p
                  className={employee.isAssignedJob ? "working" : "notworking"}
                >
                  {employee.isAssignedJob ? "Project Assigned" : "Not assigned"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Employees;
