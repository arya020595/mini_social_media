import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form as FormBootstrap,
  Row,
} from "react-bootstrap";
import { Form, useNavigation } from "react-router-dom";
import requireAuth from "../utils";

export async function loader({ request }: any) {
  await requireAuth(request);
}

function PostForm() {
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
    <div className="text-center">
      <h4>Add New Post</h4>
      <Container>
        <Row xs={1} md={2} lg={3} className="justify-content-center">
          <Col>
            <Form replace method="post">
              <>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control name="id" type="hidden" />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="caption"
                    type="text"
                    placeholder="Caption"
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="tag"
                    type="text"
                    placeholder="Tag"
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="image"
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
                </FormBootstrap.Group>
              </>

              <div className="d-grid gap-3">
                <Button
                  type="submit"
                  disabled={navigation.state === "submitting"}
                  variant="secondary">
                  {navigation.state === "submitting"
                    ? "Submit in..."
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

export default PostForm;
