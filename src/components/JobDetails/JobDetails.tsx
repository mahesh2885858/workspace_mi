import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
type propsType = {
  state: typeof AppState;
};
const JobDetails = (props: propsType) => {
  const { id } = useParams();
  if (id) {
    const jobFromId = props.state.jobs.filter((job) => job.id === id);
    if (jobFromId.length > 0) {
      const getEmployee = () => {
        if (jobFromId[0].isAssigned) {
          const employ = props.state.employees.filter(
            (employee) => employee.id === jobFromId[0].assignedEmployeId
          );
          return employ;
        } else {
          return;
        }
      };
      const employeeForTheJob = getEmployee();
      return (
        <div className="job-details-container">
          {jobFromId.map((job) => {
            return (
              <div key={job.id}>
                <p>Name of the Job : {job.nameOfTheJob}</p>
                <div>
                  skills Required For the Job:
                  {job.skillsRequired.map((skill) => {
                    return <li key={skill.id}>{skill.name}</li>;
                  })}
                </div>
                <p>
                  status:
                  {job.isAssigned
                    ? employeeForTheJob![0].name
                    : "it's not Assigned"}
                </p>
                <div>
                  <p>{job.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          no job found go to <Link to={`/`}>Home</Link>
        </div>
      );
    }
  } else {
    return (
      <div>
        invalid Request go to <Link to={`/`}>Home</Link>
      </div>
    );
  }
};

export default JobDetails;
