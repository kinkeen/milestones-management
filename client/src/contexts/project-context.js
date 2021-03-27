import React, { useState } from "react";
import { useBetween } from "use-between";



import ProjectService from "../services/ProjectService";

// Make a custom hook with your future shared state
const useProject = async () => {

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [milestone, setMilestone] = useState({});


  return {
    projects, setProjects,
    project, setProject,
    milestone, setMilestone
  };
};

// Make a custom hook for sharing your state between any components
const useSharedProject = () => useBetween(useProject);

export default useSharedProject;
