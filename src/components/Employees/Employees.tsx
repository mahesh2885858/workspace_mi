import { Link } from "react-router-dom";
import { employeeType } from "../Types/Types";
type employPropsType = {
  allemployees: employeeType[];
  gotoEmployeePage: (e: string) => void;
};
const Employees = (props: employPropsType) => {
  return (
    <div className="employee-container">
      <Link to={`/addemploy`}>Add an employe</Link>
      {props.allemployees.map((employee) => {
        return (
          <div
            key={employee.id}
            onClick={() => props.gotoEmployeePage(employee.id)}
          >
            <p>{employee.name}</p>
            <div>
              skills:
              {employee.skills.map((skill) => {
                return (
                  <div key={skill.id}>
                    <p>{skill.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Employees;
