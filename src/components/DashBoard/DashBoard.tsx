import { appType } from "../Types/Types";
import "./dashboard.scss";
type propsType = {
  state: appType;
  gotoEmployeePage: (id: string) => void;
  goToJobDetails: (id: string) => void;
};
const DashBoard = (props: propsType) => {
  // we want to show all assigned jobs on home page
  const jobsassined = props.state.employees.filter(
    (item) => item.isAssignedJob === true
  );
  // making an object which includes employees to which jobs are assigned,and id,names of each job and employee to which its assigned
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
        {/* checking whethere the assigned jobs are present or not  */}
        {jobsassined.length > 0 ? (
          dashBoardObject.map((employee) => {
            return (
              <div
                className="assigned-jobs-dashboard"
                key={employee.idOfTheEmployee}
              >
                <p>
                  Employee Name:
                  <span
                    onClick={() =>
                      props.gotoEmployeePage(employee.idOfTheEmployee)
                    }
                  >
                    {employee.nameOfTheEmployee}
                  </span>
                </p>
                <p>
                  Projectassigned:
                  <span
                    onClick={() => props.goToJobDetails(employee.idOfTheJob)}
                  >
                    {employee.nameOfTheJob}
                  </span>
                </p>
              </div>
            );
          })
        ) : (
          // if there are no jobs assigned to anyone we show the below element
          <div className="no-assigned-jobs">
            currently no jobs are assigned to emploees
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
