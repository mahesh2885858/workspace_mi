import { AppState } from "../../App";

const DashBoard = (props: typeof AppState) => {
  const jobsassined = props.employees.filter(
    (item) => item.isAssignedJob === true
  );

  return (
    <div className="dashboard-container">
      <h1>DashBoard</h1>

      {jobsassined.length > 0 ? (
        props.employees.map((employee) => {
          if (employee.isAssignedJob) {
            return (
              <div key={employee.id}>
                <p>{employee.name}</p>
                <p>{employee.assignedJobId}</p>
              </div>
            );
          }
        })
      ) : (
        <div>currently no jobs are assigned to emploees</div>
      )}
    </div>
  );
};

export default DashBoard;
