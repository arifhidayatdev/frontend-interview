import { NavLink } from "react-router-dom";
import ToggleThemeButton from "./ToggleThemeButton";
import routes from "../constanta/dataRoutes";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Crypto Tracker</h1>
      </div>
      <div className="header-right">
        {routes.map((route) => {
          return (
            <NavLink
              key={route.id}
              to={route.link}
              className={({ isActive }) =>
                isActive ? "header-link active-link" : "header-link"
              }
            >
              {route.label}
            </NavLink>
          );
        })}
        <ToggleThemeButton />
      </div>
    </header>
  );
}

export default Header;
