import { jobsType } from "../Types/Types";
const JobSource: jobsType[] = [
  {
    nameOfTheJob: "Password Manager",
    id: "pm123",
    isAssigned: false,
    assignedEmployeId: null,
    skillsRequired: [
      { name: "React", id: "RE123" },
      { name: "nodejs", id: "NDJ89" },
    ],
  },
  {
    nameOfTheJob: "Vue Blog",
    id: "vub123",
    isAssigned: false,
    assignedEmployeId: null,
    skillsRequired: [
      { name: "VueJs", id: "VU234" },
      { name: "nodejs", id: "NDJ89" },
    ],
  },
  {
    nameOfTheJob: "Data Entry Form",
    id: "def123",
    isAssigned: false,
    assignedEmployeId: null,
    skillsRequired: [
      { name: "React", id: "RE123" },
      { name: "NextJs", id: "NXT456" },
    ],
  },
];
export default JobSource;
