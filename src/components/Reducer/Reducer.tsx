import { appType } from "../Types/Types";
import assingTheJob from "../helper/assigningAJob";
import { v4 as uuid } from "uuid";
import helpToGetTheSkilledEmployees from "../helper/ToGetTheSkilledEmployees";
import getSkillsRequired from "../helper/getSkillsRequiredForJob";
import getFilteredItems from "../helper/GetFilteredItems";
import getFilteredJobs from "../helper/getFilteredJobs";
type actionType = {
  type: string;
  payload: string;
  field?: string;
};
const Reducer = (state: appType, action: actionType): appType => {
  switch (action.type) {
    case "SELECT_JOB":
      return { ...state, project: action.payload };
    case "GET_SKILLED_EMPLOYES":
      // From helper functins we get the skill required for the selected job and employees with required skills for the selected job
      const skillsRequired = getSkillsRequired(state, action.payload);
      const skilledEmployees = helpToGetTheSkilledEmployees(
        action.payload,
        state
      );

      return {
        ...state,
        selectedEmploy: skilledEmployees.filteredEmployeesWithSkills,
        skillsRequiredForTheSelectedJOb: skillsRequired,
        employeesWithMissingSkills:
          skilledEmployees.filteredEmployeesWithMissingSkills,
      };
    case "ASSIGN_PROJECT":
      // while assigning a job to employee we need to change the status of employee and the status of job we assigned
      const changedState = assingTheJob(action.payload, state);
      const newSelectedEmploy = state.selectedEmploy.filter((employee) => {
        if (employee.id === action.payload) {
          return employee;
        } else {
          return false;
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
    // to handle employee name and experience inputs
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
    // adding a skill to employee
    case "ADD_SKILL_TO_EMPLOYEE":
      const obj = state.skills.filter((skill) => {
        if (skill.id === action.payload) {
          return skill;
        } else {
          return false;
        }
      });
      // making sure that we don't select same skill twice
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
    // remove a skill from an employee
    case "REMOVE_SKILL":
      const newSkillset = state.employeeDetails.skills.filter((skill) => {
        if (skill) {
          if (skill.id !== action.payload) {
            return skill;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });

      return {
        ...state,
        employeeDetails: { ...state.employeeDetails, skills: newSkillset },
      };
    case "ADD_EMPLOYEE":
      // checking whether we want to add a new or edit an existing employee
      if (!state.isEditOn) {
        // adding a new employee
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
        // editing an existing employee
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
    // This is to add skill that is required for the selected job
    case "SELECT_SKILLS_FOR_JOB":
      const job = state.skills.filter((skill) => {
        if (skill.id === action.payload) {
          return skill;
        } else {
          return false;
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
            return false;
          }
        } else {
          return false;
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
        // Adding a new Job
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
        // editing an existing Job
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
      // searching employees and jobs using their respective names
      const filteredEmployees = state.employees.filter((employee) => {
        if (
          state.searchText &&
          employee.name.toLowerCase().includes(state.searchText)
        ) {
          return employee;
        } else {
          return false;
        }
      });
      const filteredJobs = state.jobs.filter((job) => {
        if (
          state.searchText &&
          job.nameOfTheJob.toLowerCase().includes(state.searchText)
        ) {
          return job;
        } else {
          return false;
        }
      });

      return {
        ...state,
        filteredJobsArray: filteredJobs,
        filteredEmployeeArray: filteredEmployees,
      };
    case "CHANGE_SEARCH_INPUT":
      return { ...state, searchText: action.payload };
    case "SET_EMPLOYEE_INPUTS":
      // to populate the input fields with the employee details which we want to edit
      const Semployee = state.employees.filter((employee) => {
        if (employee.id === action.payload) {
          return employee;
        } else {
          return false;
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
      // to populate the input fields with the job details which we want to edit
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
    case "CHANGE_FILTERTEXT_JOBS":
      // changing the filteredText to what we selected
      if (action.payload === "") {
        return {
          ...state,
          filterTextForJobs: action.payload,
          isFilterBySkillsON: false,
        };
      } else
        return {
          ...state,
          filterTextForJobs: action.payload,
          filteredEmployeeId: action.payload,
          isFilterBySkillsON: true,
        };

    case "FILTER_ITEMS_JOBS":
      // getting the job based on filteredText
      const filteredJobResult = getFilteredJobs(state);
      return { ...state, filteredJobsBySkillsArray: filteredJobResult };
    case "CHANGE_FILTERTEXT_EMPLOYEES":
      // changing the filteredText to what we selected
      if (action.payload === "") {
        return {
          ...state,
          filterTextForEmployees: action.payload,
          isFilterBySkillsON: false,
        };
      } else
        return {
          ...state,
          filterTextForEmployees: action.payload,
          filteredEmployeeId: action.payload,
          isFilterBySkillsON: true,
        };

    case "FILTER_ITEMS_EMPLOYEES":
      // getting the employees based on filteredText
      const filteredEmployeesArray = getFilteredItems(state);
      return { ...state, employeesFilteredBySkills: filteredEmployeesArray };

    case "CLEAR_FILTERES":
      return {
        ...state,
        filterTextForEmployees: "",
        filterTextForJobs: "",
        isFilterBySkillsON: false,
      };
    default:
      return state;
  }
};
export default Reducer;
