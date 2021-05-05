import React, { useContext, useEffect, useState } from "react";
import "./StockGroup.css";
import { RecommendationMenu } from "../../../ComponentsImport";
import { StockGroupContext } from "../../../../API";
import { FilterStockGroupByCompany } from "./StockAPI";
import { useParams } from "react-router-dom";

const StockGroupDetail = (props) => {
  props.Back();
  let disabled = props.editable === "read" ? true : false;
  let { name, group } = useParams();
  const [stockGroup, setStockGroup] = useContext(StockGroupContext);
  const [data, setData] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [selected, setSelected] = useState("");

  const [inputData, setInputData] = useState({
    group: group,
    under: "",
  });

  let oldValue = group;

  const setGroupValue = (e) => {
    // Function to set group name goes here
    setInputData({
      ...inputData,
      group: e.target.value,
    });
  };

  const setUnderValue = (e) => {
    // Function to set under value goes here
    setSelected("");
    setInputData({
      ...inputData,
      under: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let index = stockGroup.findIndex(
      (item) => item.name === group && item.company === name
    );
    let items = [...stockGroup];
    let to_be_changed = items.filter((item) => item.under === group);
    items[index].name = inputData.group;
    items[index].under = inputData.under !== "" ? inputData.under : "[Primary]";
    setStockGroup(items);

    // setStockGroup([
    //   ...stockGroup,
    //   {
    //     company: name,
    //     name: inputData.group,
    //     under: inputData.under !== "" ? inputData.under : "[Primary]",
    //   },
    // ]);

    setInputData({
      group: "",
      under: "",
    });
  };

  // Hook to load the group of selected company only
  useEffect(() => {
    let res = FilterStockGroupByCompany(stockGroup, name);
    setData(res);
  }, [stockGroup]);

  useEffect(() => {
    let _under = data.filter((item) => item.name === group)[0];

    if (_under) {
      setInputData({
        ...inputData,
        under: _under.under,
      });
    }
  }, [data]);

  // Hook to filter the recommendation menu
  useEffect(() => {
    const filterData = () => {
      let res = [];
      let comparator = inputData.under.replace(/\s/g, "");
      comparator = comparator.toLowerCase();

      data.forEach((element) => {
        let to_be_compared = element.name.replace(/\s/g, "");
        to_be_compared = to_be_compared.toLowerCase();
        if (to_be_compared.slice(0, comparator.length) === comparator) {
          res.push(element.name);
        }
      });

      setRecommendation(res);
    };
    filterData();
  }, [inputData.under]);

  // Function to handle the selected value of recommendation
  const onSelect = (value) => {
    setSelected(value);
  };

  // Hook to handle the selection
  useEffect(() => {
    setInputData({
      ...inputData,
      under: selected,
    });
  }, [selected]);

  return (
    <div className="row">
      <div
        className={
          recommendation.length > 0 &&
          inputData.under !== "" &&
          selected === "" &&
          !disabled
            ? "col-lg-10"
            : "col-lg-12"
        }
      >
        <div id="stock_group_create_form">
          <div className="form_header">
            <span className="form_heading"> New Stock Group</span>
          </div>
          <form name="stock_group_create_form" className="form">
            <div className=" form-group input">
              <label htmlFor="group">Group Name</label>
              <input
                type="text"
                id="group"
                name="group"
                className="form-control"
                value={inputData.group}
                onChange={(e) => setGroupValue(e)}
                disabled={disabled}
              />
            </div>

            <div className=" form-group input">
              <label htmlFor="under">Under</label>
              <input
                type="text"
                id="under"
                name="under"
                className="form-control"
                value={inputData.under}
                onChange={(e) => setUnderValue(e)}
                disabled={disabled}
              />
            </div>

            {disabled ? null : (
              <div className="button_container">
                <button
                  type="submit"
                  className="btn create_btn"
                  onClick={(e) => onSubmit(e)}
                >
                  Add Group
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      {inputData.under !== "" &&
      recommendation.length > 0 &&
      selected === "" &&
      !disabled ? (
        <div className="col-lg-2">
          <RecommendationMenu
            title="Groups"
            data={recommendation}
            onSelect={onSelect}
          />
        </div>
      ) : null}
    </div>
  );
};

export default StockGroupDetail;
