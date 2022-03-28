import { employeeType } from "../Types/Types";
type employPropsType = {
  allemployees: employeeType[];
};
const Employees = (props: employPropsType) => {
  return (
    <div className="employee-container">
      {props.allemployees.map((employee) => {
        return (
          <div key={employee.id}>
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
