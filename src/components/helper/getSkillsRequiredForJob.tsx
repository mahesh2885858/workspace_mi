import { AppState } from "../../App";
import { skillsType } from "../Types/Types";

const getSkillsRequired = (state: typeof AppState, id: string) => {
  const selectedProject = state.jobs.filter((job) => job.id === id);
  let skills: skillsType[] = [];
  if (selectedProject.length > 0) {
    skills = selectedProject[0].skillsRequired.map((skill) => skill);
  }
  return skills;
};
export default getSkillsRequired;
