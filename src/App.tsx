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
import "./app.scss";
import NotFound from "./components/NotFoundPAge/NotFound";
import { appType } from "./components/Types/Types";
// Type definition for our state

export const AppState: appType = {
  jobs: JobSource,
  employees: EmployeeSource,
  selectedEmploy: [],
  employeesWithMissingSkills: [],
  project: "something",
  skills: SkillsSource,
  filteredJobsBySkillsArray: [],
  isFilterBySkillsON: false,

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
  filterTextForEmployees: "",
  filterTextForJobs: "",
  searchText: "",
  filteredEmployeeArray: [],
  filteredJobsArray: [],
  isEditOn: false,
  editID: "",
  skillsRequiredForTheSelectedJOb: [],
  filteredJobsIds: "",
  filteredEmployeeId: "",
  employeesFilteredBySkills: [],
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
  const onInput = (data: string, field: string) => {
    dispatch({ type: "EMPLOYEE_DETAILS_INPUT", payload: data, field: field });
  };
  const onSkillChange = (skillId: string) => {
    dispatch({ type: "ADD_SKILL_TO_EMPLOYEE", payload: skillId });
  };
  const AddEmployeeToDb = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "ADD_EMPLOYEE", payload: "add" });
    navigate("/employees");
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
    navigate("/jobs");
  };
  // functions related to Search
  const onSearchInput = (input: string) => {
    dispatch({ type: "CHANGE_SEARCH_INPUT", payload: input });
    dispatch({ type: "SEARCH_INPUT", payload: input });
  };
  // Editing employee details
  const editEmolyeeInputs = (id: string) => {
    dispatch({ type: "SET_EMPLOYEE_INPUTS", payload: id });
  };
  // Deleting an employee
  const deleteEmployee = (id: string) => {
    dispatch({ type: "DELETE_EMPLOYEE", payload: id });
    navigate("/employees");
  };
  const setJobInputs = (id: string) => {
    dispatch({ type: "SET_JOB_INPUTS", payload: id });
  };
  const deleteJob = (id: string) => {
    dispatch({ type: "DELETE_JOB", payload: id });
    navigate("/jobs");
  };
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERES", payload: "" });
  };
  // when we change the skill we want to filter through for jobs
  const onFilterTextChangeForJobs = (data: string, field: string) => {
    dispatch({ type: "CHANGE_FILTERTEXT_JOBS", payload: data, field });
    dispatch({ type: "FILTER_ITEMS_JOBS", payload: data, field });
  };
  // when we change the skill we want to filter through for employees
  const onFilterTextChangeForEmployees = (data: string, field: string) => {
    dispatch({ type: "CHANGE_FILTERTEXT_EMPLOYEES", payload: data, field });
    dispatch({ type: "FILTER_ITEMS_EMPLOYEES", payload: data, field });
  };
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <DashBoard
                state={state}
                goToJobDetails={goToJobDetails}
                gotoEmployeePage={gotoEmployeePage}
              />
            }
          />
          <Route
            path="/jobs"
            element={
              <Jobs
                clearFilters={clearFilters}
                getJob={goToJobDetails}
                onFilterTextChange={onFilterTextChangeForJobs}
                state={state}
              />
            }
          />
          <Route
            path="/employees"
            element={
              <Employees
                clearFilters={clearFilters}
                onFilterTextChange={onFilterTextChangeForEmployees}
                gotoEmployeePage={gotoEmployeePage}
                state={state}
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
                gotoEmployeePage={gotoEmployeePage}
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
            element={
              <EmployeeDetails
                goToJobDetails={goToJobDetails}
                deleteEmployee={deleteEmployee}
                state={state}
              />
            }
          />
          <Route
            path="/job/:id"
            element={
              <JobDetails
                deleteJob={deleteJob}
                gotoEmployeePage={gotoEmployeePage}
                state={state}
              />
            }
          />
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
          <Route
            path="/employee/edit/:id"
            element={
              <AddEmploy
                removeSkill={removeSkill}
                onSkillChange={onSkillChange}
                state={state}
                onInput={onInput}
                addEmployee={AddEmployeeToDb}
                editEmolyeeInputs={editEmolyeeInputs}
              />
            }
          />
          <Route
            path="/job/edit/:id"
            element={
              <AddJob
                addJob={addJob}
                removeFromSelectedSkills={removeFromSelectedSkills}
                selectingTheSkillForJob={selectingTheSkillForJob}
                onJobDetailsInput={onJobDetailsInput}
                state={state}
                setJobInputs={setJobInputs}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
