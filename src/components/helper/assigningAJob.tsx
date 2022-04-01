import { appType } from "../Types/Types";
//  to assign the job to an employee whose id we recieved as an argument
const assingTheJob = (employeId: string, state: appType) => {
  // getting the new Employees after assigning the job
  const newEmployees = state.employees.map((employ) => {
    if (employ.id === employeId) {
      return {
        ...employ,
        assignedJobId: state.project,
        isAssignedJob: true,
      };
    } else {
      return employ;
    }
  });
  // getting the new Jobs after assigning the selected job to an employee

  const newJobs = state.jobs.map((job) => {
    if (job.id === state.project) {
      return {
        ...job,
        isAssigned: true,
        assignedEmployeId: employeId,
      };
    } else {
      return job;
    }
  });
  return { newEmployees, newJobs };
};
export default assingTheJob;
