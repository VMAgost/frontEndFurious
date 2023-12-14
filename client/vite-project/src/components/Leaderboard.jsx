import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/cars');
        const carData = await response.json();
        setCars(carData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);

  console.log(cars);
  return (
    <div className="leaderboard">
      <Link to={'/'}>
      <button className='stickybtn' type="button">FAMILY</button>
      </Link>
      {cars &&
        cars.map((car) => (
          <div className="car" key={car._id}>
            <h2>{car.manufacturer}</h2>
            <h3>{car.model}</h3>
            <img src={car.image} />
          </div>
        ))}
    </div>
  );
};
export default Leaderboard;
