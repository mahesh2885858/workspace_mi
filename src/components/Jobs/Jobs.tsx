import { Link } from "react-router-dom";
import "./jobs.scss";
import { jobsType } from "../Types/Types";
type propsType = {
  alljobs: jobsType[];
  getJob: (id: string) => void;
};
const Jobs = (props: propsType) => {
  return (
    <div className="jobs-container">
      <Link to={`/addjob`}>Add A Job</Link>
      <div className="jobs-details">
        {props.alljobs.map((job) => {
          return (
            <div
              className="each-job"
              key={job.id}
              onClick={() => {
                props.getJob(job.id);
              }}
            >
              <p>{job.nameOfTheJob}</p>
              <span>Skill Required:</span>
              <div>
                {job.skillsRequired.map((item) => {
                  return <p key={item.id}>{item.name}</p>;
                })}
              </div>
              <div className="job-status">
                Status:
                <p
                  className={
                    job.isAssigned ? "job-assigned" : "job-not-assigned"
                  }
                >
                  {job.assignedEmployeId === null
                    ? "Not assigned"
                    : "assigned to someone"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
