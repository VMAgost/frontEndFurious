import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const trackLength = 1200;

const Race = () => {
  const [cars, setCars] = useState([]);
  const [randomCarIndex, setRandomCarIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);

  useEffect(() => {
    const randomIndex = Math.ceil(Math.random() * 3);
    setRandomCarIndex(randomIndex);
  }, []);

  console.log(cars);

  function raceCars() {
    if (cars.length < 2) {
      console.log('Loading cars...');
      return;
    }

    const fixedCarIndex = 0;
    const randomCarIndex = 1 + Math.floor(Math.random() * 3);

    const AICar = cars[fixedCarIndex];
    const randomCar = cars[randomCarIndex];

    const timeToFinishAICar = (trackLength / AICar.acceleration) ** 0.5;
    const timeToFinishRandomCar = (trackLength / randomCar.acceleration) ** 0.5;

    if (timeToFinishAICar > timeToFinishRandomCar) {
      return (`winner is PLAYER: ${randomCar.manufacturer}, winner time is: ${timeToFinishRandomCar}`)
    } else if (timeToFinishAICar < timeToFinishRandomCar) {
      return (`winner is AI: ${AICar.manufacturer}, winner time is: ${timeToFinishAICar}`)
    } else {
      return (`its a tie`)
    }

  }
  // raceCars()

  return (
    <div>
      {raceCars()}
    <Link to={'/api/garage'}><button>Garage</button></Link>
    </div>
  )
}

export default Race;

