import React from 'react';

const Garage = ({  }) => {
  const [allCars, setAllCars] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);

  return (
    <div>
      <h2>Your Garage</h2>
      <div className="garage-container">
        {userCars.map((car) => (
          <div className="car-container user-car" key={car._id}>
            <h3>{car.manufacturer} - {car.model}</h3>
            <div>Top Speed: {car.top_speed}</div>
            <div>Acceleration: {car.acceleration}</div>
            <div>Horsepower: {car.horsepower}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garage;
