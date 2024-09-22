import { useState, useEffect } from 'react';
import GrowthComponent from './components/GrowthPoints';
import Header from './components/Header';
import PlantImg from './components/PlantImg';
import './App.css';

function App() {

  useEffect(() => {
    console.log("App mounted");
}, []);


  const [growthPoints, setGrowthPoints] = useState(0);
  const [gps, setGps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrowthPoints(prevPoints => prevPoints + gps);
    }, 1000);

    return () => clearInterval(interval);
  }, [gps]);

  const handleClick = () => {
    setGrowthPoints(prevPoints => prevPoints + 1);
  };

  return (
    <>
    <div className="App">
      <Header />
      <PlantImg />
      <GrowthComponent 
        growthPoints={growthPoints} 
        gps={gps}
        onGrowthClick={handleClick}
      />
    </div>
    </>
  );
}

export default App;