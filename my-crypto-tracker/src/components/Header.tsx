import { NavLink } from "react-router-dom";
import ToggleThemeButton from "./ToggleThemeButton";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Crypto Tracker</h1>
      </div>
      <div className="header-right">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'header-link active-link' : 'header-link')}>All Crypto</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'header-link active-link' : 'header-link')}>Favorites</NavLink>
        <ToggleThemeButton />
      </div>
    </header>
  );
}

export default Header;
