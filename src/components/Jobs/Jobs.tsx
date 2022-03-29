import { Link } from "react-router-dom";
import { jobsType } from "../Types/Types";
type propsType = {
  alljobs: jobsType[];
  getJob: (id: string) => void;
};
const Jobs = (props: propsType) => {
  return (
    <div className="jobs-container">
      <Link to={`/addjob`}>Add A Job</Link>
      {props.alljobs.map((job) => {
        return (
          <div
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
            <div>
              {job.assignedEmployeId === null ? (
                <p>Not assigned </p>
              ) : (
                <p>assigned to someone</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Jobs;
