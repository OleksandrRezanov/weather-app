import React from 'react';
import './App.css';
import CityCard from './components/CityCard';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { collection, getDocs } from "firebase/firestore";

const apiKey = '7bafd2826dbe7f0753911f8e8a5cd45f';
const city = 'Kharkiv';
const units = 'metric';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });


const onUpdateWeather = async (city: string) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
    const data = await response.json();
    console.log('Updated weather data for', city, ':', data);
  } catch (error) {
    console.error('Error updating weather data:', error);
  }
};

const onDetail = () => {
  console.log('Navigate to detail page or show detail information');
};

const onDeleteCity = () => { };


const App = () => {

  return (
    <>
      <Header />
      <div>
        <Outlet />
        <CityCard city='Kharkiv' temperature={25} description='All fine' onUpdateWeather={onUpdateWeather} onDetail={onDetail} onDeleteCity={onDeleteCity} />
      </div>
    </>
  );
}

export default App;
