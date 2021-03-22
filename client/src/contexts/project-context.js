import React, { useState } from "react";
import { useBetween } from "use-between";

// Make a custom hook with your future shared state
const useProject = () => {
  const [project, setProject] = useState({});
  const [milestone, setMilestone] = useState({});
  return {
    project, setProject,
    milestone, setMilestone
  };
};

// Make a custom hook for sharing your state between any components
const useSharedProject = () => useBetween(useProject);

export default useSharedProject;
