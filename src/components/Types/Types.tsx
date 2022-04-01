// types for our app

export type skillsType = {
  name: string;
  id: string;
};
export type jobsType = {
  nameOfTheJob: string;
  id: string;
  skillsRequired: skillsType[];
  isAssigned: boolean;
  assignedEmployeId: null | string;
  description: string;
};
export type employeeType = {
  name: string;
  id: string;
  skills: skillsType[];
  isAssignedJob: boolean;
  assignedJobId: null | string;
  experience: number;
};
// type definition for our state
export type appType = {
  jobs: jobsType[];
  employees: employeeType[];
  selectedEmploy: employeeType[];
  employeesWithMissingSkills: employeeType[];
  project: string;
  skills: skillsType[];
  employeeDetails: employeeType;
  jobDetails: jobsType;
  filterTextForEmployees: string;
  filterTextForJobs: string;
  searchText: string;
  filteredJobsArray: jobsType[];
  filteredEmployeeArray: employeeType[];
  filteredJobsBySkillsArray: jobsType[];
  isEditOn: boolean;
  editID: string;
  filteredJobsIds: string;
  employeesFilteredBySkills: employeeType[];
  filteredEmployeeId: string;
  isFilterBySkillsON: boolean;

  skillsRequiredForTheSelectedJOb: skillsType[];
};
