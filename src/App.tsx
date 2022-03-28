import React, { useReducer } from "react";
import { Route, Routes } from "react-router";
import Assign from "./components/Assign/Assign";
import DashBoard from "./components/DashBoard/DashBoard";
import Employees from "./components/Employees/Employees";
import Jobs from "./components/Jobs/Jobs";
import NavBar from "./components/NavBar/NavBar";
import Reducer from "./components/Reducer/Reducer";
import EmployeeSource from "./components/Source/Employees";
import JobSource from "./components/Source/Jobs";
import SkillsSource from "./components/Source/Skills";
import { employeeType, jobsType, skillsType } from "./components/Types/Types";
const employesSelectedById: employeeType[] = [];
type appType = {
  jobs: jobsType[];
  employees: employeeType[];
  selectedEmploy: employeeType[];
  project: string;
  skills: skillsType[];
};
export const AppState: appType = {
  jobs: JobSource,
  employees: EmployeeSource,
  selectedEmploy: employesSelectedById,
  project: "pm123",
  skills: SkillsSource,
};
function App() {
  const [state, dispatch] = useReducer(Reducer, AppState);
  const getSkilledEmployees = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SELECT_JOB", payload: e.target.value });
    dispatch({ type: "GET_SKILLED_EMPLOYES", payload: e.target.value });
  };
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard {...state} />} />
        <Route path="/jobs" element={<Jobs alljobs={state.jobs} />} />
        <Route
          path="/employees"
          element={<Employees allemployees={state.employees} />}
        />
        <Route
          path="/assign"
          element={
            <Assign state={state} getSkilledEmployees={getSkilledEmployees} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
