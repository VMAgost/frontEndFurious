import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GoHardOrGoHome from "../music/Go_hard_or_go_home.mp3";
import DudeIAlmostHadYou from "../music/Dude_I_almost_had_you.mp3";
import WinningIsWinning from "../music/Winning_is_winning.mp3";

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
  const [selectView, setSelectView] = useState('default');
  const [startView, setStartView] = useState(false);
  const [torettoView, setTorettoView] = useState(false);

  const goHardAudioRef = useRef(null);
  const winningAudioRef = useRef(null);
  const dudeAudioRef = useRef(null);

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
    setSelectView('race')
  }

  const handleMidCarsClick = () => {
    fetchMidCars()
    setSelectView('race')
  }

  const handleSuperCarsClick = () => {
    fetchSuperCars()
    setSelectView('race')
  }

  const handleShortTrackButton = () => {
    setTrackLength(400)
    setSelectView('getcars')
  }

  const handleMidTrackButton = () => {
    setTrackLength(800)
    setSelectView('getcars')
  }

  const handleLongTrackButton = () => {
    setTrackLength(1200)
    setSelectView('getcars')
  }

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

      const timeToFinishAICar = Math.round(Math.sqrt((2 * trackLength) / aiAcceleration));
      const timeToFinishRandomCar = Math.round(Math.sqrt(
        (2 * trackLength) / randomAcceleration
      ));

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

        if (goHardAudioRef.current) {
          goHardAudioRef.current.pause();
        }

        if (winningAudioRef.current) {
          winningAudioRef.current.play();
        }
      } else if (opponentWins > userWins) {
        setRaceResult(<h1>Opponent Won!</h1>);
        setView(false);

        if (goHardAudioRef.current) {
          goHardAudioRef.current.pause();
        }

        if (dudeAudioRef.current) {
          dudeAudioRef.current.play();
        }
      } else {
        setRaceResult(<h1>Its a Tie!</h1>);
        setView(false);

        if (goHardAudioRef.current) {
          goHardAudioRef.current.pause();
        }
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
        <audio ref={goHardAudioRef} controls autoPlay className="audio-player">
          <source src={GoHardOrGoHome} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <audio ref={winningAudioRef} controls className="audio-player">
          <source src={WinningIsWinning} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <audio ref={dudeAudioRef} controls className="audio-player">
          <source src={DudeIAlmostHadYou} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      {torettoView === true && <img className="toretto" src="./toretto.png" />}
      {selectView === 'default' && (
        <div className="choose-track">
          <button onClick={handleShortTrackButton}>400 m distance</button>
          <button onClick={handleMidTrackButton}>800 m distance</button>
          <button onClick={handleLongTrackButton}>1200 m distance</button>
        </div>
      )}
      <p></p>
      {selectView === 'getcars' && (
        <div className="select-cars">
          <button
            onClick={() => {
              handleLowCarsClick(), setStartView(true);
            }}
          >
            Low Cars
          </button>
          <button
            onClick={() => {
              handleMidCarsClick(), setStartView(true);
            }}
          >
            Mid Cars
          </button>
          <button
            onClick={() => {
              handleSuperCarsClick(), setStartView(true);
            }}
          >
            Super Cars
          </button>
        </div>
      )}
      {raceView === true && selectView === 'race' && (
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
        {startView === true && (
          <button
            className="start"
            onClick={() => {
              raceCars();
              setRaceView(false);
              setTorettoView(true);
              
              if (raceCount >= allCars.length / 2) {
                setStartView(false);
                setTorettoView(false);
              }
            }}
          >
            {result}
          </button>
        )}

        <div>{raceResult}</div>
        {view === false && (
          <>
            <img className="flag" src="../ch_flag.png" alt="checkered-flag" />
            <p></p>
            <Link to={'/garage'}>
              <button>Garage</button>
            </Link>
          </>
        )}
        {view === false && (
          <Link to={'/'}>
            <button>Home</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Race;
