import { useDispatch } from "react-redux";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Form from "./Form";
import { setUser } from '../store/slices/usersSlice';
import { auth } from "../firebase";
import { useState } from "react";

interface Props {
  isLoading: boolean,
  setIsLoading: (param: boolean) => void,
}

export const Login: React.FC<Props> = ({ isLoading, setIsLoading }) => {
  const dispatch = useDispatch();
  const [signUpError, setSignUpError] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({
        id: user.uid,
        email: user.email,
      }));
    } else {
      dispatch(setUser(null));
    }

    isLoading && setIsLoading(false);
  });

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, mail: string, password: string) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, mail, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setSignUpError(`Error code: ${errorCode}, error message: ${errorMessage}`);
      });
  };

  return (
    <>
      <Form buttonTitle="Login" handleClick={handleLogin} setSignUpError={setSignUpError} />
      {signUpError && (
        <div style={{ color: 'red', textAlign: 'center' }}>{signUpError}</div>
      )}
    </>
  );
};

export default Login;
