import React, { ChangeEventHandler, FormEvent } from "react";
import { AppState } from "../../App";
import "./assign.scss";
type propsTypes = {
  state: typeof AppState;
  getSkilledEmployees: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  assign: (id: string) => void;
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
            <option value="something">pleaseSelectONe</option>
            {unAssignedJobs.map((job) => {
              return (
                <option value={job.id} key={job.id}>
                  {job.nameOfTheJob}
                </option>
              );
            })}
          </select>
          <div>
            <p>
              {props.state.skillsRequiredForTheSelectedJOb.length > 0
                ? "skills Required"
                : undefined}
            </p>
            {props.state.skillsRequiredForTheSelectedJOb.map((skill) => {
              return <li key={skill.id}>{skill.name}</li>;
            })}
          </div>
          <div>
            <p>
              {props.state.selectedEmploy.length > 0
                ? "employees matching with job requirements"
                : undefined}
            </p>
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
                  <p>Expierence: {employ.experience} Year</p>
                  {employ.isAssignedJob ? (
                    "assigned"
                  ) : (
                    <button
                      onClick={() => {
                        props.assign(employ.id);
                      }}
                    >
                      Assign
                    </button>
                  )}
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
