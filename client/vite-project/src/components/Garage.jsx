import { Link } from "react-router-dom";

const Garage = () => {
  return ( <div>garageee
    <Link to={'/api/race'}><button>Race</button></Link>
    <Link to={'/'}><button>Home</button></Link>
  </div> );
}
 
export default Garage;