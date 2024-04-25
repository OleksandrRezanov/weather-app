import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import bgImage from '../img/sun-with-cloude.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, setUser } from '../store/slices/usersSlice';
import { WeatherData } from '../types/WeatherData';
import { db } from '../firebase';
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const units = 'metric';

interface Props {
  city: string,
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

const CityCard: React.FC<Props> = ({ city }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData);
  const registeredUser = useSelector(selectUsers).currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      onUpdateWeather();

      setIsLoading(false);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateWeather = async (): Promise<void> => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
      const data = await response.json();
      setWeatherData(data.main);
      console.log('Updated weather data for', city, ':', data);
    } catch (error) {
      console.error('Error updating weather data:', error);
    }
  };

  const { temp, feels_like } = weatherData;
  const dispatch = useDispatch();

  const handleUpdateWeather = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setIsLoading(true);
    await onUpdateWeather();
    setIsLoading(false);
  };

  const handleDeleteCity = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (!!registeredUser) {
      const userRef = doc(db, "users", registeredUser.docId);

      try {
        await updateDoc(userRef, {
          cities: arrayRemove(city)
        });

        const citiesWithoutDeleted = registeredUser.cities.filter((item: string) => item !== city);
        dispatch(setUser({ ...registeredUser, cities: citiesWithoutDeleted }));

      } catch (error) {
        console.error("Error adding new city:", error);
      }
    }
  };

  const onDetail = () => {
    dispatch(setUser({ ...registeredUser, city }));

    navigate(`/weatherApp/${city}`);
  };

  return (
    <Card onClick={onDetail} sx={{ maxWidth: '250px', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', cursor: 'pointer' }} >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <Typography variant="h5" component="div">
          {city}
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center">
          Temperature: {Math.round(temp)}°C
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center">
          Feels like: {Math.round(feels_like)}°C
        </Typography>

        <Button
          variant="outlined"
          onClick={(event) => handleUpdateWeather(event)}
          disabled={isLoading}
          sx={{
            color: 'black',
            '&:hover': {
              backgroundColor: '#FFFFFF4C',
            },
          }}
        >
          {isLoading ? 'Updating...' : 'Update weather now'}
        </Button>


        <IconButton onClick={(event) => handleDeleteCity(event)} sx={{ color: 'red' }}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CityCard;
