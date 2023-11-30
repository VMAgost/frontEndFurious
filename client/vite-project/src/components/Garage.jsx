import React, { useState, useEffect } from "react";

  const [allCars, setAllCars] = useState([]);
  const [newCarData, setNewCarData] = useState({
    manufacturer: '',
    model: '',
    top_speed: 0,
    acceleration: 0,
    horsepower: 0,
  });
  const [editCarId, setEditCarId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error('Error: ', err));
  }, []);

  const handleAddCar = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarData),
      });

      const newCar = await response.json();
      setAllCars((prevCars) => [...prevCars, newCar]);
      setNewCarData({
        manufacturer: '',
        model: '',
        top_speed: 0,
        acceleration: 0,
        horsepower: 0,
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleUpdateCar = (carId) => {
    setEditCarId(carId);
    // Set initial values for the input fields based on the existing data
    setNewCarData(allCars.find((car) => car._id === carId) || {
      manufacturer: '',
      model: '',
      top_speed: 0,
      acceleration: 0,
      horsepower: 0,
    });
  };

  const handleSaveChanges = async (carId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cars/${carId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarData),
      });

      const updatedCar = await response.json();
      setAllCars((prevCars) =>
        prevCars.map((car) => (car._id === carId ? updatedCar.updatedCar : car))
      );
      setEditCarId(null);
      // Reset newCarData after saving changes
      setNewCarData({
        manufacturer: '',
        model: '',
        top_speed: 0,
        acceleration: 0,
        horsepower: 0,
      });
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await fetch(`http://localhost:4000/api/cars/${carId}`, {
        method: 'DELETE',
      });

      setAllCars((prevCars) => prevCars.filter((car) => car._id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Manufacturer:</label>
        <input
          type="text"
          value={newCarData.manufacturer}
          onChange={(e) => setNewCarData({ ...newCarData, manufacturer: e.target.value })}
        />
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          value={newCarData.model}
          onChange={(e) => setNewCarData({ ...newCarData, model: e.target.value })}
        />
      </div>
      <div>
        <label>Top Speed:</label>
        <input
          type="number"
          value={newCarData.top_speed}
          onChange={(e) => setNewCarData({ ...newCarData, top_speed: Number(e.target.value) })}
        />
      </div>
      <div>
        <label>Acceleration:</label>
        <input
          type="number"
          value={newCarData.acceleration}
          onChange={(e) => setNewCarData({ ...newCarData, acceleration: Number(e.target.value) })}
        />
      </div>
      <div>
        <label>Horsepower:</label>
        <input
          type="number"
          value={newCarData.horsepower}
          onChange={(e) => setNewCarData({ ...newCarData, horsepower: Number(e.target.value) })}
        />
      </div>
      <button onClick={handleAddCar}>Add Car</button>
      {allCars.map((car) => (
        <div className="carcontainer" key={car._id}>
          {editCarId === car._id ? (
            <>
              <div>
                <label>Manufacturer:</label>
                <input
                  type="text"
                  value={newCarData.manufacturer}
                  onChange={(e) => setNewCarData({ ...newCarData, manufacturer: e.target.value })}
                />
              </div>
              <div>
                <label>Model:</label>
                <input
                  type="text"
                  value={newCarData.model}
                  onChange={(e) => setNewCarData({ ...newCarData, model: e.target.value })}
                />
              </div>
              <div>
                <label>Top Speed:</label>
                <input
                  type="number"
                  value={newCarData.top_speed}
                  onChange={(e) => setNewCarData({ ...newCarData, top_speed: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Acceleration:</label>
                <input
                  type="number"
                  value={newCarData.acceleration}
                  onChange={(e) => setNewCarData({ ...newCarData, acceleration: Number(e.target.value) })}
                />
              </div>
              <div>
                <label>Horsepower:</label>
                <input
                  type="number"
                  value={newCarData.horsepower}
                  onChange={(e) => setNewCarData({ ...newCarData, horsepower: Number(e.target.value) })}
                />
              </div>
              <button onClick={() => handleSaveChanges(car._id)}>Save</button>
            </>
          ) : (
            <>
              <div>{car.manufacturer}</div>
              <div>{car.model}</div>
              <div>{car.top_speed}</div>
              <div>{car.acceleration}</div>
              <div>{car.horsepower}</div>
              <button onClick={() => handleUpdateCar(car._id)}>Update</button>
              <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Garage;
