import React from 'react';
import './App.css';
import CityCard from './components/CityCard';
import { Header } from './components/Header';
import { selectUsers } from './store/slices/usersSlice';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const registeredUser = useSelector(selectUsers).currentUser;

  return (
    <>
      <Header/>
      <div style={{padding: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'}}>
        {registeredUser.cities.map((city: string) => (
          <CityCard key={city} city={city} />
        ))}
      </div>
    </>
  );
}

export default App;
