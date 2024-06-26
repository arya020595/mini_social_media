import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form as FormBootstrap,
  Row,
} from "react-bootstrap";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { changePasswordUser } from "../api";
import ToastComponent from "../components/ToastComponent";
import requireAuth from "../utils";

export async function action({ request }: any) {
  const data = Object.fromEntries(await request.formData());

  const response = await changePasswordUser(
    data.id,
    data.oldPassword,
    data.new_password
  );
  localStorage.setItem("user", JSON.stringify(response.data));

  return response;
}

export async function loader() {
  await requireAuth();

  const user: string | null = localStorage.getItem("user");

  if (user) {
    const userObject = JSON.parse(user);
    return userObject;
  } else {
    // Handle the case where 'user' is null, maybe return a default value or throw an error.
    console.error("User data not found in localStorage");
    return null;
  }
}

function ChangePassword() {
  const navigation: any = useNavigation();
  const user: any = useLoaderData();
  const [showToast, setShowToast] = useState(false);
  const errorMessage: any = useActionData();

  useEffect(() => {
    if (errorMessage) {
      setShowToast(true);
    }
  }, [errorMessage]);

  return (
    <div className="text-center">
      <h4>Change Password</h4>

      <ToastComponent
        errorMessage={errorMessage}
        show={showToast}
        setShow={setShowToast}
      />

      <Container>
        <Row xs={1} md={2} lg={3} className="justify-content-center">
          <Col>
            <Form replace method="post">
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
                    name="oldPassword"
                    type="password"
                    placeholder="Old Password"
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="new_password"
                    type="password"
                    placeholder="New Password"
                  />
                </FormBootstrap.Group>
                <FormBootstrap.Group className="mb-3">
                  <FormBootstrap.Control
                    name="confirm_new_password"
                    type="password"
                    placeholder="Confirm New Password"
                  />
                </FormBootstrap.Group>
                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={navigation.state === "submitting"}
                    variant="secondary">
                    {navigation.state === "submitting"
                      ? "Update in..."
                      : "Update"}
                  </Button>
                </div>
              </>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChangePassword;
