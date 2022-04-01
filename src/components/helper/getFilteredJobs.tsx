import { appType } from "../Types/Types";

const getFilteredJobs = (state: appType) => {
  // creting temporary object array to make working easy
  if (state.filteredEmployeeId) {
    const tempObjArr: { name: string; id: string; idm: string }[] = [];
    const modififedObj = state.jobs.map((item) => {
      for (let i = 0; i < item.skillsRequired.length; i++) {
        const obj = item.skillsRequired[i];
        const newobj = { ...obj, idm: item.id };
        tempObjArr.push(newobj);
      }
      return;
    });
    const filteredIds = tempObjArr.filter((item) => {
      if (item.id === state.filteredEmployeeId) {
        return item.idm;
      }
    });

    const newJob = state.jobs.filter((job) => {
      for (let i = 0; i < filteredIds.length; i++) {
        if (job.id === filteredIds[i].idm) {
          return job;
        }
      }
    });
    return newJob;
  } else {
    return state.jobs;
  }
};
export default getFilteredJobs;
