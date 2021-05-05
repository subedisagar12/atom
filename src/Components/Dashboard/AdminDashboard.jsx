import React from "react";
import "./Admin.css";
import { useParams, Link } from "react-router-dom";
// Components Import
import MainMenu from "../MainMenu/MainMenu";
import { CompanyHeader } from "../ComponentsImport";
const AdminDashboard = (props) => {
  props.Back();

  let { name } = useParams();
  return (
    <section id="admin-dashboard">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Company Records goes here */}
            <CompanyHeader heading={name} />
          </div>

          <div className="col-lg-4">
            {/* Gateway goes here */}
            <MainMenu
              title={"Gateway"}
              data={[
                "Invoice",
                "Inventory",
                "Consignment",
                "Users",
                "Clients",
                "Sales",
              ]}
              link={`/${name}`}
            >
              <span className="quit">Delete Company</span>
              <span className="quit">Quit</span>
            </MainMenu>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
