import "./emi.scss";
import { useState, useEffect } from "react";
import { tenureData } from "../../utils/constants";
import { numberSeparatedWithCommas } from "../../utils/configs";
import Input from "../Customs/Input";
import Slider from "../Customs/Slider";

export default function EmiCalc() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [fee, setFee] = useState(1);
  const [tenure, setTenure] = useState(12);

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, cost, interest]);

  const updateEmi = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEmi(dp);
    setEmi(emi);
  };
  const calculateEmi = (downPayment) => {
    if (!cost) {
      return;
    }
    const p = cost - downPayment;
    const r = interest / 100;
    const y = tenure / 12;

    const emi = (p * r * (1 + r) ** y) / ((1 + r) ** y - 1);
    return Number(emi / 12).toFixed(0);
  };

  const calculateDp = (emi) => {
    if (!cost) return;
    const downPaymentPercentage = 100 - (emi / calculateEmi(0)) * 100;
    const downPayment = Number((downPaymentPercentage / 100) * cost).toFixed(0);
    return downPayment;
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDp(emi);
    setDownPayment(dp);
  };
  return (
    <div className="App">
      <h1 style={{textAlign:"left", fontWeight:700}}>EMI Calculator </h1>
      <Input
        className="title"
        title="Total Cost of Asset"
        state={cost}
        setState={setCost}
      />
      <Input
        className="title"
        title="Interest Rate (in %)"
        state={interest}
        setState={setInterest}
      />
      <Input
        className="title"
        title="Processing Fee (in %)"
        state={fee}
        setState={setFee}
      />

      <Slider
        title="Down Payment"
        total={`Total DownPayment - Rs ${numberSeparatedWithCommas(
          (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
        )}`}
        min={0}
        max={cost}
        labelStart="0%"
        labelEnd="100%"
        state={downPayment}
        setState={updateEmi}
      />
      <Slider
        title="Loan Amount"
        total={`Total Loan Amount - Rs ${numberSeparatedWithCommas(
          (Number(emi) * tenure).toFixed(0)
        )}`}
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
        state={emi}
        setState={updateDownPayment}
        labelStart={calculateEmi(cost)}
        labelEnd={calculateEmi(0)}
      />
      <span className="title">Tenure</span>
      <div className="tenure-container">
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${tenure === t ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {" "}
              {t}{" "}
            </button>
          );
        })}
      </div>
    </div>
  );
}
