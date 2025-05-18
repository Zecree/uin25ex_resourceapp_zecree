import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">BillettLyst</Link>
      </div>
      <div className="nav-center">
        <Link to="/category/musikk">Musikk</Link>
        <Link to="/category/sport">Sport</Link>
        <Link to="/category/teater">Teater/Show</Link>
      </div>
      <div className="nav-right">
        <Link to="/dashboard">Logg inn</Link>
      </div>
    </nav>
  );
}

export default Nav;