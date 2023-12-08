import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <Nav className="nav flex-column gap-3 text-center">
        <NavLink to="/" className="nav-link text-dark">
          <FontAwesomeIcon icon={["fas", "house"]} />
        </NavLink>
        <NavLink to="/user" className="nav-link text-dark">
          User
        </NavLink>
        <NavLink to="/change-password" className="nav-link text-dark">
          Change Password
        </NavLink>
        <NavLink to="/post" className="nav-link text-dark">
          Post
        </NavLink>
        <NavLink to="/logout" className="nav-link text-dark">
          <FontAwesomeIcon icon={["fas", "arrow-right-from-bracket"]} />
          <span className="ms-2">Logout</span>
        </NavLink>
      </Nav>
    </>
  );
}

export default Sidebar;
