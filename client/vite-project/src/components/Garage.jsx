import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyLifeBeLike from "../music/My_life_be_like.mp3";

const Garage = () => {
  const [allCars, setAllCars] = useState([]);
  const [newCarData, setNewCarData] = useState({
    manufacturer: "",
    model: "",
    top_speed: 0,
    acceleration: 0,
    horsepower: 0,
    image: "",
  });
  const [editCarId, setEditCarId] = useState(null);
  const [editedCarData, setEditedCarData] = useState({
    manufacturer: "",
    model: "",
    top_speed: 0,
    acceleration: 0,
    horsepower: 0,
    image: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/cars")
      .then((res) => res.json())
      .then((data) => setAllCars(data))
      .catch((err) => console.error("Error: ", err));
  }, []);

  const handleAddCar = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newCarData }),
      });

      const newCar = await response.json();
      setAllCars((prevCars) => [...prevCars, newCar]);
      setNewCarData({
        manufacturer: "",
        model: "",
        top_speed: 0,
        acceleration: 0,
        horsepower: 0,
        image: "",
      });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleUpdateCar = (carId) => {
    setEditCarId(carId);
    const carToUpdate = allCars.find((car) => car._id === carId) || {
      manufacturer: "",
      model: "",
      top_speed: 0,
      acceleration: 0,
      horsepower: 0,
      image: "",
    };
    setEditedCarData({ ...carToUpdate });
  };

  const handleSaveChanges = async (carId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cars/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCarData),
      });

      const updatedCar = await response.json();
      setAllCars((prevCars) =>
        prevCars.map((car) => (car._id === carId ? updatedCar.updatedCar : car))
      );
      setEditCarId(null);
      setEditedCarData({
        manufacturer: "",
        model: "",
        top_speed: 0,
        acceleration: 0,
        horsepower: 0,
        image: "",
      });
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await fetch(`http://localhost:4000/api/cars/${carId}`, {
        method: "DELETE",
      });

      setAllCars((prevCars) => prevCars.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="audio-player-container">
          <audio controls autoPlay className="audio-player">
            <source src={MyLifeBeLike} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <Link to={"/warmup"}>
        <button>Warmup</button>
      </Link>

      <Link to={'/race'}>
        <button>Race</button>
      </Link>

      <Link to={'/'}>
        <button className="home-btn">Home</button>
      </Link>
      <div className="addcar-card">
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
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={newCarData.image}
            onChange={(e) => setNewCarData({ ...newCarData, image: e.target.value })}
          />
        </div>
        <button onClick={handleAddCar}>Add Car</button>
      </div>
      <div className="allcars">
        {allCars.map((car) => (
          <div className="card" key={car._id}>
            {editCarId === car._id ? (
              <>
                <div>
                  <label>Manufacturer:</label>
                  <input
                    type="text"
                    value={editedCarData.manufacturer}
                    onChange={(e) => setEditedCarData({ ...editedCarData, manufacturer: e.target.value })}
                  />
                </div>
                <div>
                  <label>Model:</label>
                  <input
                    type="text"
                    value={editedCarData.model}
                    onChange={(e) => setEditedCarData({ ...editedCarData, model: e.target.value })}
                  />
                </div>
                <div>
                  <label>Top Speed:</label>
                  <input
                    type="number"
                    value={editedCarData.top_speed}
                    onChange={(e) => setEditedCarData({ ...editedCarData, top_speed: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label>Acceleration:</label>
                  <input
                    type="number"
                    value={editedCarData.acceleration}
                    onChange={(e) => setEditedCarData({ ...editedCarData, acceleration: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label>Horsepower:</label>
                  <input
                    type="number"
                    value={editedCarData.horsepower}
                    onChange={(e) => setEditedCarData({ ...editedCarData, horsepower: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label>Image URL:</label>
                  <input
                    type="text"
                    value={editedCarData.image}
                    onChange={(e) => setEditedCarData({ ...editedCarData, image: e.target.value })}
                  />
                </div>
                <button onClick={() => handleSaveChanges(car._id)}>Save</button>
              </>
            ) : (
              <>
                <div className="img-container">
                  <img
                    className="garage-cars"
                    src={car.image}
                    alt={`${car.manufacturer} ${car.model}`}
                  />
                </div>
                <div className="car-attributes">
                  Manufacturer: <p>{car.manufacturer}</p>
                </div>
                <div className="car-attributes">
                  Model: <p>{car.model}</p>
                </div>
                <div className="car-attributes">
                  Top Speed: <p>{car.top_speed}</p>
                </div>
                <div className="car-attributes">
                  Acceleration to Top Speed: <p>{car.acceleration}</p>
                </div>
                <div className="car-attributes">
                  Horsepower: <p>{car.horsepower}</p>
                </div>
                <button
                  className="update-btn"
                  onClick={() => handleUpdateCar(car._id)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCar(car._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Garage;
