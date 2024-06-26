import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form as FormBootstrap,
  Row,
} from "react-bootstrap";
import { Form, redirect, useNavigation } from "react-router-dom";
import { createPost } from "../../api";

export async function action({ request }: any) {
  const data = Object.fromEntries(await request.formData());

  await createPost(data.caption, data.tag, data.file);

  return redirect("/post");
}

function PostForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigation: any = useNavigation();

  const handleFileChange = (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    // Update the state with the selected file
    setSelectedFile(file);
  };

  return (
    <div className="text-center">
      <h4>Add New Post</h4>
      <Container>
        <Row xs={1} md={2} lg={3} className="justify-content-center">
          <Col>
            <Form replace method="post" encType="multipart/form-data">
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
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Card className="mt-3" style={{ maxWidth: "200px" }}>
                    <Card.Img
                      className="img-fluid"
                      variant="top"
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : "https://placehold.co/200"
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

export default PostForm;
