import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form as FormBootstrap,
  Row,
} from "react-bootstrap";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { updateUser } from "../api";
import requireAuth from "../utils";

export async function action({ request }: any) {
  const data = Object.fromEntries(await request.formData());

  const response = await updateUser(
    data.id,
    data.name,
    data.username,
    data.email,
    data.file
  );
  localStorage.setItem("user", JSON.stringify(response));

  return response;
}

export async function loader({ request }: any) {
  await requireAuth(request);
  const user: string | null = localStorage.getItem("user");

  if (user) {
    const userObject = JSON.parse(user);
    return userObject;
  } else {
    // Handle the case where 'user' is null, maybe return a default value or throw an error.
    console.error("User data not found in localStorage");
    return null; // or throw new Error("User data not found in localStorage");
  }
}

function User() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigation: any = useNavigation();
  const user: any = useLoaderData();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // Update the state with the selected file
    setSelectedFile(file);

    // Optionally, if you need to perform any other actions when a file is selected
    // You can do that here
  };

  return (
    <div className="text-center">
      <h4>Detail User</h4>
      <Container>
        <Row xs={1} md={2} lg={3} className="justify-content-center">
          <Col>
            <Form replace method="post" encType="multipart/form-data">
              <>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="id"
                    type="hidden"
                    defaultValue={user.id}
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    defaultValue={user.name}
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    defaultValue={user.username}
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    defaultValue={user.email}
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="file"
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
                          : user.imageUrl
                          ? user.imageUrl
                          : "https://placehold.co/50"
                      }
                    />
                  </Card>
                </FormBootstrap.Group>
              </>

              <div className="d-grid gap-3">
                <Button
                  type="submit"
                  disabled={navigation.state === "submitting"}
                  variant="secondary">
                  {navigation.state === "submitting"
                    ? "Submitting in..."
                    : "Submit"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default User;
