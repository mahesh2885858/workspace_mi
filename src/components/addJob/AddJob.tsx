import { AppState } from "../../App";
import { TiDelete } from "react-icons/ti";
import React from "react";

type propsType = {
  state: typeof AppState;
  onJobDetailsInput: (e: string, field: string) => void;
  selectingTheSkillForJob: (id: string) => void;
  removeFromSelectedSkills: (id: string) => void;
  addJob: (e: React.FormEvent) => void;
};

const AddJob = (props: propsType) => {
  return (
    <div>
      <h1>add Job Details</h1>
      <form>
        <label htmlFor="name">Name of The Poject</label>
        <input
          type="text"
          name="name"
          id="name"
          value={props.state.jobDetails.nameOfTheJob}
          onChange={(e) => props.onJobDetailsInput(e.target.value, "name")}
        />
        <label htmlFor="skills">Required Sklls To Complete the Project:</label>
        <select
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
        <div>
          {props.state.jobDetails.skillsRequired.map((skill) => {
            if (skill) {
              return (
                <div key={skill.id}>
                  {skill.name}{" "}
                  <TiDelete
                    onClick={() => props.removeFromSelectedSkills(skill.id)}
                  />
                </div>
              );
            } else {
              return undefined;
            }
          })}
        </div>
        <label htmlFor="description">Description of the job</label>
        <textarea
          name="description"
          id="description"
          value={props.state.jobDetails.description}
          onChange={(e) => {
            props.onJobDetailsInput(e.target.value, "description");
          }}
        ></textarea>

        <button onClick={props.addJob}>Add Employee</button>
      </form>
    </div>
  );
};

export default AddJob;
