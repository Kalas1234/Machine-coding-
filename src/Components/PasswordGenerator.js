import { useState, useCallback } from "react";
import "./password.scss";
import { DEFAULT_CHECKBOX_DATA } from "../../utils/constants";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import Strength from "../Customs/Strength";
export default function PasswordGenerator() {
  const [length, setLength] = useState(4);
  const [checkBoxData, setCheckboxData] = useState(DEFAULT_CHECKBOX_DATA);
  const [copy, setCopy] = useState(false);

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCheckboxData = (i) => {
    const updatedCheckboxData = [...checkBoxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;

    setCheckboxData(updatedCheckboxData);
  };
  const generatePasswordMemoized = useCallback(() => {
    generatePassword(checkBoxData, length);
  }, [checkBoxData, length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopy(true);

    setInterval(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={handleCopy}>
            {copy ? "Copied" : "copy"}
          </button>
        </div>
      )}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>

        <input
          type="range"
          min={4}
          max={20}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <Strength password={password} />

      <div className="checkbox">
        {checkBoxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={checkbox.state}
                onChange={() => handleCheckboxData(index)}
              />
              <label>{checkbox.title} </label>
            </div>
          );
        })}
      </div>
      {errorMessage && <div className="error">{errorMessage} </div>}
      <button
        className="generateBtn"
        onClick={() => {
          generatePasswordMemoized(checkBoxData, length);
        }}
      >
        generate password
      </button>
    </div>
  );
}
