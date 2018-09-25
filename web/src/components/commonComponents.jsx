import React from "react";
export const Select = ({ name, value, options, onChange, label }) => (
  <div className="form-element">
    <label htmlFor={name}>
      {label}
      <select name={name} value={value} onChange={onChange}>
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export const Input = ({ name, value, onChange, label }) => (
  <div className="form-element">
    <label htmlFor={name}>
      {label}
      <input name={name} value={value} onChange={onChange} />
    </label>
  </div>
);
