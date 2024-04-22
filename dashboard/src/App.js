import React from 'react';
import Dashboard from './Dashboard';  
import Header from './Header'; 
import MoodSection from './MoodSection'; 
import Footer from './Footer';
import Dog from './Dog';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <MoodSection />
      <Dashboard />
      <Dog />
      <Footer />
    </div>
  );
}

export default App;

