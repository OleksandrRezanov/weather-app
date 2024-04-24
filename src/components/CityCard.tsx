import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import bgImage from '../img/sun-with-cloude.jpg';



interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  onUpdateWeather: (city: string) => Promise<void>;
  onDeleteCity: (city: string) => void;
  onDetail: () => void;
}

const CityCard: React.FC<WeatherCardProps> = ({ city, temperature, description, onUpdateWeather, onDetail, onDeleteCity }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateWeather = async () => {
    setIsLoading(true);
    await onUpdateWeather(city);
    setIsLoading(false);
  };

  const handleDeleteCity = () => {
    onDeleteCity(city);
  };

  return (
    <Card onClick={onDetail} sx={{ maxWidth: '250px', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', cursor: 'pointer' }} >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <Typography variant="h5" component="div">
          {city}
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center">
          Temperature: {temperature}°C
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center">
          Description: {description}
        </Typography>

        <Button
          variant="outlined"
          onClick={handleUpdateWeather}
          disabled={isLoading}
          sx={{
            color: 'black', // Колір тексту
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
