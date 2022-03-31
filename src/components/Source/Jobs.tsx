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
    description:
      "Create a webapp where user can store their passwords for different sites",
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
    description: "Create a Blog using Vue js",
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
    description:
      "A data entry form which contains different fields about the data we need",
  },
  {
    nameOfTheJob: "Workspace Management UI",
    id: "wspmui125",
    isAssigned: false,
    assignedEmployeId: null,
    skillsRequired: [
      { name: "React", id: "RE123" },
      { name: "TypeScript", id: "TPSCPT1156123" },
    ],
    description: "Create a user interface for admin manage the workspace",
  },
  {
    nameOfTheJob: "Currency Converter",
    id: "ccnverte234",
    isAssigned: false,
    assignedEmployeId: null,
    skillsRequired: [
      { name: "NextJs", id: "NXT456" },
      { name: "React", id: "RE123" },
      { name: "TypeScript", id: "TPSCPT1156123" },
    ],
    description: "Create a user interface for admin manage the workspace",
  },
];
export default JobSource;
