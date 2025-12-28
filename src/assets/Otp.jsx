/*
import { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
export default function OtpVerification() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(120);
  const timerZero = timer > 0;
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]);

  function handleSubmission() {
    navigate("/compliance");
  }

  function resetTimer() {
    setTimer(120);
  }

  return (
    <div className="otpcont">
      <div className="otpheader">
        <h2>OTP Verification</h2>
        <p>
          Enter the OTP sent to your number (sms) <br></br>
          <span>0987654322</span>
        </p>
      </div>
      <div>
        <input type="number" className="no-spinner" />
        <input type="number" className="no-spinner" />
        <input type="number" className="no-spinner" />
        <input type="number" className="no-spinner" />
        <input type="number" className="no-spinner" />
        <input type="number" className="no-spinner" />
      </div>
      <div className="otpcta">
        <button className="submmit" onClick={handleSubmission}>
          Submit
        </button>
        {timer === 0 ? (
          <p>You can now resend OTP</p>
        ) : (
          <p>Resend OTP in {timer} seconds</p>
        )}
        <button disabled={timerZero} onClick={resetTimer}>
          Resend OTP
        </button>
      </div>
    </div>
  );
}
  */

import React, { useRef, useState, useEffect } from "react";
import "./otp.css";
import { useNavigate } from "react-router-dom";

const OtpVerification = ({ length = 6, autoFocus = true, client, myFuncs }) => {
  const { otp } = client;
  const { setOtp, sendDetails } = myFuncs;
  //   const [otpString, setOtpString] = useState("");
  const navigate = useNavigate();
  const [otpp, setOtpp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(120);
  const [next, setNext] = useState();
  const timerZero = timer > 0;
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]);

  function resetTimer() {
    setTimer(120);
  }

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtpp(newOtp);

    // Move to next input if value is entered
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      console.log("otp");
      sendDetails();
    } else {
      console.log("not full");
    }
  }, [otp]);

  //   useEffect(() => {
  //     setOtp(otpString);
  //   }, [otpString]);

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();

      if (otpp[index] !== "") {
        // Clear current input
        const newOtp = [...otpp];
        newOtp[index] = "";
        setOtpp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otpp];
        newOtp[index - 1] = "";
        setOtpp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const numbersOnly = pastedData.replace(/\D/g, ""); // Remove non-digits

    if (numbersOnly.length === length) {
      const newOtp = numbersOnly.split("").slice(0, length);
      setOtpp(newOtp);

      // Focus last input
      inputRefs.current[length - 1].focus();
    } else if (numbersOnly.length > 0) {
      // Fill as many as possible
      const newOtp = [...otpp];
      const charsToFill = Math.min(numbersOnly.length, length);

      for (let i = 0; i < charsToFill; i++) {
        newOtp[i] = numbersOnly[i];
      }

      setOtpp(newOtp);

      // Focus next empty input or last one
      const nextIndex = Math.min(charsToFill, length - 1);
      inputRefs.current[nextIndex].focus();
    }
  };

  const clearOTP = () => {
    resetTimer();
    setOtpp(Array(length).fill(""));
    inputRefs.current[0].focus();
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  function handleSubmission() {
    setNext(true);
    const combinedOtp = otpp.join("");
    setOtp(combinedOtp);
  }

  function handleNext() {
    setNext(false);
    // sendDetails();
    navigate("/compliance");
  }

  return (
    <div className="otp-container">
      <div className="otpheader">
        <h2>OTP Verification</h2>
        <p>
          Enter the OTP sent to your number (sms) <br></br>
          <span>0987654322</span>
        </p>
      </div>
      <div className="otp-inputs">
        {otpp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            className={`otp-input ${digit ? "filled" : ""}`}
            autoComplete="one-time-code"
          />
        ))}
      </div>
      {timer === 0 ? (
        <p className="resindp">You can now resend OTP</p>
      ) : (
        <p className="resindp">Resend OTP in {timer} seconds</p>
      )}

      <div className="otp-display">
        <p>
          Your OTP: <strong>{otpp.join("") || "______"}</strong>
        </p>
        {!next ? (
          <button
            onClick={handleSubmission}
            className="copy-btn"
            type="button"
            disabled={otpp.join("").length !== length}
          >
            Submit OTP
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="copy-btn"
            type="button"
            disabled={otpp.join("").length !== length}
          >
            Finish
          </button>
        )}
        <div className="otp-actions">
          <button
            onClick={clearOTP}
            className="clear-btn"
            disabled={timerZero}
            type="button"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
