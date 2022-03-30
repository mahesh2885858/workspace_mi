import { AppState } from "../../App";

const helpToGetTheSkilledEmployees = (data: string, state: typeof AppState) => {
  const unAssignedJobs = state.jobs.filter((job) => job.isAssigned === false);
  const SelectedJob = unAssignedJobs.filter((job) => job.id === data);
  const requiredSkillsArray =
    SelectedJob.length > 0
      ? SelectedJob[0].skillsRequired.map((item) => item.id)
      : undefined;
  const eS = state.employees.map((item) => {
    const skills = item.skills.map((skill) => skill.id);
    return { id: item.id, skills };
  });
  const usersId = eS.filter((user) => {
    if (requiredSkillsArray) {
      if (
        requiredSkillsArray.every((value) => user.skills.indexOf(value) >= 0)
      ) {
        return user.id;
      }
    }
  });
  const filteredEmployees = state.employees.filter((employ) => {
    for (let i = 0; i < usersId.length; i++) {
      if (employ.id === usersId[i].id) {
        return employ;
      }
    }
  });
  return filteredEmployees;
};
export default helpToGetTheSkilledEmployees;
