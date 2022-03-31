import { Link } from "react-router-dom";
import "./jobs.scss";
import { appType } from "../../App";
import { useEffect } from "react";
type propsType = {
  state: appType;
  getJob: (id: string) => void;
  onFilterTextChange: (data: string, field: string) => void;
  clearFilters: () => void;
};
//  To show all the jobs and their status
const Jobs = (props: propsType) => {
  //  this will be used when we want to  use filter through jobs
  const jobsToDisplay = props.state.isFilterBySkillsON
    ? props.state.filteredJobsBySkillsArray
    : props.state.jobs;
  useEffect(() => {
    props.clearFilters();
  }, []);
  return (
    <div className="jobs-container">
      <div>
        <select
          onChange={(e) => props.onFilterTextChange(e.target.value, "jobs")}
          value={props.state.filterTextForJobs}
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
        <Link to={`/addjob`}>Add A Job</Link>
      </div>

      <div className="jobs-details">
        {jobsToDisplay.map((job) => {
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
