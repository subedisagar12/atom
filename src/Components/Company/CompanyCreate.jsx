import React, { useState, useContext, useEffect } from "react";
import { RecommendationMenu } from "../ComponentsImport";

// Context imports
import { CompanyContext } from "../../API";
const CompanyCreate = (props) => {
  // Mouse Trap back function
  props.Back();

  // Context for listing all companies
  const [companies, setCompany] = useContext(CompanyContext);
  // State for loading recommendation data
  const [data, setData] = useState([]);
  // State to handle selected data from recommendation menu
  const [selected, setSelected] = useState("");

  // State to handle user input
  const [inputData, setInputData] = useState({
    company: "",
    importer: "",
  });

  // Function to set the company value
  const setCompanyValue = (e) => {
    setInputData({
      ...inputData,
      company: e.target.value,
    });
  };

  // Function to set the importer value
  const setImporterValue = (e) => {
    setSelected("");
    setInputData({
      ...inputData,
      importer: e.target.value,
    });
  };

  // Function to filter the company based on user input
  const filterData = () => {
    let res = [];
    let comparator = inputData.importer.replace(/\s/g, "");
    comparator = comparator.toLowerCase();

    companies.forEach((element) => {
      let to_be_compared = element.company.replace(/\s/g, "");
      to_be_compared = to_be_compared.toLowerCase();
      if (to_be_compared.slice(0, comparator.length) === comparator) {
        res.push(element.company);
      }
    });

    setData(res);
  };
  // Hook to filter the data
  useEffect(() => {
    filterData();
  }, [inputData.importer]);

  // FUnction to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    setCompany([
      ...companies,
      {
        company: inputData.company,
        importer: inputData.importer,
      },
    ]);

    setInputData({
      company: "",
      importer: "",
    });
  };

  // Function to handle the selected value of recommendation
  const onSelect = (value) => {
    setSelected(value);
  };

  // Hook to handle the selection
  useEffect(() => {
    setInputData({
      ...inputData,
      importer: selected,
    });
  }, [selected]);

  return (
    <section id="company_create">
      <div className="row">
        <div
          className={
            data.length > 0 && inputData.importer !== "" && selected === ""
              ? "col-lg-10"
              : "col-lg-12"
          }
        >
          <div id="company_create_form">
            <div className="form_header">
              <span className="form_heading">Create Company</span>
            </div>
            <form name="company_create_form" className="form">
              <div className=" form-group input">
                <label htmlFor="company">Name of the Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-control"
                  value={inputData.company || ""}
                  onChange={(e) => setCompanyValue(e)}
                />
              </div>

              <div className=" form-group input">
                <label htmlFor="importer">Import Data From</label>
                <input
                  type="text"
                  id="importer"
                  name="importer"
                  className="form-control"
                  value={inputData.importer || ""}
                  onChange={(e) => setImporterValue(e)}
                />
              </div>

              <div className="button_container">
                <button
                  type="submit"
                  className="btn create_btn"
                  onClick={(e) => onSubmit(e)}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>

        {inputData.importer !== "" && data.length > 0 && selected === "" ? (
          <div className="col-lg-2">
            <RecommendationMenu
              title="Companies"
              data={data}
              onSelect={onSelect}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CompanyCreate;
