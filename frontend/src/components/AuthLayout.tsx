import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <Container>
      <Row
        xs={1}
        md={2}
        lg={3}
        className="text-center justify-content-center align-items-center vh-100">
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default AuthLayout;
