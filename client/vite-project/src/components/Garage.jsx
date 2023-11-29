import React from 'react';

const Garage = ({ allcars }) => {
  if (!allcars) {
    return <div>Loading...</div>;
  }

  const shuffledCars = [...allcars].sort(() => Math.random() - 0.5);

  const halfIndex = Math.ceil(shuffledCars.length / 2);
  const userCars = shuffledCars.slice(0, halfIndex);
  const opponentCars = shuffledCars.slice(halfIndex);

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
