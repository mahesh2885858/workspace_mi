import { appType } from "../Types/Types";
import { skillsType } from "../Types/Types";

// To get the skills required for job we selected while assigning a job
const getSkillsRequired = (state: appType, id: string) => {
  const selectedProject = state.jobs.filter((job) => job.id === id);
  let skills: skillsType[] = [];
  if (selectedProject.length > 0) {
    skills = selectedProject[0].skillsRequired.map((skill) => skill);
  }
  return skills;
};
export default getSkillsRequired;
