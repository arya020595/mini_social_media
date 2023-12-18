import { useState } from "react";
import { Button, Card, Form as FormBootstrap } from "react-bootstrap";
import { Form, Link, useNavigation } from "react-router-dom";
import { createUser } from "../api";
import "../assets/Register.css";

export async function action({ request }: any) {
  const data = Object.fromEntries(await request.formData());

  const response = await createUser(
    data.name,
    data.username,
    data.email,
    data.password,
    data.file
  );

  return response;
}

export async function loader({ request }: any) {
  return null;
}

function Register() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigation: any = useNavigation();
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // Update the state with the selected file
    setSelectedFile(file);

    // Optionally, if you need to perform any other actions when a file is selected
    // You can do that here
  };
  return (
    <Card border="Secondary">
      <Card.Title className="mt-3 text-dark">REGISTER</Card.Title>
      <Card.Body>
        <Form replace method="post" encType="multipart/form-data">
          <>
            <FormBootstrap.Group className="mb-3">
              <FormBootstrap.Control
                name="name"
                type="text"
                placeholder="Name"
              />
            </FormBootstrap.Group>
            <FormBootstrap.Group className="mb-3">
              <FormBootstrap.Control
                name="username"
                type="text"
                placeholder="Username"
              />
            </FormBootstrap.Group>
            <FormBootstrap.Group className="mb-3">
              <FormBootstrap.Control
                name="email"
                type="email"
                placeholder="Email"
              />
            </FormBootstrap.Group>
            <FormBootstrap.Group className="mb-3">
              <FormBootstrap.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </FormBootstrap.Group>
            <FormBootstrap.Group className="mb-3">
              <FormBootstrap.Control
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
              />
            </FormBootstrap.Group>
            <FormBootstrap.Group className="mb-3">
              <FormBootstrap.Control
                name="file"
                type="file"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <Card className="mt-3">
                  <Card.Img
                    style={{ width: "100%" }}
                    variant="top"
                    src={URL.createObjectURL(selectedFile)}
                  />
                </Card>
              )}
            </FormBootstrap.Group>
            <div className="d-grid gap-3">
              <Button
                type="submit"
                disabled={navigation.state === "submitting"}
                variant="secondary">
                {navigation.state === "submitting"
                  ? "Registering in..."
                  : "Register"}
              </Button>
              <Link className="text-secondary text-decoration-none" to="/login">
                Login
              </Link>
            </div>
          </>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
