import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

function Dog() {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRandomDogImage = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setImageUrl(data.message); // 'message' field contains the URL of the random dog image
    } catch (err) {
      setError(`Failed to fetch image: ${err.message}`);
      console.error('Error fetching image:', err);
    }
    setIsLoading(false);
  };

  return (
    <Container sx={{
      backgroundColor: '#D7DEDC', 
      padding: '20px',
      marginTop: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Click here for a quick smile!</Typography> {/* Updated title */}
      <Button variant="contained" sx={{ backgroundColor: '#7A3B69' }} onClick={fetchRandomDogImage}> {/* Updated button color */}
        Fetch Random Dog
      </Button>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      ) : imageUrl ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <img src={imageUrl} alt="Random Dog" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
        </Box>
      ) : null}
    </Container>
  );
}

export default Dog;
