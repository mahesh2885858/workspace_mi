import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { appType } from "../Types/Types";
import "./employeedetails.scss";
type propsType = {
  state: appType;
  deleteEmployee?: (id: string) => void;
  goToJobDetails?: (id: string) => void;
};
const EmployeeDetails = (props: propsType) => {
  const { id } = useParams();

  if (id) {
    const employeefromId = props.state.employees.filter(
      (employee) => employee.id === id
    );
    // checking whether the employee with the id we recieve from the url exist or not
    if (employeefromId.length > 0) {
      // getting the job that is assigned to the employee whose id we recieved from url
      const jobassigned = () => {
        if (employeefromId[0].isAssignedJob) {
          const job = props.state.jobs.filter(
            (item) => item.id === employeefromId[0].assignedJobId
          );
          return job;
        } else {
          return;
        }
      };
      const job = jobassigned();
      return (
        <div className="employee-details-container">
          <h1>Employee Details</h1>
          {employeefromId.map((info) => {
            return (
              <div className="employee-details" key={info.id}>
                <p className="employee-details-name">Name : {info.name}</p>
                <div>
                  skilss:
                  {info.skills.map((skill) => {
                    return <p key={skill.id}>{skill.name}</p>;
                  })}
                </div>
                <span>
                  expierence: {info.experience}
                  {info.experience > 1 ? "Years" : "Year"}{" "}
                </span>
                <p className="employee-details-status">
                  working Project:
                  <span
                    onClick={() => props.goToJobDetails!(job![0].id)}
                    className={info.isAssignedJob ? "active" : "red"}
                  >
                    {info.isAssignedJob ? job![0].nameOfTheJob : "not assigned"}
                  </span>
                </p>
                <Link to={`/employee/edit/${info.id}`}>
                  Edit Employee Details
                </Link>
                <button onClick={() => props.deleteEmployee!(info.id)}>
                  Delete Employee
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          no empolyee found go to <Link to={`/`}>Home</Link>{" "}
        </div>
      );
    }
  } else {
    return (
      <div>
        no id found go to <Link to={`/`}>Home</Link>
      </div>
    );
  }
};

export default EmployeeDetails;
