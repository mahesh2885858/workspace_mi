import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { appType } from "../../App";
import "./jobdetails.scss";
type propsType = {
  state: appType;
  deleteJob?: (id: string) => void;
  gotoEmployeePage?: (id: string) => void;
};
const JobDetails = (props: propsType) => {
  const { id } = useParams();
  // making sure that we recieve an id from url parameters
  if (id) {
    const jobFromId = props.state.filteredJobsBySkillsArray.filter(
      (job) => job.id === id
    );
    // making sure that a job exist for the id we recieved from the url paramenters
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
              <div className="job-details" key={job.id}>
                <p className="job-details-name">
                  Name of the Job : {job.nameOfTheJob}
                </p>
                <div>
                  skills Required For the Job:
                  {job.skillsRequired.map((skill) => {
                    return <li key={skill.id}>{skill.name}</li>;
                  })}
                </div>
                <p>
                  status:
                  {job.isAssigned ? (
                    <span
                      onClick={() =>
                        props.gotoEmployeePage!(employeeForTheJob![0].id)
                      }
                    >
                      {" "}
                      Job Assiged to {employeeForTheJob![0].name}
                    </span>
                  ) : (
                    "it's not Assigned"
                  )}
                </p>
                <div>
                  <p>{job.description}</p>
                </div>
                <Link to={`/job/edit/${job.id}`}>Edit</Link>
                <button onClick={() => props.deleteJob!(job.id)}>Delete</button>
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
