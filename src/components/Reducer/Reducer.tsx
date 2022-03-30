import { AppState } from "../../App";
import assingTheJob from "../helper/assigningAJob";
import { v4 as uuid } from "uuid";
import helpToGetTheSkilledEmployees from "../helper/ToGetTheSkilledEmployees";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import getSkillsRequired from "../helper/getSkillsRequiredForJob";
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
      return { ...state, project: action.payload };
    case "GET_SKILLED_EMPLOYES":
      const skillsRequired = getSkillsRequired(state, action.payload);
      const result = helpToGetTheSkilledEmployees(action.payload, state);

      return {
        ...state,
        selectedEmploy: result,
        skillsRequiredForTheSelectedJOb: skillsRequired,
      };
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
      console.log(obj);
      console.log(state.employeeDetails.skills);
      console.log(state.employeeDetails.skills.indexOf(obj[0]) >= 0);
      if (!(state.employeeDetails.skills.indexOf(obj[0]) >= 0)) {
        console.log("first");
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
      if (!state.isEditOn) {
        if (
          state.employeeDetails.name.trim().length > 0 &&
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
      } else {
        const employeesAfterEdit = state.employees.map((employee) => {
          if (employee.id === state.editID) {
            return {
              ...employee,
              ...state.employeeDetails,
              employeeDetails: {
                ...state.employeeDetails,
                name: "",
                id: "",
                experience: 0,
                skills: [],
              },
            };
          } else {
            return employee;
          }
        });
        return {
          ...state,
          editID: "",
          employees: employeesAfterEdit,
          isEditOn: false,
        };
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
      if (!state.isEditOn) {
        if (
          state.jobDetails.nameOfTheJob.trim().length > 0 &&
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
      } else {
        const jobsAfterEditing = state.jobs.map((job) => {
          if (job.id === state.editID) {
            return { ...job, ...state.jobDetails };
          } else {
            return job;
          }
        });
        return {
          ...state,
          jobs: jobsAfterEditing,
          jobDetails: {
            ...state.jobDetails,
            description: "",
            nameOfTheJob: "",
            id: "",
            skillsRequired: [],
          },
          editID: "",
          isEditOn: false,
        };
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
    case "SET_EMPLOYEE_INPUTS":
      const Semployee = state.employees.filter((employee) => {
        if (employee.id === action.payload) {
          return employee;
        }
      });
      if (Semployee.length > 0) {
        return {
          ...state,
          isEditOn: true,
          editID: action.payload,
          employeeDetails: {
            ...state.employeeDetails,
            name: Semployee[0].name,
            skills: Semployee[0].skills,
            experience: Semployee[0].experience,
            id: Semployee[0].id,
          },
        };
      } else {
        return state;
      }
    case "DELETE_EMPLOYEE":
      const employeesAfterDeleting = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      const deassignnedJOb = state.jobs.filter(
        (job) => job.assignedEmployeId === action.payload
      );
      if (!(deassignnedJOb.length > 0)) {
        return { ...state, employees: employeesAfterDeleting };
      } else {
        const removingjobStatus = state.jobs.map((job) => {
          if (job.assignedEmployeId === action.payload) {
            return { ...job, isAssigned: false, assignedEmployeId: null };
          } else {
            return job;
          }
        });
        return { ...state, jobs: removingjobStatus };
      }
    case "SET_JOB_INPUTS":
      const selectedJob = state.jobs.filter((job) => job.id === action.payload);
      if (selectedJob.length > 0) {
        return {
          ...state,
          jobDetails: {
            ...state.jobDetails,
            nameOfTheJob: selectedJob[0].nameOfTheJob,
            id: selectedJob[0].id,
            skillsRequired: selectedJob[0].skillsRequired,
            description: selectedJob[0].description,
          },
          isEditOn: true,
          editID: action.payload,
        };
      } else {
        return state;
      }
    case "DELETE_JOB":
      const employeedoingtheJob = state.employees.filter(
        (employee) => employee.assignedJobId === action.payload
      );
      const jobsAfterDeleting = state.jobs.filter(
        (job) => job.id !== action.payload
      );
      if (!(employeedoingtheJob.length > 0)) {
        return { ...state, jobs: jobsAfterDeleting };
      } else {
        const removeJob = state.employees.map((employee) => {
          if (employee.assignedJobId === action.payload) {
            return { ...employee, assignedJobId: null, isAssignedJob: false };
          } else {
            return employee;
          }
        });
        return { ...state, jobs: jobsAfterDeleting, employees: removeJob };
      }
    default:
      return state;
  }
};
export default Reducer;
