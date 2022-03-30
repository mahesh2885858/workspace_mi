import { AppState } from "../../App";
import { TiDelete } from "react-icons/ti";
import React, { useEffect } from "react";
import "./addjob.scss";
import { useParams } from "react-router";
type propsType = {
  state: typeof AppState;
  onJobDetailsInput: (e: string, field: string) => void;
  selectingTheSkillForJob: (id: string) => void;
  removeFromSelectedSkills: (id: string) => void;
  addJob: (e: React.FormEvent) => void;
  setJobInputs?: (id: string) => void;
};

const AddJob = (props: propsType) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      props.setJobInputs!(id);
    }
  }, []);
  return (
    <div className="add-job-container">
      <h1> Job Details</h1>
      <div className="add-job-form">
        <form onSubmit={props.addJob}>
          <div>
            <label htmlFor="name">Name of The Poject</label>
            <input
              type="text"
              name="name"
              id="name"
              value={props.state.jobDetails.nameOfTheJob}
              required
              onChange={(e) => props.onJobDetailsInput(e.target.value, "name")}
            />
          </div>
          <div>
            <label htmlFor="skills">
              Required Sklls To Complete the Project:
            </label>
            <select
              required
              onChange={(e) => props.selectingTheSkillForJob(e.target.value)}
              name="skills"
              id="skills"
            >
              <option> please choose a skill</option>
              {props.state.skills.map((skill) => {
                return (
                  <option value={skill.id} key={skill.id}>
                    {skill.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="skills-container">
            {props.state.jobDetails.skillsRequired.map((skill) => {
              if (skill) {
                return (
                  <div key={skill.id}>
                    {skill.name}{" "}
                    <TiDelete
                      className="delete-icon"
                      onClick={() => props.removeFromSelectedSkills(skill.id)}
                    />
                  </div>
                );
              } else {
                return undefined;
              }
            })}
          </div>
          <div>
            <label htmlFor="description">Description of the job</label>
            <textarea
              required
              name="description"
              id="description"
              value={props.state.jobDetails.description}
              onChange={(e) => {
                props.onJobDetailsInput(e.target.value, "description");
              }}
            ></textarea>
          </div>

          <button>Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
