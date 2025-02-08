import { useState } from "react";
import "./styles.css";
import { storeConfigs} from "../../utils/constants"
export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStepper = () => {
    setCurrentStep((prevStep) => {
      if (prevStep == storeConfigs.length) {
        setIsCompleted(true);
        return prevStep;
      }
      return prevStep + 1;
    });
  };

  const ActiveComponent = storeConfigs[currentStep - 1]?.Component;

  function calculateWidth() {
    return ((currentStep - 1) / (storeConfigs.length - 1)) * 100;
  }

  return (
    <>
      <div className="stepper">
        {storeConfigs.map((step, index) => {
          return (
            <div
              className={`step ${
                currentStep > index + 1 || isCompleted ? "complete" : ""
              } ${currentStep === index + 1 && !isCompleted ? "active" : ""}`}
              key={step.name}
            >
              <div className="step-number">
                {currentStep > index + 1 || isCompleted ? (
                  <span>✅</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{ marginTop: "30px", textAlign: "center", fontWeight: "bolder" }}
      >
        <ActiveComponent />
      </div>

      <div className="line">
        <div
          className="progress-line"
          style={{ width: `${calculateWidth()}%` }}
        ></div>
      </div>

      {!isCompleted && (
        <button className="btn" onClick={handleStepper}>
          {currentStep > storeConfigs.length || isCompleted ? "Finsh" : "Next"}
        </button>
      )}
    </>
  );
}
