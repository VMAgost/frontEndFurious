
import React from 'react';
import './App.css';
import Race from './components/Race';
import { useState, useEffect } from 'react'
import './App.css'
import Allcars from './components/Allcars';
import Garage from './components/Garage';
import Warmup from './components/Warmup';
import { Link } from 'react-router-dom';


function App() {

  const [allCars, setAllCars] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);


  return (
    <>
      <div>
        {allCars && <Garage allCars={allCars} />}
        {allCars && <Warmup allCars={allCars} />}
        <Allcars allcars={allCars} />
        <Link to={'/api/garage'}><button>Garage</button></Link>
        <Link to={'/api/warmup'}><button>Warmup</button></Link>
      </div>
    </>
  );
}

export default App;
