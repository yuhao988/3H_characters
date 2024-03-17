import { Link } from "react-router-dom";
import "./App.css";

function Database() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Three Houses database with ID</h1>

        <h2>Weapons List:</h2>
        <Link to="/weapons">Here</Link>
        <h2>Spells List:</h2>
        <Link to="/spells">Here</Link>
        <h2>Combat Art List:</h2>
        <Link to="/combat_arts">Here</Link>

        <Link to="/">Back Main Page</Link>
      </header>
    </div>
  );
}

export default Database;
