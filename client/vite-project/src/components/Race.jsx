import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Race = () => {
  const [trackLength, setTrackLength] = useState(1200)
  const [opponentCars, setOpponentCars] = useState(null);
  const [userCars, setUserCars] = useState(null);
  const [raceResult, setRaceResult] = useState('');
  const [raceCount, setRaceCount] = useState(0);
  const [allCars, setAllCars] = useState([]);
  const [randomOppIndex, setRandomOppIndex] = useState(0);
  const [randomUserIndex, setRandomUserIndex] = useState(0);
  const [userWins, setUserWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0);
  const [view, setView] = useState(false);

  const fetchLowCars = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/cars/low')
      const lowCarsData = await response.json()
      setAllCars(lowCarsData)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMidCars = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/cars/mid')
      const lowCarsData = await response.json()
      setAllCars(lowCarsData)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSuperCars = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/cars/super')
      const lowCarsData = await response.json()
      setAllCars(lowCarsData)
    } catch (error) {
      console.log(error);
    }
  }

  const handleLowCarsClick = () => {
    fetchLowCars();
  }

  const handleMidCarsClick = () => {
    fetchMidCars()
  }

  const handleSuperCarsClick = () => {
    fetchSuperCars()
  }

  const handleShortTrackClick = () => {
    setTrackLength(400);
    setView(true)
  }

  const handleMidTrackClick = () => {
    setTrackLength(800);
    setView(true)
  }

  const handleLongTrackClick = () => {
    setTrackLength(1200);
    setView(true)
  }

  /*  useEffect(() => {
     fetchLowCars()
     fetchMidCars()
     fetchSuperCars()
       .then((res) => res.json())
       .then((data) => setAllCars(data))
       .catch((err) => console.error('Error: ', err));
   }, []); */

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

    if (raceCount < allCars.length / 2 && allCars.length % 2 === 0) {
      const opponentCar = opponentCars[randomOppIndex];
      const userCar = userCars[randomUserIndex];

      const aiAcceleration = ((opponentCar.top_speed * 1000) / 3600) / opponentCar.acceleration;
      const randomAcceleration = ((userCar.top_speed * 1000) / 3600) / userCar.acceleration;

      const timeToFinishAICar = Math.sqrt(2 * trackLength / aiAcceleration);
      const timeToFinishRandomCar = Math.sqrt(2 * trackLength / randomAcceleration);

      if (timeToFinishAICar > timeToFinishRandomCar) {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setUserWins((prev) => prev + 1);
        setRaceResult(
          <>
            <h1>Winner is Player: {userCar.manufacturer} {userCar.model}</h1>
            <p>Winner time is: {timeToFinishRandomCar}</p>
            <div className='carpic'><img className='carPhoto' src={userCar.image} alt={userCar.manufacturer}></img></div>
          </>
        );
      } else if (timeToFinishAICar < timeToFinishRandomCar) {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setOpponentWins((prev) => prev + 1);
        setRaceResult(
          <>
            <h1>Winner is AI: {opponentCar.manufacturer} {opponentCar.model}</h1>
            <p>Winner time is: {timeToFinishAICar}</p>
            <div className='carpic'><img className='carPhoto' src={opponentCar.image} alt={opponentCar.manufacturer}></img></div>
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
        setView(false);
      } else if (opponentWins > userWins) {
        setRaceResult(<h1>Opponent Won!</h1>);
        setView(false);
      } else {
        setRaceResult(<h1>Its a Tie!</h1>);
        setView(false);
      }
    }
  }

  let result = '';
  if (raceCount === 0) {
    result = 'Start';
  } else if (raceCount === allCars.length / 2) {
    result = 'And the winner is...';
  } else {
    result = `Round: ${raceCount}`;
  }

  return (
    <div>
      {view === false && (
        <div className="track-choose">
          <button onClick={handleShortTrackClick}>Short Track</button>
          <button onClick={handleMidTrackClick}>Mid Track</button>
          <button onClick={handleLongTrackClick}>Long Track</button>
        </div>
      )}

      {view === true &&
        <div className="choose-cars">
          <img className="toretto" src="./toretto.png" /><p></p>
          <button onClick={handleLowCarsClick}>Low Cars</button>
          <button onClick={handleMidCarsClick}>Mid Cars</button>
          <button onClick={handleSuperCarsClick}>Super Cars</button>
        </div>
      }

      {userCars && opponentCars && (
        <div className="card-container">
          {userCars.map((userCar, index) => (
            <div className="card-row" key={index}>
              <div className="user-cards">
                <img src={userCar.image} alt="playercard" className="card-img" />
              </div>
            </div>
          ))}
          {opponentCars.map((opponenCar, index) => (
            <div className="card-row" key={index}>
              <div className="opponent-cards">
                {}
              <img src={opponenCar.image} alt="playercard" className="card-img" />
                <img src="../aicard.png" alt="aicard" className="card-img" />
              </div>
            </div>
          ))}

        </div>
      )}

      <div className='race'>
        {view === true &&
          <button onClick={() => raceCars()} disabled={raceCount >= allCars.length / 2 + 1}>
            {result}
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
    </div>
  );
};

export default Race;
