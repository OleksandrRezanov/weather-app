import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Form from "./Form";
import { setUser } from '../store/slices/usersSlice';
import { auth } from "../firebase";
import React, { useState } from "react";

interface Props {
  isLoading: boolean,
  setIsLoading: (param: boolean) => void,
}

export const SignUp: React.FC<Props> = ({ isLoading, setIsLoading }) => {
  const dispatch = useDispatch();
  const [signUpError, setSignUpError] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({
        id: user.uid,
        email: user.email,
        cities: ['Kyiv'],
      }));
    } else {
      dispatch(setUser(null));
    }

    isLoading && setIsLoading(false);
  });

  const handleSignUp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string,
  ) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setSignUpError(`Error code: ${errorCode}, error message: ${errorMessage}`);
      });
  };

  return (
    <>
      <Form buttonTitle="Sign up" handleClick={handleSignUp} setSignUpError={setSignUpError} />
      {signUpError && (
        <div style={{ color: 'red', textAlign: 'center' }}>{signUpError}</div>
      )}
    </>
  );
};
