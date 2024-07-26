import React, { useEffect, useState } from 'react';
import './ProjectTitle.css';

const app_name = 'ganttify-5b581a9c8167';

function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

const ProjectTitle = ({ projectId }) => {
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const response = await fetch(buildPath(`api/getProjectDetails/${projectId}`));
        const project = await response.json();

        if (!response.ok) {
          throw new Error(project.error || 'Failed to fetch project');
        }

        setProjectName(project.nameProject);
      } catch (error) {
        console.error('Error fetching project name:', error);
      }
    };

    fetchProjectName();
  }, [projectId]);

  return <h1 className="project-title">{projectName}</h1>;
};

export default ProjectTitle;
