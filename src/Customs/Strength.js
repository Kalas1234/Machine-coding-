import React from "react";
const Strength = ({ password }) => {
  const getPaaswordStrength = (password) => {
    if (password.length < 1) {
      return "";
    } else if (password.length < 4) {
      return "very weak";
    } else if (password.length < 8) {
      return "weak";
    } else if (password.length < 12) {
      return "Medium";
    } else if (password.length < 16) {
      return "Strong";
    } else {
      return "very strong";
    }
  };
  const strength = getPaaswordStrength(password);

  if (!strength) {
    return <React.Fragment> </React.Fragment>;
  }
  return (
    <div className="strength">
      Strength: <span> {strength}</span>
    </div>
  );
};
export default React.memo(Strength);
