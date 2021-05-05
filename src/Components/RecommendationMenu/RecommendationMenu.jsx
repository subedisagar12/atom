import React from "react";
import "./Recommendation.css";
const RecommendationMenu = ({ title, data, onSelect }) => {
  if (data.length > 0) {
    return (
      <div className="recommendation">
        <div className="header">
          <span className="title">{title}</span>
        </div>

        {data.map((item, id) => (
          <div
            className="recommendation_options"
            key={id}
            onClick={() => {
              onSelect(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  } else {
    return <div className="hidden"></div>;
  }
};

export default RecommendationMenu;
