import { useState } from 'react';
import type { Project } from '../types/Project';
import { updateProject } from '../api/ProjectsAPI';

interface EditProjectFormProps {
  project: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditProjectForm = ({
  project,
  onSuccess,
  onCancel,
}: EditProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({ ...project }); // our default state is the project that was passed into us

  // Updates the form state as the user types into the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Processes the form submission and prevent the default of refreshing the page, then calls the addProject API function and triggers the onSuccess callback to refresh the project list
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProject(formData.projectId, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <label>
        Project Name:
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Project Type:
        <input
          type="text"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Regional Program:
        <input
          type="text"
          name="projectRegionalProgram"
          value={formData.projectRegionalProgram}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Impact:
        <input
          type="number"
          name="projectImpact"
          value={formData.projectImpact}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Project Phase:
        <input
          type="text"
          name="projectPhase"
          value={formData.projectPhase}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Project Functionality Status:
        <input
          type="text"
          name="projectFunctionalityStatus"
          value={formData.projectFunctionalityStatus}
          onChange={handleChange}
        ></input>
      </label>
      <button type="submit">Update Project</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditProjectForm;
