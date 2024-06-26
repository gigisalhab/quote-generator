import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Dashboard() {
  const [mood, setMood] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const moods = ['inspirational', 'reflective', 'happy'];

  const fetchQuote = async (selectedMood) => {
    setIsLoading(true);
    setError('');
    try {
      const moodTags = {
        inspirational: "inspiration|success",
        reflective: "wisdom|philosophy",
        happy: "happiness|joy"
      };

      const params = new URLSearchParams({
        tags: moodTags[selectedMood] || "famous",
        limit: 10  
      });

      const url = `https://api.quotable.io/quotes?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { results } = await response.json();

      if (results && results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        setQuote(results[randomIndex].content);
        setAuthor(results[randomIndex].author);
      } else {
        setError('No quotes found for the selected mood.');
        loadFallbackQuote();
      }
    } catch (err) {
      setError('Failed to fetch quote.');
      console.error('Error fetching quote:', err);
    }
    setIsLoading(false);
  };

  const loadFallbackQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch fallback quote');
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching fallback quote:', error);
    }
  };

  const handleMoodChange = (event) => {
    const selectedMood = event.target.value;
    setMood(selectedMood);
    fetchQuote(selectedMood);
  };

  return (
    <Container sx={{backgroundColor: '#9A879D' }}>
      <FormControl fullWidth margin="normal" sx={{ background: 'white', borderRadius: '4px', boxShadow: 1, mt: 8}}>
        {!mood && <InputLabel id="mood-select-label">Select your Mood...</InputLabel>}
        <Select
          labelId="mood-select-label"
          id="mood-select"
          name="mood"
          value={mood}
          label={!mood ? "Select your Mood..." : ''}
          onChange={handleMoodChange}
          sx={{ borderRadius: '4px', '.MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        >
          {moods.map((moodOption) => (
            <MenuItem key={moodOption} value={moodOption}>{moodOption}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {isLoading ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Card variant="outlined" sx={{ my: 2, background: 'white', borderRadius: '4px', boxShadow: 1, mb: 8, padding: '32px' }}>
            <CardContent>
                <Typography variant="h4" component="p" sx={{ fontSize: '1.5rem', marginBottom: '20px' }}>{quote}</Typography>
                {author && (
                    <Typography variant="subtitle1" color="textSecondary">{`- ${author}`}</Typography>
                )}
        </CardContent>
    </Card>

      )}
    </Container>
  );
}

export default Dashboard;
