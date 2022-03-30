import React, { useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router";
import AddEmploy from "./components/AddEmploy/AddEmploy";
import AddJob from "./components/addJob/AddJob";
import Assign from "./components/Assign/Assign";
import DashBoard from "./components/DashBoard/DashBoard";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import Employees from "./components/Employees/Employees";
import JobDetails from "./components/JobDetails/JobDetails";
import Jobs from "./components/Jobs/Jobs";
import NavBar from "./components/NavBar/NavBar";
import Reducer from "./components/Reducer/Reducer";
import Search from "./components/Search/Search";
import EmployeeSource from "./components/Source/Employees";
import JobSource from "./components/Source/Jobs";
import SkillsSource from "./components/Source/Skills";
import { employeeType, jobsType, skillsType } from "./components/Types/Types";
import "./app.scss";
const employesSelectedById: employeeType[] = [];
type appType = {
  jobs: jobsType[];
  employees: employeeType[];
  selectedEmploy: employeeType[];
  project: string;
  skills: skillsType[];
  employeeDetails: employeeType;
  jobDetails: jobsType;
  filterText: string;
  filteredJobsArray: jobsType[];
  filteredEmployeeArray: employeeType[];
};
export const AppState: appType = {
  jobs: JobSource,
  employees: EmployeeSource,
  selectedEmploy: employesSelectedById,
  project: "something",
  skills: SkillsSource,
  employeeDetails: {
    name: "",
    isAssignedJob: false,
    assignedJobId: null,
    skills: [],
    id: "",
    experience: 0,
  },
  jobDetails: {
    nameOfTheJob: "",
    id: "",
    isAssigned: false,
    assignedEmployeId: null,
    skillsRequired: [],
    description: "",
  },
  filterText: "",
  filteredEmployeeArray: [],
  filteredJobsArray: [],
};
function App() {
  const [state, dispatch] = useReducer(Reducer, AppState);
  const navigate = useNavigate();
  // functions related to get the employees required for selected job
  const getSkilledEmployees = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SELECT_JOB", payload: e.target.value });
    dispatch({ type: "GET_SKILLED_EMPLOYES", payload: e.target.value });
  };
  // functions related to adding an employee
  const onSkillChange = (skillId: string) => {
    dispatch({ type: "ADD_SKILL_TO_EMPLOYEE", payload: skillId });
  };
  const onInput = (data: string, field: string) => {
    dispatch({ type: "EMPLOYEE_DETAILS_INPUT", payload: data, field: field });
  };
  const AddEmployeeToDb = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "ADD_EMPLOYEE", payload: "add" });
  };

  const removeSkill = (skillId: string) => {
    dispatch({ type: "REMOVE_SKILL", payload: skillId });
  };
  // functions realted to assigning a project to an employee
  const assignProject = (employId: string) => {
    dispatch({ type: "ASSIGN_PROJECT", payload: employId });
  };
  // function to see the details of an employee
  const gotoEmployeePage = (employeeId: string) => {
    navigate("/employee/" + employeeId);
  };
  // function to see the details of a Job
  const goToJobDetails = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };
  // functions to add a job
  const onJobDetailsInput = (data: string, field: string) => {
    dispatch({ type: "JOB_DETAILS_INPUT", field: field, payload: data });
  };
  const selectingTheSkillForJob = (skillId: string) => {
    dispatch({ type: "SELECT_SKILLS_FOR_JOB", payload: skillId });
  };
  const removeFromSelectedSkills = (skillId: string) => {
    dispatch({ type: "REMOVE_SKILL_FROM_JOB", payload: skillId });
  };
  const addJob = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "ADD_JOB", payload: "add" });
  };
  // functions related to Search
  const onSearchInput = (input: string) => {
    dispatch({ type: "CHANGE_SEARCH_INPUT", payload: input });
    dispatch({ type: "SEARCH_INPUT", payload: input });
  };
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard {...state} />} />
        <Route
          path="/jobs"
          element={<Jobs getJob={goToJobDetails} alljobs={state.jobs} />}
        />
        <Route
          path="/employees"
          element={
            <Employees
              gotoEmployeePage={gotoEmployeePage}
              allemployees={state.employees}
            />
          }
        />
        <Route
          path="/assign"
          element={
            <Assign
              state={state}
              assign={assignProject}
              getSkilledEmployees={getSkilledEmployees}
            />
          }
        />
        <Route
          path="/addemploy"
          element={
            <AddEmploy
              removeSkill={removeSkill}
              onSkillChange={onSkillChange}
              state={state}
              onInput={onInput}
              addEmployee={AddEmployeeToDb}
            />
          }
        />
        <Route
          path="/employee/:id"
          element={<EmployeeDetails state={state} />}
        />
        <Route path="/job/:id" element={<JobDetails state={state} />} />
        <Route
          path="/addjob"
          element={
            <AddJob
              addJob={addJob}
              removeFromSelectedSkills={removeFromSelectedSkills}
              selectingTheSkillForJob={selectingTheSkillForJob}
              onJobDetailsInput={onJobDetailsInput}
              state={state}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              goToJobDetails={goToJobDetails}
              gotoEmployeePage={gotoEmployeePage}
              onSearchInput={onSearchInput}
              state={state}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
