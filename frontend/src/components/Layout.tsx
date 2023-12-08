import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "../assets/Layout.css";

library.add(fab, fas, far);

function Layout() {
  return (
    <Container fluid className="p-0 d-flex">
      <Col
        md={2}
        className="bg-body-secondary py-5"
        style={{ height: "100vh" }}>
        <Nav className="nav flex-column gap-3 text-center">
          <NavLink to="/" className="nav-link active text-dark">
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
      </Col>
      <Col className="p-5" md={10}>
        <Outlet />
      </Col>
    </Container>
  );
}

export default Layout;
