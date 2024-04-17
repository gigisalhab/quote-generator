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

    const weatherApiKey = 'd886d781466644d6be038d35c299267e';
    const airQualityApiKey = 'AIzaSyAS3PvsHfUvxKss2H5LDz7wKLGKJ0salf0';

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
            <Typography variant="h4" gutterBottom>{weatherData ? `Weather & Air Quality Monitor for ${location}` : 'Loading...'}</Typography>
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
        </Container>
    );
}

export default Dashboard;
