import { AppState } from "../../App";
import "./search.scss";
type propsType = {
  state: typeof AppState;
  onSearchInput: (id: string) => void;
  gotoEmployeePage: (id: string) => void;
  goToJobDetails: (id: string) => void;
};

const Search = (props: propsType) => {
  return (
    <div className="search-container">
      <div className="search-input">
        <input
          onChange={(e) => props.onSearchInput(e.target.value)}
          value={props.state.filterText}
          type="text"
          placeholder="search here......!"
        />
      </div>
      <div className="search-result-container">
        <h3>Results in employees:</h3>
        <div className="employee-results">
          {props.state.filteredEmployeeArray.map((employee) => {
            return (
              <div
                onClick={() => props.gotoEmployeePage(employee.id)}
                key={employee.id}
              >
                <p>employee name:{employee.name}</p>
                <p>
                  status:
                  {employee.isAssignedJob ? "Assigned a job" : "not assigned"}
                </p>
              </div>
            );
          })}
        </div>
        <h3>Results in jobs:</h3>
        <div className="job-results">
          {props.state.filteredJobsArray.map((job) => {
            return (
              <div onClick={() => props.goToJobDetails(job.id)} key={job.id}>
                <p>job name:{job.nameOfTheJob}</p>
                <p>
                  status:
                  {job.isAssigned ? "Assigned to employee" : "not assigned"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
