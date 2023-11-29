import { useState } from 'react';

const OppoentGarage = ( { allCars }) => {
  const [opponentCars, setOpponentCars] = useState(null)

  console.log(allCars);

  const getRandomCars = () => {
    const randomCars = [...allCars].sort(() => 0.5 - Math.random())
    const getCars = randomCars.slice(0, (allCars.length/2))

    setOpponentCars(getCars)
  }

  console.log(opponentCars);
  return ( 
    <div className="opponent-garage">
    <button onClick={() => getRandomCars()}>get em carZ</button>
    {opponentCars && (
      opponentCars.map((opponentCar, index) => (
        <div className="opponent-cars" key={index}>
          <h2>{opponentCar.manufacturer}</h2>
          <h3>{opponentCar.model}</h3>
        </div>
      ))
    )}
    </div>
  );
}
 
export default OppoentGarage;