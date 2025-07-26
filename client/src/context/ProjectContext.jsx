import React, { createContext, useState, useContext } from 'react';
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <ProjectContext.Provider value={{ openChangePassword, setOpenChangePassword }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
