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
