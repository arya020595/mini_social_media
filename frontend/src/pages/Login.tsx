import { Button, Card, Form as FormBootstrap } from "react-bootstrap";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { authLogin } from "../api";

export function loader() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken == null || accessToken === "undefined") {
    return null;
  }

  return redirect("/");
}

export async function action({ request }: any) {
  const form = await request.formData();
  const username = await form.get("username");
  const password = await form.get("password");

  const response = await authLogin(username, password);
  localStorage.setItem("accessToken", response.accessToken);
  localStorage.setItem("user", JSON.stringify(response.user));

  return response;
}

function Login() {
  const navigation: any = useNavigation();

  return (
    <>
      <Card border="Secondary">
        <Card.Title className="mt-3 text-dark">LOGIN</Card.Title>
        <Card.Body>
          <Form replace method="post">
            <div>
              <FormBootstrap.Group className="mb-3">
                <FormBootstrap.Control
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                />
              </FormBootstrap.Group>
              <FormBootstrap.Group className="mb-3">
                <FormBootstrap.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
              </FormBootstrap.Group>
            </div>

            <div className="d-grid gap-3">
              <Button
                type="submit"
                disabled={navigation.state === "submitting"}
                variant="secondary">
                {navigation.state === "submitting" ? "Logging in..." : "Login"}
              </Button>
              <Link
                className="text-secondary text-decoration-none"
                to="/register">
                Register
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;
