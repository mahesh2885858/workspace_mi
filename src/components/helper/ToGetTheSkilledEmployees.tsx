import { appType } from "../../App";
// after selecting a job to assign from assign page we want to show how many employees we have that mathces the required skills for selected job whose id we recieved from arguments.
// and also getting the employees who are missing required skills for the selected job.
const helpToGetTheSkilledEmployees = (data: string, state: appType) => {
  const unAssignedJobs = state.jobs.filter((job) => job.isAssigned === false);
  const SelectedJob = unAssignedJobs.filter((job) => job.id === data);
  const requiredSkillsArray =
    SelectedJob.length > 0
      ? SelectedJob[0].skillsRequired.map((item) => item.id)
      : undefined;
  // to get an array of objects  which contains each employee id and  thier skills
  const eS = state.employees.map((item) => {
    const skills = item.skills.map((skill) => skill.id);
    return { id: item.id, skills };
  });
  // getting the employee ids whose skills are matched with the required skills for the selected job
  const usersId = eS.filter((user) => {
    if (requiredSkillsArray) {
      if (
        requiredSkillsArray.every((value) => user.skills.indexOf(value) >= 0)
      ) {
        return user.id;
      }
    }
  });
  // getting the employees mathced with skill set required
  const filteredEmployeesWithSkills = state.employees.filter((employ) => {
    for (let i = 0; i < usersId.length; i++) {
      if (employ.id === usersId[i].id) {
        return employ;
      }
    }
  });
  // getting the employees who are missing the required skills for the job
  const filteredEmployeesWithMissingSkills = state.employees.filter(
    (employ) => {
      if (usersId.length > 0) {
        for (let i = 0; i < usersId.length; i++) {
          if (employ.id !== usersId[i].id) {
            return employ;
          }
        }
      } else {
        return employ;
      }
    }
  );
  return { filteredEmployeesWithSkills, filteredEmployeesWithMissingSkills };
};
export default helpToGetTheSkilledEmployees;
