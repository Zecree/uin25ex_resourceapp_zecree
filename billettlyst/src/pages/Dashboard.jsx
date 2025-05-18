import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="dashboard">
      {!isLoggedIn ? (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Logg inn</h2>

          <label htmlFor="username">Brukernavn:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Passord:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
          />

          <button type="submit">Logg inn</button>
        </form>
      ) : (
        <div className="min-side">
          <h2>Min side</h2>
          <p>Velkommen, {username || "bruker"}!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
