import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function User() {
  const [selectedFile, setSelectedFile] = useState(null);

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
            <Form className="my-5">
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
            <div className="d-flex gap-3 justify-content-center">
              <Button variant="outline-secondary">EDIT</Button>
              <Button variant="secondary" disabled>
                SUBMIT
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default User;
