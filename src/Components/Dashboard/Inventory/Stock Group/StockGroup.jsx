import React from "react";
import { CompanyHeader, MainMenu } from "../../../ComponentsImport";
import { useParams } from "react-router-dom";

const StockGroup = (props) => {
  props.Back();
  let { name } = useParams();
  return (
    <section id="stock-group">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <CompanyHeader heading={name} />
          </div>

          <div className="col-lg-4">
            <MainMenu
              title="Stock Groups"
              data={["Create", "Alter", "Display"]}
              link={`/${name}/Inventory/stock_group`}
            >
              <span className="quit">Back</span>
            </MainMenu>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockGroup;
