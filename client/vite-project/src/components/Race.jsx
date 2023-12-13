import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoHardOrGoHome from "../music/Go_hard_or_go_home.mp3";

const Race = () => {
  const [trackLength, setTrackLength] = useState(1200);
  const [opponentCars, setOpponentCars] = useState(null);
  const [userCars, setUserCars] = useState(null);
  const [raceResult, setRaceResult] = useState("");
  const [raceCount, setRaceCount] = useState(0);
  const [allCars, setAllCars] = useState([]);
  const [randomOppIndex, setRandomOppIndex] = useState(0);
  const [randomUserIndex, setRandomUserIndex] = useState(0);
  const [userWins, setUserWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0);
  const [view, setView] = useState(true);
  const [raceView, setRaceView] = useState(true);

  const fetchLowCars = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/cars/low");
      const lowCarsData = await response.json();
      setAllCars(lowCarsData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMidCars = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/cars/mid");
      const lowCarsData = await response.json();
      setAllCars(lowCarsData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuperCars = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/cars/super");
      const lowCarsData = await response.json();
      setAllCars(lowCarsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLowCarsClick = () => {
    fetchLowCars();
  };

  const handleMidCarsClick = () => {
    fetchMidCars();
  };

  const handleSuperCarsClick = () => {
    fetchSuperCars();
  };

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
      console.log("Loading cars...");
      return;
    }

    if (raceCount < allCars.length / 2 && allCars.length % 2 === 0) {
      const opponentCar = opponentCars[randomOppIndex];
      const userCar = userCars[randomUserIndex];

      const aiAcceleration =
        (opponentCar.top_speed * 1000) / 3600 / opponentCar.acceleration;
      const randomAcceleration =
        (userCar.top_speed * 1000) / 3600 / userCar.acceleration;

      const timeToFinishAICar = Math.sqrt((2 * trackLength) / aiAcceleration);
      const timeToFinishRandomCar = Math.sqrt(
        (2 * trackLength) / randomAcceleration
      );

      if (timeToFinishAICar > timeToFinishRandomCar) {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setUserWins((prev) => prev + 1);
        setRaceResult(
          <>
            <h1>
              Winner is Player: {userCar.manufacturer} {userCar.model}
            </h1>
            <p>Winner time is: {timeToFinishRandomCar}</p>
            <div className="carpic">
              <img
                className="userPhoto"
                src={userCar.image}
                alt={userCar.manufacturer}
              ></img>
            </div>
            <div className="carpic">
              <img
                className="carPhoto"
                src={opponentCar.image}
                alt={opponentCar.manufacturer}
              ></img>
            </div>
          </>
        );
      } else if (timeToFinishAICar < timeToFinishRandomCar) {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setOpponentWins((prev) => prev + 1);
        setRaceResult(
          <>
            <h1>
              Winner is AI: {opponentCar.manufacturer} {opponentCar.model}
            </h1>
            <p>Winner time is: {timeToFinishAICar}</p>
            <div className="carpic">
              <img
                className="carPhoto"
                src={opponentCar.image}
                alt={opponentCar.manufacturer}
              ></img>
            </div>
            <div className="carpic">
              <img
                className="userPhoto"
                src={userCar.image}
                alt={userCar.manufacturer}
              ></img>
            </div>
          </>
        );
      } else {
        setRandomOppIndex((prev) => prev + 1);
        setRandomUserIndex((prev) => prev + 1);
        setOpponentWins((prev) => prev + 1);
        setUserWins((prev) => prev + 1);
        setRaceResult("Its a tie!");
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

  let result = "";
  if (raceCount === 0) {
    result = "Start";
  } else if (raceCount === allCars.length / 2) {
    result = "And the winner is...";
  } else {
    result = `Round: ${raceCount}`;
  }

  return (
    <div>
      <div className="audio-player-container">
        <audio controls autoPlay className="audio-player">
          <source src={GoHardOrGoHome} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <img className="toretto" src="./toretto.png" />
      <p></p>
      <button onClick={handleLowCarsClick}>Low Cars</button>
      <button onClick={handleMidCarsClick}>Mid Cars</button>
      <button onClick={handleSuperCarsClick}>Super Cars</button>
      {raceView === true && (
<div>
      {userCars && opponentCars && (
        <div className="card-container">
          {userCars.map((userCar, index) => (
            <div className="card" key={index}>
              <div className="img-container">
                <img
                  className="garage-cars"
                  src={userCar.image}
                  alt={`${userCar.manufacturer} ${userCar.model}`}
                />
              </div>
              <div className="car-attributes">
                Manufacturer: <p>{userCar.manufacturer}</p>
              </div>
              <div className="car-attributes">
                Model: <p>{userCar.model}</p>
              </div>
              <div className="car-attributes">
                Top Speed: <p>{userCar.top_speed}</p>
              </div>
              <div className="car-attributes">
                Acceleration to Top Speed: <p>{userCar.acceleration}</p>
              </div>
              <div className="car-attributes">
                Horsepower: <p>{userCar.horsepower}</p>
              </div>
            </div>
          ))}
          {opponentCars.map((opponenCar, index) => (
            <div className="card" key={index}>
              <div className="img-container">
                <img
                  className="garage-cars"
                  src={opponenCar.image}
                  alt={`${opponenCar.manufacturer} ${opponenCar.model}`}
                />
              </div>
              <div className="car-attributes">
                Manufacturer: <p>{opponenCar.manufacturer}</p>
              </div>
              <div className="car-attributes">
                Model: <p>{opponenCar.model}</p>
              </div>
              <div className="car-attributes">
                Top Speed: <p>{opponenCar.top_speed}</p>
              </div>
              <div className="car-attributes">
                Acceleration to Top Speed: <p>{opponenCar.acceleration}</p>
              </div>
              <div className="car-attributes">
                Horsepower: <p>{opponenCar.horsepower}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      )}

      <div className="race">
        {view === true && (
          <button
            onClick={() => {raceCars(), setRaceView(false)}}
            disabled={raceCount >= allCars.length / 2 + 1}
          >
            {result}
          </button>
        )}
        <div>{raceResult}</div>
        {view === false && (
          <>
            <img className="flag" src="../ch_flag.png" alt="checkered-flag" />
            <p></p>
            <Link to={"/garage"}>
              <button>Garage</button>
            </Link>
          </>
        )}
        {view === false && (
          <Link to={"/"}>
            <button>Home</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Race;
