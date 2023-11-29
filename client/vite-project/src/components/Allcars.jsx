const Allcars = ({ allcars }) => {
  return (
    <div>
      {allcars.map(car => (<div className="carcontainer" key={car._id}>
        <div>{car.manufacturer}</div>
        <div>{car.model}</div>
        <div>{car.top_speed}</div>
        <div>{car.acceleration}</div>
        <div>{car.horsepower}</div>
      </div>)
      )}
      </div>
  )
}
      export default Allcars;