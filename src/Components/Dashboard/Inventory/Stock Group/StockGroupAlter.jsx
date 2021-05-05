import React, { useContext, useEffect, useState } from "react";
import "./StockGroup.css";
import { CompanyHeader, Display } from "../../../ComponentsImport";
import { StockGroupContext } from "../../../../API";
import { FilterStockGroupByCompany } from "./StockAPI";
import { useParams } from "react-router-dom";
const StockGroupAlter = (props) => {
  props.Back();
  const [stockGroup, setStockGroup] = useContext(StockGroupContext);
  const [data, setData] = useState([]);
  let { name } = useParams();

  useEffect(() => {
    let res = FilterStockGroupByCompany(stockGroup, name);
    setData(res);
  }, [stockGroup]);

  return (
    <section id="stock_group_display">
      <div className="container">
        <CompanyHeader heading={name} position="center" />
        <div className="display_group">
          <Display
            heading="Stock Groups"
            data={data}
            link={`${name}/Inventory/stock_group`}
            editable="alter"
          />
        </div>
      </div>
    </section>
  );
};

export default StockGroupAlter;
