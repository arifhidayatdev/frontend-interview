import { NavLink } from "react-router-dom";
import ToggleThemeButton from "./ToggleThemeButton";
import ROUTES from "../constanta/dataRoutes";
import { IRoute } from "../interfaces/routes";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Crypto Tracker</h1>
      </div>
      <div className="header-right">
        {ROUTES.map((route: IRoute) => {
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
