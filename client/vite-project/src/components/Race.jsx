import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Race = () => {
  const trackLength = 1200;
  const [opponentCars, setOpponentCars] = useState(null);
  const [userCars, setUserCars] = useState(null);
  const [raceResult, setRaceResult] = useState('');

  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);

  useEffect(() => {
    if (allCars.length > 0) {
      const randomCars = [...allCars].sort(() => 0.5 - Math.random());
      const getOpponentCars = randomCars.slice(0, allCars.length / 2);
      const getUserCars = randomCars.slice(allCars.length / 2);
      setUserCars(getUserCars);
      setOpponentCars(getOpponentCars);
    }
  }, [allCars]);

  function raceCars() {
    if (!opponentCars || !userCars) {
      console.log('Loading cars...');
      return;
    }
    const randomOppIndex = Math.ceil(Math.random() * opponentCars.length - 1);
    const randomUserIndex = Math.ceil(Math.random() * userCars.length - 1)

    const opponentCar = opponentCars[randomOppIndex];
    const userCar = userCars[randomUserIndex];

    const aiAcceleration = ((opponentCar.top_speed * 1000) / 3600) / opponentCar.acceleration;
    const randomAcceleration = ((userCar.top_speed * 1000) / 3600) / userCar.acceleration;

    const timeToFinishAICar = Math.sqrt(2 * trackLength / aiAcceleration);
    const timeToFinishRandomCar = Math.sqrt(2 * trackLength / randomAcceleration);
    console.log('AI', timeToFinishAICar);
    console.log('Player', timeToFinishRandomCar);
    console.log('opp', opponentCar)
    console.log('user', userCar)
    if (timeToFinishAICar > timeToFinishRandomCar) {
      setRaceResult(`Winner is PLAYER: ${userCar.manufacturer}, winner time is: ${timeToFinishRandomCar}`);
    } else if (timeToFinishAICar < timeToFinishRandomCar) {
      setRaceResult(`Winner is AI: ${opponentCar.manufacturer}, winner time is: ${timeToFinishAICar}`);
    } else {
      setRaceResult("It's a tie");
    }
  }

  return (
    <div>
      <button onClick={() => raceCars()}>Race</button>
      <div>{raceResult}</div>
      <Link to={'/garage'}>
        <button>Garage</button>
      </Link>
    </div>
  );
};

export default Race;


