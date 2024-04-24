import { Link } from "react-router-dom";
import { Login } from "../components/Login";
import Loader from "../components/Loader";
import React, { useState } from "react";

export const LoginPage:React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h1>Login</h1>

        <Login isLoading={isLoading} setIsLoading={setIsLoading} />

        <p>
          Or <Link to="/register">register</Link>
        </p>
      </div >
    </>
  );
};
