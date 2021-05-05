import React from "react";
import { Link } from "react-router-dom";
import "./MainMenu.css";
const MainMenu = (props) => {
  return (
    <div className="menu_container">
      <div className="heading">
        <h6 className="title">{props.title}</h6>
      </div>

      <div className="menu">
        {props.data
          ? props.data.map((item, id) => {
              return (
                <Link to={`${props.link}/${item}`} key={id} className="option">
                  <div className="options">{item}</div>
                </Link>
              );
            })
          : null}

        {props.children ? (
          props.children.length > 1 ? (
            props.children.map((item, id) => {
              return (
                <div className="options" key={id}>
                  {item}
                </div>
              );
            })
          ) : (
            <div className="options">{props.children}</div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MainMenu;
