import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggle = (event) => {
    event.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, handleToggle, setIsSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
