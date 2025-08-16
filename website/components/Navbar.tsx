import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Home
      </NavLink>

      <NavLink
        to="/discover"
        end
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Discover
      </NavLink>

      <NavLink
        to="/landmarks"
        end
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Landmarks
      </NavLink>
      <NavLink
        to={`/profile`}
        end
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Profile
      </NavLink>
      <NavLink
        to={`/map`}
        end
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Map
      </NavLink>
    </nav>
  );
}
