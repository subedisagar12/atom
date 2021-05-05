import React, { useContext, useEffect } from "react";
import "./company.css";

import { Link } from "react-router-dom";
// Components import
import MainMenu from "../MainMenu/MainMenu";
// API Import
import { CompanyContext } from "../../API";
const CompanySelect = (props) => {
  const [companies, setCompany] = useContext(CompanyContext);
  let data = [];

  companies.forEach((element) => {
    data.push(element.company);
  });

  props.Back();
  return (
    <MainMenu title="Select Company" data={data} link={"/company"}>
      <Link to="/company/create" className="create">
        Create Company
      </Link>
      <p className="quit">Quit</p>
    </MainMenu>
  );
};

export default CompanySelect;
