import React, { useState } from "react";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import Loader from "../components/Loader";

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <>
      {isLoading && <Loader />}
      {hasAccount ? (
        <div>
          <h1>Login</h1>

          <Login isLoading={isLoading} setIsLoading={setIsLoading} />

          <p onClick={() => setHasAccount(false)} style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>
            Or register
          </p>
        </div >
      ) : (
        <div>
          <h1>Register</h1>

          <SignUp isLoading={isLoading} setIsLoading={setIsLoading} />

          <p onClick={() => setHasAccount(true)}>
            Already have account? <span style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>Sign in</span>
          </p>
        </div>
      )}
    </>
  );
};
