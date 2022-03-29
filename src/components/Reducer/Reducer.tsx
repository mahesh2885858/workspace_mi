import { AppState } from "../../App";
import assingTheJob from "../helper/assigningAJob";
import { v4 as uuid } from "uuid";
import helpToGetTheSkilledEmployees from "../helper/ToGetTheSkilledEmployees";
type actionType = {
  type: string;
  payload: string;
  field?: string;
};
const Reducer = (
  state: typeof AppState,
  action: actionType
): typeof AppState => {
  switch (action.type) {
    case "SELECT_JOB":
      console.log(action.payload);
      return { ...state, project: action.payload };
    case "GET_SKILLED_EMPLOYES":
      const result = helpToGetTheSkilledEmployees(action.payload, state);

      return { ...state, selectedEmploy: result };
    case "ASSIGN_PROJECT":
      console.log(action.payload);
      const changedState = assingTheJob(action.payload, state);
      const newSelectedEmploy = state.selectedEmploy.filter((employee) => {
        if (employee.id === action.payload) {
          return employee;
        }
      });
      const assignedEmployee = newSelectedEmploy.map((employee) => {
        return { ...employee, isAssignedJob: true };
      });
      return {
        ...state,
        jobs: changedState.newJobs,
        employees: changedState.newEmployees,
        selectedEmploy: assignedEmployee,
      };

    case "EMPLOYEE_DETAILS_INPUT":
      if (action.field === "name") {
        return {
          ...state,
          employeeDetails: {
            ...state.employeeDetails,
            name: action.payload,
          },
        };
      } else {
        return {
          ...state,
          employeeDetails: {
            ...state.employeeDetails,
            experience: parseInt(action.payload),
          },
        };
      }

    case "ADD_SKILL_TO_EMPLOYEE":
      const obj = state.skills.filter((skill) => {
        if (skill.id === action.payload) {
          return skill;
        } else {
          return;
        }
      });
      if (!(state.employeeDetails.skills.indexOf(obj[0]) >= 0)) {
        return {
          ...state,
          employeeDetails: {
            ...state.employeeDetails,
            skills: [...state.employeeDetails.skills, obj[0]],
          },
        };
      } else {
        return state;
      }

    case "REMOVE_SKILL":
      const newSkillset = state.employeeDetails.skills.filter((skill) => {
        if (skill) {
          if (skill.id !== action.payload) {
            return skill;
          } else {
            return;
          }
        } else {
          return;
        }
      });

      return {
        ...state,
        employeeDetails: { ...state.employeeDetails, skills: newSkillset },
      };
    case "ADD_EMPLOYEE":
      if (
        state.employeeDetails.name &&
        state.employeeDetails.skills.length > 0
      ) {
        const newEmployee = { ...state.employeeDetails, id: uuid() };
        return {
          ...state,
          employees: [...state.employees, newEmployee],
          employeeDetails: {
            ...state.employeeDetails,
            name: "",
            id: "",
            experience: 0,
            skills: [],
          },
        };
      } else {
        return state;
      }
    case "SELECT_SKILLS_FOR_JOB":
      const job = state.skills.filter((skill) => {
        if (skill.id === action.payload) {
          return skill;
        } else {
          return;
        }
      });
      if (!(state.jobDetails.skillsRequired.indexOf(job[0]) >= 0)) {
        return {
          ...state,
          jobDetails: {
            ...state.jobDetails,
            skillsRequired: [...state.jobDetails.skillsRequired, job[0]],
          },
        };
      } else {
        return state;
      }
    case "REMOVE_SKILL_FROM_JOB":
      const newSkills = state.jobDetails.skillsRequired.filter((skill) => {
        if (skill) {
          if (skill.id !== action.payload) {
            return skill;
          } else {
            return;
          }
        } else {
          return;
        }
      });

      return {
        ...state,
        jobDetails: { ...state.jobDetails, skillsRequired: newSkills },
      };
    case "JOB_DETAILS_INPUT":
      if (action.field === "name") {
        return {
          ...state,
          jobDetails: {
            ...state.jobDetails,
            nameOfTheJob: action.payload,
          },
        };
      } else {
        return {
          ...state,
          jobDetails: {
            ...state.jobDetails,
            description: action.payload,
          },
        };
      }
    case "ADD_JOB":
      if (
        state.jobDetails.nameOfTheJob &&
        state.jobDetails.skillsRequired.length > 0
      ) {
        const newJob = { ...state.jobDetails, id: uuid() };
        return {
          ...state,
          jobs: [...state.jobs, newJob],
          jobDetails: {
            ...state.jobDetails,
            nameOfTheJob: "",
            id: "",
            description: "",
            skillsRequired: [],
          },
        };
      } else {
        return state;
      }
    case "SEARCH_INPUT":
      const filteredEmployees = state.employees.filter((employee) => {
        if (
          state.filterText &&
          employee.name.toLowerCase().includes(state.filterText)
        ) {
          return employee;
        }
      });
      const filteredJobs = state.jobs.filter((job) => {
        if (
          state.filterText &&
          job.nameOfTheJob.toLowerCase().includes(state.filterText)
        ) {
          return job;
        }
      });

      return {
        ...state,
        filteredJobsArray: filteredJobs,
        filteredEmployeeArray: filteredEmployees,
      };
    case "CHANGE_SEARCH_INPUT":
      return { ...state, filterText: action.payload };
    default:
      return state;
  }
};
export default Reducer;
