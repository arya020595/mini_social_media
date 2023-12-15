import { Button, Col, Container, Form, Row } from "react-bootstrap";

function ChangePassword() {
  return (
    <div className="text-center">
      <h4>Change Password</h4>

      <Container>
        <Row xs={1} md={2} lg={3} className="justify-content-center">
          <Col>
            <Form className="my-5">
              <Form.Group className="mb-3">
                <Form.Control
                  name="old_password"
                  type="password"
                  placeholder="Old Password"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="new_password"
                  type="password"
                  placeholder="New Password"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="confirm_new_password"
                  type="password"
                  placeholder="Confirm New Password"
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="secondary">UPDATE</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChangePassword;
