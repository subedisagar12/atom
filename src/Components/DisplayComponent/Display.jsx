import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Display.css";
const Display = (props) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);

  const setQueryValue = (e) => {
    setQuery(e.target.value);
  };

  const filterData = () => {
    let res = props.data;
    if (query !== "") {
      res = [];
      let comparator = query.replace(/\s/g, "");
      comparator = comparator.toLowerCase();

      props.data.forEach((element) => {
        let to_be_compared = element.name.replace(/\s/g, "");
        to_be_compared = to_be_compared.toLowerCase();
        if (to_be_compared.slice(0, comparator.length) === comparator) {
          res.push(element);
        }
      });
    }
    setFilteredData(res);
  };

  useEffect(() => {
    filterData();
  }, [query]);

  // console.log(filteredData);
  return (
    <section id="display">
      <div className="parent">
        <div className="header">
          <h4 className="heading">{props.heading}</h4>
        </div>
        <div className="search">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={query}
            onChange={(e) => setQueryValue(e)}
          />
        </div>
        <div className="display_list">
          {filteredData.length !== 0
            ? filteredData.map((item, id) => {
                return (
                  <Link
                    to={`/${props.link}/${item.name}/${props.editable}`}
                    key={id}
                  >
                    <div className="data">{item.name}</div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
};

export default Display;
