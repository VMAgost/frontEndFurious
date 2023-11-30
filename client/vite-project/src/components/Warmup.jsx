import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Warmup = () => {
  const [opponentCars, setOpponentCars] = useState(null)
  const [userCars, setUserCars] = useState(null)
  const [view, setView] = useState(true)

  const [allCars, setAllCars] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);

  console.log(allCars);

  const getRandomCars = () => {
    const randomCars = [...allCars].sort(() => 0.5 - Math.random())
    const getOpponentCars = randomCars.slice(0, (allCars.length / 2))
    const getUserCars = randomCars.slice(allCars.length / 2)
    setUserCars(getUserCars)
    setOpponentCars(getOpponentCars)
    setView(false)
  }
  console.log('AI', opponentCars);
  console.log('USER', userCars);

  if (allCars.length % 2 !== 0) {
    alert('There are an odd number of cars right now; Check the garage to create new ones');
  } else {
    return (
      <div className="warmup-container">
        {view === true && (
          <button onClick={() => getRandomCars()}>get em carZ</button>
        )}
        {userCars && opponentCars && (
          <div className="card-container">
            {userCars.map((userCar, index) => (
              <div className="card-row" key={index}>
                <div className="user-cards">
                  <img src="../playercard.png" alt="playercard" className="card-img" />
                </div>
                <div className="opponent-cards">
                  <img src="../aicard.png" alt="aicard" className="card-img" />
                </div>
              </div>
            ))}
            <div className="race-button">
            <Link to={'/race'}>
              <button>Lets Race!</button>
            </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}


export default Warmup;

console.log();