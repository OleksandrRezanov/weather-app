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

const apiKey = '7bafd2826dbe7f0753911f8e8a5cd45f';
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

interface WeatherCardProps {
  city: string;
  onDeleteCity: (city: string) => void;
}

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

const CityCard: React.FC<WeatherCardProps> = ({ city, onDeleteCity }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData);
  const navigate = useNavigate();
  const registeredUser = useSelector(selectUsers);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
        const data = await response.json();
        setWeatherData(data.main);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const { temp, feels_like } = weatherData;
  const dispatch = useDispatch();

  const handleUpdateWeather = async () => {
    setIsLoading(true);
    await onUpdateWeather(city);
    setIsLoading(false);
  };

  const handleDeleteCity = () => {
    onDeleteCity(city);
  };

  const onDetail = () => {
    dispatch(setUser({ ...registeredUser, city }));

    navigate('details');
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
          onClick={handleUpdateWeather}
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


        <IconButton onClick={handleDeleteCity} sx={{ color: 'red' }}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CityCard;
