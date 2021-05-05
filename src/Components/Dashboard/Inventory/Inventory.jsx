import React from "react";
import "./Inventory.css";
import { Link, useParams } from "react-router-dom";
// Components import
import { CompanyHeader, MainMenu } from "../../ComponentsImport";
const Inventory = (props) => {
  props.Back();
  let { name } = useParams();
  try {
    return (
      <section id="inventory">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <CompanyHeader heading={name} />
            </div>

            <div className="col-lg-4">
              <MainMenu
                title="Inventory"
                data={["Stock Voucher", "Stock Groups", "Stock Items"]}
                link={`/${name}/Inventory`}
              >
                <span className="quit">Back</span>
              </MainMenu>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (e) {
    return <h4>Unable to load Data.</h4>;
  }
};

export default Inventory;
