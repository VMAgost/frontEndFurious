import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Race = () => {
  const trackLength = 1200;
  const [cars, setCars] = useState([]);


  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);


  console.log(cars);

  function raceCars() {
    if (cars.length < 2) {
      console.log('Loading cars...');
      return;
    }

    const fixedCarIndex = 0;
    const randomIndex = Math.floor(Math.random() * cars.length);
    if (randomIndex === 0) {
      randomIndex + 1;
    }
    console.log(randomIndex)
    const AICar = cars[fixedCarIndex];
    const randomCar = cars[randomIndex];
    console.log(randomCar)
    const aiAcceleration = ((AICar.top_speed * 1000) / 3600) / AICar.acceleration;
    const randomAcceleration = ((randomCar.top_speed * 1000) / 3600) / randomCar.acceleration;
  
    const timeToFinishAICar = Math.sqrt(2 * trackLength / aiAcceleration)
    const timeToFinishRandomCar = Math.sqrt(2 * trackLength / randomAcceleration)
    console.log('AI', timeToFinishAICar)
    console.log('Player', timeToFinishRandomCar)

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

