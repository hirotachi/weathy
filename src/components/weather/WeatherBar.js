import React from "react";

const Weatherbar = (props) => (
  <div>
    <div style={{backgroundColor: "red", width: "200px", height: "1rem", position: "relative"}}>
      <div
        style={
          {
            position: "absolute",
            height: "100%",
            width: `${props.value}%`,
            backgroundColor: `rgb(${255 * (props.value / 100)}, 195,9)`,
            transition: "all .5s ease-in-out"
          }
        }
      />
    </div>
  </div>
);

export default Weatherbar;