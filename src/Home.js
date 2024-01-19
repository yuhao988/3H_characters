import { Link } from "react-router-dom";
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
      <h2>Characters List:</h2>
      <Link to="/characters">Here</Link>
      {/* <h2>Equipment List:</h2>
      <Link to="/equipment">Here</Link>
      <h2>Test battles</h2>
      <Link to="/battle">Here</Link> */}
        
      </header>
    </div>
  );
}

export default Home;