
import './App.css';
import { Link } from 'react-router-dom';


function App() {




  return (
    <>
      <div>
        <Link to={'/garage'}><button>Garage</button></Link>
        <Link to={'/warmup'}><button>Warmup</button></Link>
      </div>

    </>
  );
}

export default App;
