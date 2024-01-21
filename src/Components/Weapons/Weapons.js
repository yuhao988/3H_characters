import { Link } from "react-router-dom";

export default function Weapon() {
  return (
    <div>
      <h1>Weapon page</h1>
      <h2>
        <button>Swords</button>
      </h2>
      <h2>
        <button>Lances</button>
      </h2>
      <h2>
        <button>Axes</button>
      </h2>
      <h2>
        <button>Bows</button>
      </h2>
      <h2>
        <button>Gauntlets</button>
      </h2>
      <Link to="/">Back</Link>
    </div>
  );
}
