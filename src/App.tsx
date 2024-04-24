import React, { useEffect, useState } from 'react';
import './App.css';
import CityCard from './components/CityCard';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import { selectUsers } from './store/slices/usersSlice';
import { useSelector } from 'react-redux';
import { User } from './types/User';

const onDeleteCity = () => { };

const App: React.FC = () => {
  const [authorizedUser, setAuthorizedUser] = useState<User | null>(null);

  const registeredUser = useSelector(selectUsers);
  const registeredUserEmail: string = registeredUser.currentUser.email;

  const getCurrentUserFromDb = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users: User[] = querySnapshot.docs.map((doc): User => ({ id: doc.id, ...doc.data() } as User));
      const currentUserFromDb: User | undefined = users.find((user: User): boolean => user.email === registeredUserEmail);
  
      if (currentUserFromDb) {
        setAuthorizedUser(currentUserFromDb);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching users from database:', error);
    }
  };
  

  useEffect(() => {
    getCurrentUserFromDb();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header authorizedUser={authorizedUser} setAuthorizedUser={setAuthorizedUser} />
      <div style={{padding: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'}}>
        <Outlet />
        {authorizedUser?.cities.map(city => (
          <CityCard key={city} city={city} onDeleteCity={onDeleteCity} />
        ))}
      </div>
    </>
  );
}

export default App;
