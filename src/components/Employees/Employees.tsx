import { Link } from "react-router-dom";
import { useEffect } from "react";
import { appType } from "../../App";
import "./employees.scss";
type employPropsType = {
  state: appType;
  gotoEmployeePage: (e: string) => void;
  onFilterTextChange: (e: string, field: string) => void;
  clearFilters: () => void;
};
//To show every employee and their status
const Employees = (props: employPropsType) => {
  // to filter through the employees
  const employeesToDisplay = props.state.isFilterBySkillsON
    ? props.state.employeesFilteredBySkills
    : props.state.employees;
  useEffect(() => {
    props.clearFilters();
  }, []);
  return (
    <div className="employee-container">
      <div>
        <select
          onChange={(e) => props.onFilterTextChange(e.target.value, "employee")}
          value={props.state.filterTextForEmployees}
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
        {employeesToDisplay.map((employee) => {
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
