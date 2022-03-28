import { AppState } from "../../App";

const helpToGetTheSkilledEmployees = (data: string, state: typeof AppState) => {
  const unAssignedJobs = state.jobs.filter((job) => job.isAssigned === false);
  const SelectedJob = unAssignedJobs.filter((job) => job.id === data);
  const requiredSkillsArray = SelectedJob[0].skillsRequired.map(
    (item) => item.id
  );
  const eS = state.employees.map((item) => {
    return { id: item.id, skills: item.skills.map((skill) => skill.id) };
  });
};
export default helpToGetTheSkilledEmployees;
