import { AppState } from "../../App";
type propsType = {
  state: typeof AppState;
  gotoEmployeePage: (id: string) => void;
  goToJobDetails: (id: string) => void;
};
const DashBoard = (props: propsType) => {
  const jobsassined = props.state.employees.filter(
    (item) => item.isAssignedJob === true
  );
  const newObj = jobsassined.map((item) => {
    const itemname = props.state.jobs.filter(
      (job) => job.id === item.assignedJobId
    );
    return {
      nameofjob: itemname[0].nameOfTheJob,
      idofthejob: itemname[0].id,
      nameoftheemloy: item.name,
      idoftheemployee: item.id,
    };
  });
  console.log(newObj);

  return (
    <div className="dashboard-container">
      <h1>DashBoard</h1>

      {jobsassined.length > 0 ? (
        newObj.map((employee) => {
          return (
            <div key={employee.idoftheemployee}>
              <p
                onClick={() => props.gotoEmployeePage(employee.idoftheemployee)}
              >
                {employee.nameoftheemloy}
              </p>
              <p onClick={() => props.goToJobDetails(employee.idofthejob)}>
                {employee.nameofjob}
              </p>
            </div>
          );
        })
      ) : (
        <div>currently no jobs are assigned to emploees</div>
      )}
    </div>
  );
};

export default DashBoard;
