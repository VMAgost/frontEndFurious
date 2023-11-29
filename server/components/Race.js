import { useState, useEffect } from 'react';

const trackLength = 1200;

const Race = () => {
  const [cars, setCars] = useState([]);
  const [randomCarIndex, setRandomCarIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/cars')
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
      console.error('Not enough cars to race.');
      return;
    }

    const fixedCarIndex = 0;
    const randomCarIndex = 1 + Math.floor(Math.random() * 3);

    const AICar = cars[fixedCarIndex];
    const randomCar = cars[randomCarIndex];

    const timeToFinishAICar = (trackLength / AICar.acceleration) ** 0.5;
    const timeToFinishRandomCar = (trackLength / randomCar.acceleration) ** 0.5;

    let winner = null;
    if (timeToFinishAICar > timeToFinishRandomCar) {
      winner = randomCar;
    } else if (timeToFinishAICar < timeToFinishRandomCar) {
      winner = AICar;
    } else {
      winner = 'It\'s a tie!';
    }

    console.log('Winner is: ', winner.manufacturer);
  }
  raceCars()
}

export default Race;

