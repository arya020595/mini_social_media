import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Card border="Secondary">
        <Card.Title className="mt-3 text-dark">LOGIN</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>
          </Form>
          <div className="d-grid gap-3">
            <Button variant="secondary">LOGIN</Button>
            <Link
              className="text-secondary text-decoration-none"
              to="/register">
              Register
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;
