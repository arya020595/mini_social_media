import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}>
      <div className="text-center">
        <h1 className="mb-4">Page is not found</h1>
        <Link to="/">
          <Button variant="outline-secondary">Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
