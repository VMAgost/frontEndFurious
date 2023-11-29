
import React from 'react';
import './App.css';
import Race from './components/Race';
import { useState, useEffect } from 'react'
import './App.css'
import Allcars from './components/Allcars';


function App() {

const [allCars, setAllCars] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/cars')
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);





  return (
    <>
      <div>
        {allCars && <Allcars allcars={allCars} />}
      </div>
    </>
  );
}

export default App;
