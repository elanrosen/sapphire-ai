/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Email = ({ style, className, styleOutlined = "/img/style-outlined-2.png" }) => {
  return (
    <img
      className={`email ${className}`}
      alt="Style filled"
      src={
        style === "outlined"
          ? styleOutlined
          : style === "round"
          ? "/img/style-round-2.png"
          : style === "sharp"
          ? "/img/style-sharp-2.png"
          : style === "two-tone"
          ? "/img/style-two-tone-2.png"
          : "/img/style-filled-2.png"
      }
    />
  );
};

Email.propTypes = {
  style: PropTypes.oneOf(["round", "sharp", "filled", "two-tone", "outlined"]),
  styleOutlined: PropTypes.string,
};
