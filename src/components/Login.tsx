import { useDispatch } from "react-redux";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Form from "./Form";
import { setUser } from '../store/slices/usersSlice';
import { auth, db } from "../firebase";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { User } from "../types/User";

interface Props {
  isLoading: boolean,
  setIsLoading: (param: boolean) => void,
}

export const Login: React.FC<Props> = ({ isLoading, setIsLoading }) => {
  const dispatch = useDispatch();
  const [signUpError, setSignUpError] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const getUserFromDb = async (): Promise<void> => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const usersFromDb: User[] = querySnapshot.docs.map((doc): User => ({ id: doc.id, ...doc.data() } as User));
          const currentUserFromDb: User | undefined = usersFromDb.find((userFromDb: User): boolean => userFromDb.email === user.email);
      
          if (currentUserFromDb) {
            dispatch(setUser({
              id: user.uid,
              email: user.email,
              docId: currentUserFromDb.id,
              cities: currentUserFromDb.cities,
            }));
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          console.error('Error fetching users from database:', error);
        }
      };

      getUserFromDb();

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
