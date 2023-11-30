import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Race = () => {
  const trackLength = 1200;
  const [opponentCars, setOpponentCars] = useState(null);
  const [userCars, setUserCars] = useState(null);
  const [raceResult, setRaceResult] = useState('');
  const [raceCount, setRaceCount] = useState(0);
  const [allCars, setAllCars] = useState([]);
  const [randomOppIndex, setRandomOppIndex] = useState(0);
  const [randomUserIndex, setRandomUserIndex] = useState(0);
  const [userWins, setUserWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0)
  const [view, setView] = useState(true);


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

    if (raceCount < allCars.length / 2) {
      const opponentCar = opponentCars[randomOppIndex];
      const userCar = userCars[randomUserIndex];

      const aiAcceleration = ((opponentCar.top_speed * 1000) / 3600) / opponentCar.acceleration;
      const randomAcceleration = ((userCar.top_speed * 1000) / 3600) / userCar.acceleration;

      const timeToFinishAICar = Math.sqrt(2 * trackLength / aiAcceleration);
      const timeToFinishRandomCar = Math.sqrt(2 * trackLength / randomAcceleration);
      console.log('AI', timeToFinishAICar);
      console.log('Player', timeToFinishRandomCar);
      console.log('opp', opponentCar);
      console.log('user', userCar);
      if (timeToFinishAICar > timeToFinishRandomCar) {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setUserWins((prev) => prev + 1);
        setRaceResult(  <>
          <h1>Winner is AI: {userCar.manufacturer} {userCar.model}</h1>
          <p>Winner time is: {timeToFinishRandomCar}</p>
          <div className='carpic' ><img className='carPhoto' src={userCar.image} alt={userCar.manufacturer}></img></div>
        </>);
      } else if (timeToFinishAICar < timeToFinishRandomCar) {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setOpponentWins((prev) => prev + 1);
        setRaceResult(
          <>
            <h1>Winner is AI: {opponentCar.manufacturer} {opponentCar.model}</h1>
            <p>Winner time is: {timeToFinishAICar}</p>
            <div className='carpic' ><img className='carPhoto' src={opponentCar.image} alt={opponentCar.manufacturer}></img></div>
          </>
        );
      } else {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setOpponentWins((prev) => prev + 1);
        setUserWins((prev) => prev + 1);
        setRaceResult('Its a tie!');
      }

      setRaceCount((prev) => prev + 1);
    } else {
      if (userWins > opponentWins) {
        setRaceResult(<h1>User Won!</h1>);
        setView(false)
      } else if (opponentWins > userWins) {
        setRaceResult(<h1>Opponent Won!</h1>);
        setView(false)
      } else {
        setRaceResult(<h1>Its a Tie!</h1>);
        setView(false)
      }
    }
  }
  let result = '';
  if (raceCount === 0) {
    result = 'Start'
  } else if (raceCount === (allCars.length / 2)) {
    result = 'And the winner is...'
  }
  else {
    result = `Round: ${raceCount}`
  }

  return (
    <div>
      <img className="toretto" src="./toretto.png" /><p></p>
      {view === true &&
        <>

          <div className="race-button">
            <button onClick={() => raceCars()} disabled={raceCount >= (allCars.length / 2 + 1)}>
              {result}
            </button>
          </div>
        </>
      }
    <div className='race'>
{view === true && 
      <button onClick={() => raceCars()} disabled={raceCount >= (allCars.length / 2 + 1)}>
        {result}
        {}
      </button>
}
      <div>{raceResult}</div>
      {view === false &&
        <>
          <img src="../ch_flag.png" alt="checkered-flag" /><p></p>
          <Link to={'/garage'}>
            <button>Garage</button>
          </Link>
        </>
      }
      {view === false &&
        <Link to={'/'}>
          <button>Home</button>
        </Link>
      }

    </div>
  )
}

export default Race;