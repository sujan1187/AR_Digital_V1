// frontend/src/context/CompanyContext.js
/*import React, { createContext, useContext, useState } from "react";

const CompanyContext = createContext();

export const useCompany = () => {
  return useContext(CompanyContext);
};

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState({});

  const addCompany = (name, logo, video) => {
    setCompanies((prevCompanies) => ({
      ...prevCompanies,
      [name]: { logo, video },
    }));
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};*/
