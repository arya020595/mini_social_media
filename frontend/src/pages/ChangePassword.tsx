import {
  Button,
  Col,
  Container,
  Form as FormBootstrap,
  Row,
} from "react-bootstrap";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { changePasswordUser } from "../api";
import requireAuth from "../utils";

export async function action({ request }: any) {
  const form = await request.formData();
  const id = form.get("id");
  const new_password = await form.get("new_password");
  const oldPassword = await form.get("oldPassword");
  const confirm_new_password = await form.get("confirm_new_password");

  console.log(oldPassword, confirm_new_password);

  if (confirm_new_password !== new_password) throw new Error(`NOT SAME!`);

  try {
    const response = await changePasswordUser(id, oldPassword, new_password);
    localStorage.setItem("user", JSON.stringify(response));

    return null;
  } catch (error: any) {
    console.error("Change password failed:", error.message);
    return error.message;
  }
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
    return null;
  }
}

function ChangePassword() {
  const navigation: any = useNavigation();
  const user: any = useLoaderData();

  return (
    <div className="text-center">
      <h4>Change Password</h4>

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
