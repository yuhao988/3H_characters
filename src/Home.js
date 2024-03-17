import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fire Emblem: Three Houses database</h1>
        <h2>Characters List:</h2>
        <Link to="/characters">Here</Link>
        <div className ="backend-db">
          <h6>database with ID for referrence:</h6>
          <Link to="/db">Here</Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
