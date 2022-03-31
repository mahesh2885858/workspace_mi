import React from "react";
import { appType } from "../../App";
import "./assign.scss";
type propsTypes = {
  state: appType;
  getSkilledEmployees: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  assign: (id: string) => void;
  gotoEmployeePage: (id: string) => void;
};
const Assign = (props: propsTypes) => {
  // getting unassigned jobs
  const unAssignedJobs = props.state.jobs.filter(
    (job) => job.isAssigned === false
  );

  return (
    <div className="assign-container">
      {/* adding conditions so that we can display only unassigned jobs in our select tag */}
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
          <div className="required-skill-container">
            <p>
              {props.state.skillsRequiredForTheSelectedJOb.length > 0
                ? "skills Required"
                : undefined}
            </p>
            {props.state.skillsRequiredForTheSelectedJOb.map((skill) => {
              return <li key={skill.id}>{skill.name}</li>;
            })}
          </div>
          <p>
            {props.state.selectedEmploy.length > 0
              ? "employees matching with job requirements"
              : undefined}
          </p>
          <div className="employees-with-skills-container">
            {props.state.selectedEmploy.map((employ) => {
              return (
                <div className="employee" key={employ.id}>
                  <div onClick={() => props.gotoEmployeePage(employ.id)}>
                    <p className="employee-name">{employ.name}</p>
                    <div>
                      <p>employ skills:</p>
                      {employ.skills.map((item) => {
                        return (
                          <>
                            <p key={item.id}>{item.name}</p>{" "}
                          </>
                        );
                      })}
                    </div>
                    <p>Expierence: {employ.experience} Year</p>
                  </div>
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
          <p>
            {props.state.employeesWithMissingSkills.length > 0
              ? "employees  with Missing job requirements"
              : undefined}
          </p>
          <div className="employees-with-skills-container">
            {props.state.employeesWithMissingSkills.map((employ) => {
              return (
                <div className="employee" key={employ.id}>
                  <div onClick={() => props.gotoEmployeePage(employ.id)}>
                    <p className="employee-name">{employ.name}</p>
                    <div>
                      <p>employ skills:</p>
                      {employ.skills.map((item) => {
                        return (
                          <>
                            <p key={item.id}>{item.name}</p>{" "}
                          </>
                        );
                      })}
                    </div>
                    <p>Expierence: {employ.experience} Year</p>
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
