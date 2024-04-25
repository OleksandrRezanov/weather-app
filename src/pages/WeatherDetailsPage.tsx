import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import bgImage from '../img/sun-with-cloude.jpg';
import { useSelector } from 'react-redux';
import { selectUsers} from '../store/slices/usersSlice';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const units = 'metric';


const onUpdateWeather = async (city: string): Promise<void> => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
    const data = await response.json();
    console.log('Updated weather data for', city, ':', data);
  } catch (error) {
    console.error('Error updating weather data:', error);
  }
};

interface WeatherData {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

const initialWeatherData = {
  feels_like: 0,
  grnd_level: 0,
  humidity: 0,
  pressure: 0,
  sea_level: 0,
  temp: 0,
  temp_max: 0,
  temp_min: 0,
};

const cardStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
}

const weatherDataStyle = { fontSize: '30px' };

export const WeatherDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData);
  const registeredUser = useSelector(selectUsers);
  const cityForDetails = registeredUser.currentUser.city;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityForDetails}&appid=${apiKey}&units=${units}`);
        const data = await response.json();
        setWeatherData(data.main);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [cityForDetails]);

  const {
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    pressure,
  } = weatherData;

  const handleUpdateWeather = async () => {
    setIsLoading(true);
    await onUpdateWeather(cityForDetails);
    setIsLoading(false);
  };

  const handleBackToApp = () => {
    navigate('/weatherApp')
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button
        variant="contained"
        onClick={handleBackToApp}
      >
        ← Back to WeatherAPP
      </Button>

      <Card sx={cardStyles} >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '80%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" component="div">
            {cityForDetails}
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center" sx={weatherDataStyle} >
            Temperature: {Math.round(temp)} °C
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={weatherDataStyle} >
            Feels like: {Math.round(feels_like)} °C
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={weatherDataStyle} >
            Max temperature: {Math.round(temp_max)} °C
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={weatherDataStyle} >
            Min temperature: {Math.round(temp_min)} °C
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={weatherDataStyle} >
            Pressure: {Math.round(pressure)} hPa
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={weatherDataStyle} >
            Humidity: {Math.round(humidity)} hPa
          </Typography>

          <Button
            variant="outlined"
            onClick={handleUpdateWeather}
            disabled={isLoading}
            sx={{
              display: 'block',
              width: '80%',
              fontSize: '30px',
              color: 'black',
              '&:hover': {
                backgroundColor: '#FFFFFF4C',
              },
            }}
          >
            {isLoading ? 'Updating...' : 'Update weather now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
