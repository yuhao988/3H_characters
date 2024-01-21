import { Link } from "react-router-dom";
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fire Emblem: Three Houses database</h1>
      <h2>Characters List:</h2>
      <Link to="/characters">Here</Link>
      <h2>Weapons List:</h2>
      <Link to="/weapons">Here</Link>
      
        
      </header>
    </div>
  );
}

export default Home;