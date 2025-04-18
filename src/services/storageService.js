import AsyncStorage from '@react-native-async-storage/async-storage';

const PROJECTS_KEY = 'user_projects';

export const saveProject = async (project) => {
  try {
    // First get existing projects
    const existingProjects = await getProjects();
    
    // Add new project or update existing one
    const updatedProjects = [...existingProjects];
    const existingIndex = updatedProjects.findIndex(p => p.id === project.id);
    
    if (existingIndex >= 0) {
      updatedProjects[existingIndex] = project;
    } else {
      // Create a new project with a unique ID if it doesn't exist
      const newProject = {
        ...project,
        id: project.id || Date.now().toString(),
        createdAt: project.createdAt || new Date().toISOString(),
      };
      updatedProjects.push(newProject);
    }
    
    // Save back to storage
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
    return updatedProjects;
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const projectsJson = await AsyncStorage.getItem(PROJECTS_KEY);
    return projectsJson ? JSON.parse(projectsJson) : [];
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
};

export const getProjectById = async (id) => {
  try {
    const projects = await getProjects();
    return projects.find(project => project.id === id);
  } catch (error) {
    console.error('Error getting project by id:', error);
    return null;
  }
};

export const updateTaskStatus = async (projectId, taskId, completed) => {
  try {
    const project = await getProjectById(projectId);
    if (!project) throw new Error('Project not found');
    
    const updatedTasks = project.result.taskList.map(task => 
      task.id === taskId ? { ...task, completed } : task
    );
    
    const updatedProject = {
      ...project,
      result: {
        ...project.result,
        taskList: updatedTasks
      }
    };
    
    await saveProject(updatedProject);
    return updatedProject;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};
