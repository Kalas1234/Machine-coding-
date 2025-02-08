import React from "react";
import './custom.scss'
const Input = ({ title, state, setState, className }) => {
  return (
    <>
      <span className={className}> {title}</span>
      <input
        className="input-emi"
        type="number"
        placeholder={title}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </>
  );
};

export default Input;
