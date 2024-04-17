import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Card, CardContent, Box, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Dashboard() {
    const [weatherData, setWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [error, setError] = useState('');
    const [location, setLocation] = useState('Los Angeles');

    const locations = useMemo(() => [
        { name: 'Los Angeles', lat: 34.052235, lon: -118.243683 },
        { name: 'New York', lat: 40.712776, lon: -74.005974 },
        { name: 'Chicago', lat: 41.878113, lon: -87.629799 }
    ], []);

    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const airQualityApiKey = process.env.REACT_APP_AIR_QUALITY_API_KEY;

    useEffect(() => {
        async function fetchData() {
            const selectedLocation = locations.find(l => l.name === location);
            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&appid=${weatherApiKey}&units=metric`);
                if (!weatherResponse.ok) {
                    throw new Error('Weather data fetch failed');
                }
                const weatherData = await weatherResponse.json();
                setWeatherData(weatherData);

                const body = { location: { latitude: selectedLocation.lat, longitude: selectedLocation.lon } };
                const airQualityResponse = await fetch(`https://airquality.googleapis.com/v1/currentConditions:lookup?key=${airQualityApiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                if (!airQualityResponse.ok) {
                    throw new Error('Air quality data fetch failed');
                }
                const airQualityData = await airQualityResponse.json();
                setAirQualityData(airQualityData);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch data:', error);
            }
        }

        fetchData();
    }, [location, locations]);

    function getRecommendation(weather, airQuality) {
        let message = '';
        if (!weather || !airQuality) {
            return message;
        }
    
        const temp = weather.main.temp;
        const aqi = airQuality.indexes[0].aqi;
    
        if (temp > 30 && aqi <= 50) {
            message = 'It\'s very hot but the air is clean. Stay hydrated and wear sunscreen if you go outside.';
        } else if (temp > 30 && aqi > 150) {
            message = 'It\'s extremely hot and the air quality is poor. Avoid outdoor activities and stay hydrated.';
        } else if (temp < 0 && aqi > 100) {
            message = 'Freezing temperatures with poor air quality. Limit outdoor exposure and stay warm.';
        } else if (temp < 0 && aqi <= 50) {
            message = 'It\'s very cold but the air is clean. Dress warmly and enjoy outdoor activities safely.';
        } else if (temp > 25 && aqi > 100) {
            message = 'It is quite hot and the air quality is poor. Consider staying indoors or taking precautions if going outside.';
        } else if (temp < 13) {
            message = 'It is chilly. Dress warmly and check air quality advisories before planning outdoor activities.';
        } else if (aqi > 150) {
            message = 'Air quality is very poor. It is recommended to stay indoors or use air filtration masks if going outside.';
        } else if (aqi < 50) {
            message = 'The air quality is excellent. It\'s a great day for outdoor activities.';
        } else {
            message = 'Weather and air quality are moderate. Enjoy your day, but stay aware of changes.';
        }
    
        return message;
    }
    

    return (
        <Container>
            <FormControl fullWidth margin="normal">
                <InputLabel id="location-select-label">Select Location</InputLabel>
                <Select
                    labelId="location-select-label"
                    value={location}
                    label="Select Location"
                    onChange={e => setLocation(e.target.value)}
                >
                    {locations.map(loc => (
                        <MenuItem key={loc.name} value={loc.name}>{loc.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="h4" gutterBottom>{weatherData && airQualityData ? `Weather & Air Quality Monitor for ${location}` : 'Loading...'}</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {weatherData ? (
                <Card variant="outlined" sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">Weather Data</Typography>
                        <Typography>Temperature: {weatherData.main?.temp.toFixed(1)}°C</Typography>
                        <Typography>Weather: {weatherData.weather[0]?.main}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <CircularProgress />
                </Box>
            )}
            {airQualityData ? (
                <Card variant="outlined" sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">Air Quality Data</Typography>
                        <Typography>AQI: {airQualityData.indexes[0]?.aqi}</Typography>
                        <Typography>Category: {airQualityData.indexes[0]?.category}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <CircularProgress />
                </Box>
            )}
            {weatherData && airQualityData && (
            <Card variant="outlined" sx={{ my: 2 }}>
                <CardContent>
                    <Typography variant="h5">Recommendation</Typography>
                    <Typography>{getRecommendation(weatherData, airQualityData)}</Typography>
                </CardContent>
            </Card>
        )}
        </Container>
    );
    
}

export default Dashboard;
