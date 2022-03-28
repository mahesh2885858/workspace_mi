import React, { ChangeEventHandler, FormEvent } from "react";
import { AppState } from "../../App";
import MatchObject from "../helper/matchObjects";
import { employeeType } from "../Types/Types";
type propsTypes = {
  state: typeof AppState;
  getSkilledEmployees: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Assign = (props: propsTypes) => {
  const unAssignedJobs = props.state.jobs.filter(
    (job) => job.isAssigned === false
  );

  return (
    <div className="assign-container">
      {unAssignedJobs.length > 0 ? (
        <>
          <p>Select a job to Assign:</p>
          <select
            name="jobs"
            value={props.state.project}
            id="jobs"
            onChange={(e) => props.getSkilledEmployees(e)}
          >
            {unAssignedJobs.map((job) => {
              return (
                <option value={job.id} key={job.id}>
                  {job.nameOfTheJob}
                </option>
              );
            })}
          </select>

          <div>
            {props.state.selectedEmploy.map((employ) => {
              return (
                <div key={employ.id}>
                  <p>{employ.name}</p>
                  <div>
                    employ skills:
                    {employ.skills.map((item) => {
                      return (
                        <>
                          <p key={item.id}>{item.name}</p>{" "}
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>all jobs are assigned to emploees</div>
      )}
    </div>
  );
};
export default Assign;
