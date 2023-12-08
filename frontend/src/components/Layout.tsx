import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "../assets/Layout.css";
import Sidebar from "./Sidebar";

library.add(fab, fas, far);

function Layout() {
  return (
    <Container fluid className="p-0 d-flex">
      <Col
        md={2}
        className="bg-body-secondary py-5"
        style={{ minHeight: "100vh" }}>
        <Sidebar />
      </Col>
      <Col className="p-5" md={10}>
        <Outlet />
      </Col>
    </Container>
  );
}

export default Layout;
