import { Link } from "react-router-dom";
import "./jobs.scss";
import { appType } from "../../App";
type propsType = {
  state: appType;
  getJob: (id: string) => void;
  onFilterTextChange: (data: string, field: string) => void;
};
//  To show all the jobs and their status
const Jobs = (props: propsType) => {
  return (
    <div className="jobs-container">
      <div>
        <select
          onChange={(e) => props.onFilterTextChange(e.target.value, "jobs")}
          value={props.state.filterText}
        >
          <option value="">select</option>
          {props.state.skills.map((skill) => {
            return (
              <option value={skill.id} key={skill.id}>
                {skill.name}
              </option>
            );
          })}
        </select>
        <Link to={`/addjob`}>Add A Job</Link>
      </div>

      <div className="jobs-details">
        {props.state.filteredJobsBySkillsArray.map((job) => {
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
