import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import NewsCard from './NewsCard';
import WeatherTable from './WeatherTable';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const NEWS_KEY = process.env.REACT_APP_NEWS_API_KEY;
const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const hourUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?";
const dailyUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?";
const newsUrl = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?";

const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [topNews, setTopNews] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!cityName.trim()) {
        setErrorMessage('Please enter a city name');
        return;
      }

      const { lat, lon } = await getLatLon(cityName);
      setErrorMessage('');
      fetchWeatherData(lat, lon);
      fetchHourlyWeatherData(lat, lon);
      fetchDailyWeatherData(lat, lon);
      fetchTopNews();
    } catch (error) {
      console.error('Error fetching location data:', error);
      setErrorMessage('Failed to fetch location data');
    }
  };

  const getLatLon = async (city) => {
    const formattedUrl = `${geocodingUrl}${city}&appid=${WEATHER_KEY}`;
    const response = await fetch(formattedUrl);
    const data = await response.json();
    if (!data.length) {
      throw new Error('City not found');
    }
    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  };

  const fetchWeatherData = async (lat, lon) => {
    const formattedUrl = `${weatherUrl}lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`;
    const response = await fetch(formattedUrl);
    const data = await response.json();
    setCurrentWeather(data);
  };

  const fetchHourlyWeatherData = async (lat, lon) => {
      const formattedUrl = `${hourUrl}lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`;
      const response = await fetch(formattedUrl);
      const data = await response.json();
      setHourlyForecast(data);
  };

  const fetchDailyWeatherData = async (lat, lon) => {
    const formattedUrl = `${dailyUrl}lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`;
    const response = await fetch(formattedUrl);
    const data = await response.json();
    setDailyForecast(data);
  };

  const fetchTopNews = async () => {
    const formattedUrl = `${newsUrl}api-key=${NEWS_KEY}`;
    const response = await fetch(formattedUrl);
    const data = await response.json();
    setTopNews(data);
  };

  return (
    <div>
      <TextField
        id="cityName"
        label="Enter city name"
        value={cityName}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Search</Button>
      <h2>Current Weather</h2>
      <div className="main-weather">
          {currentWeather && <WeatherCard city={cityName} weather={currentWeather["weather"][0]} main={currentWeather["main"]} time="current" size={600}/>}
      </div>
      <h2>Hourly Forecast</h2>
      <div className="cards">
          {hourlyForecast && hourlyForecast['list'].slice(0, 24).map((hr, i) => (
              <div key={i} className="row">
                  <WeatherTable time={"+" + (i + 1) + " hour(s)"} weather={hr["weather"][0]} temp= {hr["main"]['temp']} />
              </div>
          ))}
      </div>
      <h2>Daily Forecast</h2>
      <div className="cards">
          {dailyForecast && dailyForecast['list'].map((day, i) => (
              <div key={i} className="row">
                  <WeatherTable key={i} time={"+" + (i + 1) + " day(s)"} weather={day["weather"][0]} temp= {day["temp"]["day"]}/>
              </div>
          ))}
      </div>
      <h2>Top News</h2>
      <div className="cards">
          {topNews && topNews['results'].slice(0, 5).map((article, i) => (
              <div key={i} className="row">
                  <NewsCard title={article['title']} author={article['byline']} abs={article['abstract']} url={article["url"]}/>
              </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherApp;
