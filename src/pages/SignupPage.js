import React, { useState } from "react";
import Header from "../components/Common/Header";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";

function SignupPage() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm/>}
        {!flag ? (
          <p style={{cursor: "pointer"}} onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to <span>Login.</span>
          </p>
        ) : (
          <p style={{cursor: "pointer"}} onClick={() => setFlag(!flag)}>
            Don't have an Account.CLick here to <span>Signup.</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
