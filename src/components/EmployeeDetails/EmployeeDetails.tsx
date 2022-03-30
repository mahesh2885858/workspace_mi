import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
type propsType = {
  state: typeof AppState;
  deleteEmployee?: (id: string) => void;
};
const EmployeeDetails = (props: propsType) => {
  const { id } = useParams();

  if (id) {
    const employeefromId = props.state.employees.filter(
      (employee) => employee.id === id
    );
    if (employeefromId.length > 0) {
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
      console.log(job);
      return (
        <div>
          <h1>Employee Details</h1>
          {employeefromId.map((info) => {
            return (
              <div key={info.id}>
                <p>{info.name}</p>
                <div>
                  skilss:
                  {info.skills.map((skill) => {
                    return <p key={skill.id}>{skill.name}</p>;
                  })}
                </div>
                <span>expierence:{info.experience}</span>
                <p>
                  status:
                  {info.isAssignedJob ? job![0].nameOfTheJob : "not assigned"}
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
