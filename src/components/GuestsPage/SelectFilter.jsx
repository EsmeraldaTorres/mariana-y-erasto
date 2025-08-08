// SelectFilter.jsx
import React from "react";

const SelectFilter = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select className="form-select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
