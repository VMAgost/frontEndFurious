
import './App.css';
import { Link } from 'react-router-dom';



function App() {




  return (
    <>
       
      <div className="garage-button">
        <Link to={'/garage'}><button>Garage</button></Link>
        <Link to={'/leaderboard'}><button>Leaderboard</button></Link>
      </div>

    </>
  );
}

export default App;
