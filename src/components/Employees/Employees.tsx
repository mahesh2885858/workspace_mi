import { Link } from "react-router-dom";
import { appType } from "../../App";
import "./employees.scss";
type employPropsType = {
  state: appType;
  gotoEmployeePage: (e: string) => void;
  onFilterTextChange: (e: string, field: string) => void;
};
//To show every employee and their status
const Employees = (props: employPropsType) => {
  return (
    <div className="employee-container">
      <div>
        <select
          onChange={(e) => props.onFilterTextChange(e.target.value, "employee")}
          value={props.state.filterText}
          name="filter"
          id="filter"
        >
          <option value="">filter by skills</option>
          {props.state.skills.map((skill) => {
            return (
              <option value={skill.id} key={skill.id}>
                {skill.name}
              </option>
            );
          })}
        </select>
        <Link to={`/addemploy`}>Add an employe</Link>
      </div>
      <div className="employee-details">
        {props.state.employeesWeUse.map((employee) => {
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
