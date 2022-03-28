import { employeeType } from "../Types/Types";
const EmployeeSource: employeeType[] = [
  {
    name: "mahesh",
    id: "mah123",
    skills: [
      { name: "React", id: "RE123" },
      { name: "NodeJs", id: "NDJ89" },
    ],
    isAssignedJob: false,
    assignedJobId: null,
    experience: 2,
  },
  {
    name: "karthik",
    id: "kar123",
    skills: [
      { name: "React", id: "RE123" },
      { name: "NextJs", id: "NXT456" },
    ],
    isAssignedJob: false,
    assignedJobId: null,
    experience: 5,
  },
  {
    name: "Suresh",
    id: "sur123",
    skills: [
      { name: "VueJs", id: "VU234" },
      { name: "NodeJs", id: "NDJ89" },
    ],
    isAssignedJob: false,
    assignedJobId: null,
    experience: 1,
  },
  {
    name: "harish",
    id: "har123",
    skills: [
      { name: "VueJs", id: "VU234" },
      { name: "NodeJs", id: "NDJ89" },
    ],
    isAssignedJob: false,
    assignedJobId: null,
    experience: 1,
  },
];
export default EmployeeSource;
