import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <Row className="text-center">
        <Outlet />
      </Row>
    </Container>
  );
}

export default AuthLayout;
