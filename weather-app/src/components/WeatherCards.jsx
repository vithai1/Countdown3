import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './../App.css'

  export default function WeatherCard(data) {
    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom> 
              {data["time"]}
            </Typography>
            <Typography variant="h3" component="div">
              {data['city']}
            </Typography>
            <Typography sx={{mb: 1.5}} variant="body">
              {data['weather']['main']}: {data['weather']['description']}
            </Typography>
            <img style={{width: 50, height: 50}} src={'https://openweathermap.org/img/wn/' + data['weather']['icon'] + '@2x.png'}></img>
            <Typography variant="h4" component="div">
              {Math.round(data["main"]["temp"] - 273.15)}°
            </Typography>
            <Typography variant="body">
              Min: {Math.round(data["main"]["temp_min"] - 273.15)}°  Max: {Math.round(data["main"]["temp_max"] - 273.15)}°
            </Typography>
          </CardContent>
        </React.Fragment>
      );

    return (
      <Box sx={{ width: data['size']}}>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }