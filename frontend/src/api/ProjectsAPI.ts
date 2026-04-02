import type { Project } from '../types/Project';

interface FetchProjectsResponse {
  projects: Project[]; // List of projects
  totalNumProjects: number; // Total count of projects
}

const API_URL =
  'https://waterproject-springer-backend-gxeheugvcuhgetgx.francecentral-01.azurewebsites.net/Water';

export const fetchProjects = async (
  // These three things are the parameters
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addProject = async (newProject: Project): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/Water/AddProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const updateProject = async (
  projectId: number,
  updatedProject: Project
): Promise<Project> => {
  try {
    const response = await fetch(
      `${API_URL}/Water/UpdateProject/${projectId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/Water/DeleteProject/${projectId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
