import { AppState } from "../../App";
import "./dashboard.scss";
type propsType = {
  state: typeof AppState;
  gotoEmployeePage: (id: string) => void;
  goToJobDetails: (id: string) => void;
};
const DashBoard = (props: propsType) => {
  const jobsassined = props.state.employees.filter(
    (item) => item.isAssignedJob === true
  );
  const dashBoardObject = jobsassined.map((item) => {
    const itemname = props.state.jobs.filter(
      (job) => job.id === item.assignedJobId
    );
    return {
      nameOfTheJob: itemname[0].nameOfTheJob,
      idOfTheJob: itemname[0].id,
      nameOfTheEmployee: item.name,
      idOfTheEmployee: item.id,
    };
  });

  return (
    <div className="dashboard-container">
      <h1>DashBoard</h1>
      <div>
        {jobsassined.length > 0 ? (
          dashBoardObject.map((employee) => {
            return (
              <div
                className="assigned-jobs-dashboard"
                key={employee.idOfTheEmployee}
              >
                <p
                  onClick={() =>
                    props.gotoEmployeePage(employee.idOfTheEmployee)
                  }
                >
                  Employee Name: {employee.nameOfTheEmployee}
                </p>
                <p onClick={() => props.goToJobDetails(employee.idOfTheJob)}>
                  Projectassigned: {employee.nameOfTheJob}
                </p>
              </div>
            );
          })
        ) : (
          <div className="no-assigned-jobs">
            currently no jobs are assigned to emploees
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
