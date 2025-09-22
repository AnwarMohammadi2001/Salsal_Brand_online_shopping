import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const PriceSlider = ({ min, max, values, onChange, label, unit }) => {
  return (
    <div className="mb-2">
      <label className="font-medium text-gray-800 mb-2 block">{label}</label>
      <Slider
        value={values}
        onChange={(e, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={unit === "؋" ? 50 : 1}
      />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>
          {values[0]} {unit}
        </span>
        <span>
          {values[1]} {unit}
        </span>
      </div>
    </div>
  );
};

export default PriceSlider;
