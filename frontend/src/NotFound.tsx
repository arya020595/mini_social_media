import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}>
      <div className="text-center">
        <h1>Page is not found</h1>
        <Link to="/">
          <button>Back to Homepage</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
