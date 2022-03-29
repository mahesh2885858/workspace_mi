import { AppState } from "../../App";

const assingTheJob = (employeId: string, state: typeof AppState) => {
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
