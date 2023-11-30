import { useState, useEffect } from 'react';

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
    alert('There are odd number of cars right now; Check the garage to create new one')
  } else {
  return (
    <div className="warmup">
      {view === true &&
      <button onClick={() => getRandomCars()}>get em carZ</button>  
      }
      {opponentCars && (
        opponentCars.map((opponentCar, index) => (
          <div className="opponent-cars" key={index}>
            <h2>{opponentCar.manufacturer}</h2>
            <h3>{opponentCar.model}</h3>
          </div>
        ))
      )}
      {userCars && (
        userCars.map((userCar, index) => (
          <div className="user-cars" key={index}>
            <h2>{userCar.manufacturer}</h2>
            <h4>{userCar.model}</h4>
          </div>
        ))
      )}
    </div>
  );
}}

export default Warmup;

console.log();