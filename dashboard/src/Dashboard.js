import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Dashboard() {
    const [mood, setMood] = useState('');
    const [quote, setQuote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const moods = ['inspirational', 'reflective', 'sad', 'happy'];

    const fetchQuote = async (mood) => {
        setIsLoading(true);
        setError('');
        try {
            // Assuming the endpoint URL for fetching quotes based on mood (update as per actual documentation)
            const response = await fetch(`https://api.api-ninjas.com/v1/quotes?genre=${mood}`, {
                headers: {
                    'X-Api-Key': 'rMTjSj/KtImzLjQFr1QtDg==QXLhwM9JFEpHOzDd'
                }
            });
            const data = await response.json();
            if (data && data.length > 0) {
                setQuote(data[0].quoteText);
            } else {
                setError('No quotes found.');
            }
        } catch (err) {
            setError('Failed to fetch quote.');
            console.error('Error fetching quote:', err);
        }
        setIsLoading(false);
    };

    const handleMoodChange = (event) => {
        const selectedMood = event.target.value;
        setMood(selectedMood);
        fetchQuote(selectedMood);
    };

    return (
        <Container>
            <FormControl fullWidth margin="normal">
                <InputLabel id="mood-select-label">Select Mood</InputLabel>
                <Select
                    labelId="mood-select-label"
                    value={mood}
                    label="Select Mood"
                    onChange={handleMoodChange}
                >
                    {moods.map((moodOption) => (
                        <MenuItem key={moodOption} value={moodOption}>{moodOption}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="h4" gutterBottom>
                Mood Based Quote Generator
            </Typography>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <Typography>Loading...</Typography>
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Card variant="outlined" sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{quote}</Typography>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}

export default Dashboard;
