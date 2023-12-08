import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "../assets/Register.css";

function Register() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // Update the state with the selected file
    setSelectedFile(file);

    // Optionally, if you need to perform any other actions when a file is selected
    // You can do that here
  };
  return (
    <>
      <Card border="Secondary">
        <Card.Title className="mt-3 text-dark">REGISTER</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control name="name" type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control name="email" type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="photo"
                type="file"
                onChange={handleFileChange}
              />
              <Card className="mt-3">
                <Card.Img
                  style={{ width: "100%" }}
                  variant="top"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : "https://placehold.co/50"
                  }
                />
              </Card>
            </Form.Group>
          </Form>
          <div className="d-grid gap-3">
            <Button variant="secondary">REGISTER</Button>
            <Link className="text-secondary text-decoration-none" to="/login">
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Register;
