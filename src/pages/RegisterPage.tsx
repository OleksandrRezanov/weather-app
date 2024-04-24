import { Link } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import Loader from "../components/Loader";
import React, { useState } from "react";

export const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h1>Register</h1>

        <SignUp isLoading={isLoading} setIsLoading={setIsLoading} />

        <p>
          Already have account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </>
  );
};
