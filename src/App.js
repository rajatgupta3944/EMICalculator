import './App.css';
import { useState } from "react";
import { tenureData } from './utils/constants';

export default function App() {
  const [cost, setCost] = useState();
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downPayment) => {
    if (!cost) return;
    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;
    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      ((1 + rateOfInterest) ** numberOfYears - 1);
    return Number(EMI / 12).toFixed(0);
  };
  const updateEMI = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    const emi = calculateEMI(dp);
    setEmi(emi);
  };
  const calculateDP = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));
    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  return (
    <div className="App">
      <span className="title">EMI Calculator</span>

      <span className="title">Total Cost of Asset</span>
      <input
        className="title"
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Total Cost of Assets"
      ></input>

      <span className="title">Interest Rate (In %)</span>
      <input
        className="title"
        type="number"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Interest Rate (In %)"
      ></input>

      <span className="title">Processing Fee (In %)</span>
      <input
        className="title"
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Processing Fee (In %)"
        disabled={true}
      ></input>
      <span className="title">Down Payment</span>
      <div>
        <input
          type="range"
          min={0}
          max={cost}
          className="slider"
          value={downPayment}
          onChange={updateEMI}
        ></input>
        <div className="lables">
          <lable>0%</lable>
          <b>{downPayment}</b>
          <lable>100%</lable>
        </div>
      </div>
      <span className="title">Loan Per Month</span>
      <div>
        <input
          type="range"
          className="slider"
          value={emi}
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          onChange={updateDownPayment}
        ></input>
        <div className="lables">
          <lable>{calculateEMI(cost)}</lable>
          <b>{emi}</b>
          <lable>{calculateEMI(0)}</lable>
        </div>
      </div>
      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
