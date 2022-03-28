import { jobsType } from "../Types/Types";
type propsType = {
  alljobs: jobsType[];
};
const Jobs = (props: propsType) => {
  return (
    <div className="jobs-container">
      {props.alljobs.map((job) => {
        return (
          <div key={job.id}>
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
