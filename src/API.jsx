import React, { useState, createContext } from "react";

// Company API
export const CompanyContext = createContext();
// Stock Group API
export const StockGroupContext = createContext();
// Company provider

export const CompanyProvider = (props) => {
  const [companies, setCompany] = useState([
    {
      company: "Atom Trade International 075-76",
      importer: "",
    },
  ]);
  return (
    <CompanyContext.Provider value={[companies, setCompany]}>
      {props.children}
    </CompanyContext.Provider>
  );
};

// Stock Group Provider
export const StockGroupProvider = (props) => {
  const [stockGroup, setStockGroup] = useState([
    {
      company: "*",
      name: "[Primary]",
      under: "",
    },
    {
      company: "Atom Trade International 075-76",
      name: "Minitillers",
      under: "Primary",
    },
    {
      company: "Atom Trade International 075-76",
      name: "170F",
      under: "Minitillers",
    },
    {
      company: "Atom Trade International 075-76",
      name: "178F",
      under: "Minitillers",
    },
  ]);

  return (
    <StockGroupContext.Provider value={[stockGroup, setStockGroup]}>
      {props.children}
    </StockGroupContext.Provider>
  );
};
