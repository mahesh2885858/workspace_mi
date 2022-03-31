import { appType } from "../../App";
import { TiDelete } from "react-icons/ti";
import "./addemployee.scss";
import React, { useEffect } from "react";
import { useParams } from "react-router";
type propsType = {
  state: appType;
  onSkillChange: (e: string) => void;
  onInput: (e: string, field: string) => void;
  removeSkill: (e: string) => void;
  addEmployee: (e: React.FormEvent) => void;
  editEmolyeeInputs?: (id: string) => void;
};
const AddEmploy = (props: propsType) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      props.editEmolyeeInputs!(id);
    }
  }, []);
  return (
    <div className="add-employee-container">
      <h1>Add Employ</h1>
      <div className="add-employee-form-container">
        <form onSubmit={props.addEmployee}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            required
            name="name"
            id="name"
            value={props.state.employeeDetails.name}
            onChange={(e) => props.onInput(e.target.value, "name")}
          />
          <label htmlFor="skills">Add Sklls:</label>
          <select
            onChange={(e) => props.onSkillChange(e.target.value)}
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
          <div className="skills-container">
            {props.state.employeeDetails.skills.map((skill) => {
              if (skill) {
                return (
                  <div key={skill.id}>
                    {skill.name}
                    <TiDelete
                      className="remove-icon"
                      onClick={() => props.removeSkill(skill.id)}
                    />
                  </div>
                );
              } else {
                return undefined;
              }
            })}
          </div>
          <label htmlFor="Experience">Experience</label>
          <input
            required
            type="number"
            value={props.state.employeeDetails.experience}
            onChange={(e) => props.onInput(e.target.value, "experience")}
          />
          <button>Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmploy;
