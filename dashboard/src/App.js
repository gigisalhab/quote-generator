import React from 'react';
import Dashboard from './Dashboard';  
import Header from './Header'; 
import MoodSection from './MoodSection'; 
import Footer from './Footer';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <MoodSection />
      <Dashboard />
      <Footer />
      
    </div>
  );
}

export default App;

